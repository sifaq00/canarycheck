import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getAnthropic } from "@/lib/claude";
import { getPumpCoin, getCreatorTokens } from "@/lib/pump";
import { getTopHolders } from "@/lib/helius";

const DAILY_LIMIT = 3;

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const body = (await req.json().catch(() => ({}))) as {
    mint?: string;
    extraTradeStats?: unknown;
  };
  const { mint, extraTradeStats } = body;
  if (!mint) return NextResponse.json({ error: "mint required" }, { status: 400 });

  const redis =
    process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN
      ? new Redis({
          url: process.env.UPSTASH_REDIS_URL,
          token: process.env.UPSTASH_REDIS_TOKEN,
        })
      : null;
  const day = new Date().toISOString().slice(0, 10);
  const key = `rl:${ip}:${day}`;
  if (redis) {
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 86400);
    if (count > DAILY_LIMIT)
      return NextResponse.json(
        { error: "Daily limit reached (3 reports/day). Try again tomorrow." },
        { status: 429 }
      );
  }

  const coin = await getPumpCoin(mint);
  if (!coin)
    return NextResponse.json({ error: "token not found" }, { status: 404 });
  const [holders, creatorTokens] = await Promise.all([
    getTopHolders(mint),
    getCreatorTokens(coin.creator),
  ]);

  const sys = `You are a Solana memecoin rug-pull analyst. Given token data, write a concise risk report. Output STRICT JSON: {"verdict":"SAFE|CAUTION|DANGER","markdown":"...","red_flags":["..."]}. Markdown must be < 500 words, mention data points, end with 1-line actionable verdict. Never advise buying. Output JSON only.`;

  const user = JSON.stringify({
    token: {
      name: coin.name,
      symbol: coin.symbol,
      mint,
      ageMs: Date.now() - coin.created_timestamp,
      marketCapUsd: coin.usd_market_cap,
      graduated: coin.complete,
    },
    creator: {
      address: coin.creator,
      totalLaunched: creatorTokens.length,
      sample: creatorTokens
        .slice(0, 10)
        .map((t) => ({ mint: t.mint, mcap: t.usd_market_cap })),
    },
    top10HolderPct: holders.pct,
    tradeStats: extraTradeStats ?? null,
  });

  const res = await getAnthropic().messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: sys,
    messages: [{ role: "user", content: user }],
  });
  const text = res.content[0].type === "text" ? res.content[0].text : "";
  try {
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ verdict: "UNKNOWN", markdown: text, red_flags: [] });
  }
}
