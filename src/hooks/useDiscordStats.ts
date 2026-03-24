import { useState, useEffect, useCallback } from 'react';

interface DiscordStats {
  memberCount: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface DiscordApiResponse {
  approximate_member_count: number;
  approximate_presence_count: number; // This is the "Online" number
}

/**
 * Use Discord Statistics Hook
 * Corrected to fetch live online player counts for invite: bpf58wac4M
 */
export const useDiscordStats = (
  discordInvite: string = 'bpf58wac4M', // Default to your invite
  fallbackMemberCount: number = 0
): DiscordStats => {
  const [stats, setStats] = useState<DiscordStats>({
    memberCount: fallbackMemberCount,
    loading: false,
    error: null,
    lastUpdated: null
  });

  const fetchDiscordStats = useCallback(async () => {
    setStats(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Clean parsing logic to get the code 'bpf58wac4M' correctly
      const inviteCode = discordInvite.split('/').pop()?.split('?')[0] || discordInvite;

      const response = await fetch(
        `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`
      );

      if (!response.ok) {
        throw new Error(`Discord API error: ${response.status}`);
      }

      const data: DiscordApiResponse = await response.json();

      setStats({
        // We use 'approximate_presence_count' for "Online Now"
        memberCount: data.approximate_presence_count || 0,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });

    } catch (error) {
      console.error('Discord fetch error:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch'
      }));
    }
  }, [discordInvite]);

  useEffect(() => {
    fetchDiscordStats();
    // Optional: Refresh every 5 minutes
    const interval = setInterval(fetchDiscordStats, 300000);
    return () => clearInterval(interval);
  }, [fetchDiscordStats]);

  return stats;
};
