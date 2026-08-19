import { NextResponse } from "next/server";
import { scoreToken, type TokenData } from "@rugradar/core";
import { getPumpCoin, getCreatorTokens } from "@/lib/pump";
import { getTopHolders } from "@/lib/helius";
import { getCached, setCached } from "@/lib/cache";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ mint: string }> }
) {
  const { mint } = await ctx.params;
  const cached = getCached<{ score: unknown; data: TokenData; creator: string }>(
    `token:${mint}`
  );
  if (cached) return NextResponse.json(cached);

  const coin = await getPumpCoin(mint);
  if (!coin) return NextResponse.json({ error: "token not found" }, { status: 404 });

  const [holders, creatorTokens] = await Promise.all([
    getTopHolders(mint),
    getCreatorTokens(coin.creator),
  ]);

  const diedEarly = creatorTokens.filter(
    (t) => t.mint !== mint && (t.usd_market_cap ?? 0) < 1000
  ).length;
  const ageSec = Math.floor((Date.now() - coin.created_timestamp) / 1000);

  const data: TokenData = {
    mint,
    devHoldingPct: 0,
    devSoldPct: 0,
    top10HolderPct: holders.pct,
    ageSec,
    deployer: { totalLaunched: creatorTokens.length, diedEarly },
    sniperCount: 0,
    earlyMassSellPct: 0,
  };

  const score = scoreToken(data);
  const res = { score, data, creator: coin.creator };
  setCached(`token:${mint}`, res);
  return NextResponse.json(res);
}
