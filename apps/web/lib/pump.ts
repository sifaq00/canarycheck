export interface PumpCoin {
  mint: string;
  name: string;
  symbol: string;
  creator: string;
  created_timestamp: number;
  usd_market_cap: number;
  complete: boolean;
}

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
};

export async function getPumpCoin(mint: string): Promise<PumpCoin | null> {
  const r = await fetch(`https://frontend-api.pump.fun/coins/${mint}`, {
    headers: HEADERS,
    next: { revalidate: 30 },
  });
  if (!r.ok) return null;
  return (await r.json()) as PumpCoin;
}

export async function getCreatorTokens(creator: string): Promise<PumpCoin[]> {
  const r = await fetch(
    `https://frontend-api.pump.fun/coins?creator=${creator}&limit=200`,
    { headers: HEADERS, next: { revalidate: 60 } }
  );
  if (!r.ok) return [];
  const j = (await r.json()) as PumpCoin[] | { coins?: PumpCoin[] };
  return Array.isArray(j) ? j : (j.coins ?? []);
}
