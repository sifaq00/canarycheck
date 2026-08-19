import { FACTORS } from "./factors";
import type { Score, TokenData } from "./types";

const WSUM_BLEND = 0.3;
const PEAK_BLEND = 0.7;

export function scoreToken(input: TokenData): Score {
  const factors = FACTORS.map((f) => ({
    id: f.id,
    label: f.label,
    weight: f.weight,
    raw: f.compute(input),
    explain: f.explain(input),
  }));
  const wsum = factors.reduce((a, f) => a + f.raw * f.weight, 0);
  const peak = Math.max(0, ...factors.map((f) => f.raw));
  const total = Math.round(WSUM_BLEND * wsum + PEAK_BLEND * peak);
  return { total: Math.max(0, Math.min(100, total)), factors };
}
