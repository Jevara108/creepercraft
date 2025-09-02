export const useMinecraftStats = (
  serverIP: string = "mightymc.club", // ✅ Default to mightymc.club
  fallbackPlayerCount: number = 139,
  refreshInterval: number = 0
): MinecraftStats => {
  const fallbackMaxPlayers = 260;

  const [stats, setStats] = useState<MinecraftStats>({
    playerCount: fallbackPlayerCount,
    online: true,
    version: '1.8.9',
    motd: 'MightyMC - Premium Minecraft Server',
    loading: false,
    error: null,
    lastUpdated: null
  });

  const fetchMinecraftStats = useCallback(async () => {
    // Clean server IP (remove protocol if present)
    const cleanIP = serverIP.replace(/^https?:\/\//, '').trim() || "mightymc.club";
    console.log('Fetching stats for server:', cleanIP);

    let data: McSrvStatResponse | null = null;
    let apiUsed = '';

    // Try first API: mcsrvstat.us
    try {
      console.log('Trying mcsrvstat.us API...');
      const response1 = await fetch(
        `https://api.mcsrvstat.us/3/${encodeURIComponent(cleanIP)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(8000),
        }
      );

      if (response1.ok) {
        const apiData = await response1.json();
        if (apiData && typeof apiData.online === 'boolean') {
          data = apiData;
          apiUsed = 'mcsrvstat.us';
        }
      }
    } catch (error) {
      console.warn('mcsrvstat.us API failed:', error);
    }

    // Try second API: mcapi.us
    if (!data) {
      try {
        console.log('Trying mcapi.us API...');
        const response2 = await fetch(
          `https://mcapi.us/server/status?ip=${encodeURIComponent(cleanIP)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(8000),
          }
        );

        if (response2.ok) {
          const apiData = await response2.json();
          if (apiData && typeof apiData.online === 'boolean') {
            data = {
              online: apiData.online,
              players: {
                online: apiData.players?.now || 0,
                max: apiData.players?.max || 100,
              },
              version: { name: apiData.server?.name || '1.8.9' },
              motd: { clean: apiData.motd ? [apiData.motd] : ['MightyMC - Premium Minecraft Server'] },
            };
            apiUsed = 'mcapi.us';
          }
        }
      } catch (error) {
        console.warn('mcapi.us API failed:', error);
      }
    }

    // ✅ If we got data from either API, use it
    if (data) {
      setStats({
        playerCount: data.players?.online ?? fallbackPlayerCount,
        online: data.online,
        version: data.version?.nam
