export interface DeployerStats {
  totalLaunched: number;
  diedEarly: number;       // tokens that never crossed 1 SOL market cap
}

export interface TokenData {
  mint: string;
  devHoldingPct: number;      // 0-100
  devSoldPct: number;         // 0-100 of dev's original allocation
  top10HolderPct: number;     // 0-100
  ageSec: number;
  deployer: DeployerStats;
  sniperCount: number;        // wallets that bought in first block
  earlyMassSellPct: number;   // 0-100, % of early buys that sold within 5 min
}

export interface FactorBreakdown {
  id: string;
  label: string;
  weight: number;   // 0-1
  raw: number;      // normalized 0-100
  explain: string;  // one liner shown in UI breakdown
}

export interface Score {
  total: number;               // 0-100
  factors: FactorBreakdown[];
}
