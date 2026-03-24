import { useState, useEffect, useCallback } from 'react';

// ==================== INTERFACES ====================

interface DiscordStats {
  memberCount: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface DiscordApiResponse {
  approximate_member_count: number;
  approximate_presence_count: number;
}

// ==================== HOOK ====================

/**
 * Use Discord Statistics Hook
 * * Fetches live Discord server stats using the invite code: bpf58wac4M
 */
export const useDiscordStats = (
  discordInvite: string = 'bpf58wac4M', // Your specific invite code
  fallbackMemberCount: number = 0
): DiscordStats => {
  const [stats, setStats] = useState<DiscordStats>({
    memberCount: fallbackMemberCount,
    loading: false,
    error: null,
    lastUpdated: null
  });

  const fetchDiscordStats = useCallback(async () => {
    if (!discordInvite) return;

    setStats(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Extract code if a full link is accidentally passed
      const inviteCode = discordInvite.split('/').pop()?.split('?')[0] || discordInvite;

      // Fetch from Discord API v10
      const response = await fetch(
        `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`
      );

      if (!response.ok) {
        throw new Error(`Discord API error: ${response.status}`);
      }

      const data: DiscordApiResponse = await response.json();

      setStats({
        // Use approximate_presence_count for "Online Now" or member_count for "Total"
        memberCount: data.approximate_presence_count || fallbackMemberCount,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });

    } catch (error) {
      console.warn('Discord fetch failed:', error);
      setStats({
        memberCount: fallbackMemberCount,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch',
        lastUpdated: new Date()
      });
    }
  }, [discordInvite, fallbackMemberCount]);

  useEffect(() => {
    fetchDiscordStats();
  }, [fetchDiscordStats]);

  return stats;
};
