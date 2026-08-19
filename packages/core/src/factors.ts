import type { TokenData, FactorBreakdown } from "./types";

type FactorDef = {
  id: string;
  label: string;
  weight: number;
  compute: (d: TokenData) => number; // 0-100
  explain: (d: TokenData) => string;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export const FACTORS: FactorDef[] = [
  {
    id: "dev",
    label: "Dev position",
    weight: 0.25,
    compute: (d) =>
      Math.max(clamp01(d.devHoldingPct / 100), clamp01(d.devSoldPct / 100)) * 100,
    explain: (d) => `Dev holds ${d.devHoldingPct.toFixed(1)}%, has sold ${d.devSoldPct.toFixed(1)}%`,
  },
  {
    id: "holders",
    label: "Top-10 concentration",
    weight: 0.2,
    compute: (d) => clamp01((d.top10HolderPct - 20) / 60) * 100,
    explain: (d) => `Top 10 wallets hold ${d.top10HolderPct.toFixed(1)}%`,
  },
  {
    id: "age",
    label: "Token age",
    weight: 0.1,
    compute: (d) => clamp01(1 - d.ageSec / 86400) * 100,
    explain: (d) => `Age ${(d.ageSec / 3600).toFixed(1)}h — newer = riskier`,
  },
  {
    id: "deployer",
    label: "Deployer track record",
    weight: 0.25,
    compute: (d) =>
      d.deployer.totalLaunched === 0
        ? 50
        : clamp01(d.deployer.diedEarly / d.deployer.totalLaunched) * 100,
    explain: (d) =>
      `${d.deployer.totalLaunched} launched, ${d.deployer.diedEarly} died early`,
  },
  {
    id: "sniper",
    label: "First-block buyers",
    weight: 0.1,
    compute: (d) => clamp01(d.sniperCount / 50) * 100,
    explain: (d) => `${d.sniperCount} wallets bought in first block`,
  },
  {
    id: "earlymass",
    label: "Early mass sell",
    weight: 0.1,
    compute: (d) => clamp01(d.earlyMassSellPct / 100) * 100,
    explain: (d) => `${d.earlyMassSellPct.toFixed(0)}% of early buys sold < 5 min`,
  },
];
