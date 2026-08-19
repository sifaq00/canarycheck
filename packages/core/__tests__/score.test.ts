import { describe, it, expect } from "vitest";
import { scoreToken } from "../src/score";
import type { TokenData } from "../src/types";

const base: TokenData = {
  mint: "x".repeat(44),
  devHoldingPct: 0,
  devSoldPct: 0,
  top10HolderPct: 20,
  ageSec: 3600,
  deployer: { totalLaunched: 1, diedEarly: 0 },
  sniperCount: 0,
  earlyMassSellPct: 0,
};

describe("scoreToken", () => {
  it("returns total between 0 and 100", () => {
    const s = scoreToken(base);
    expect(s.total).toBeGreaterThanOrEqual(0);
    expect(s.total).toBeLessThanOrEqual(100);
  });

  it("scores high when dev holds most supply", () => {
    const s = scoreToken({ ...base, devHoldingPct: 90 });
    expect(s.total).toBeGreaterThan(70);
  });

  it("scores high when deployer has rug history", () => {
    const s = scoreToken({
      ...base,
      deployer: { totalLaunched: 12, diedEarly: 10 },
    });
    expect(s.total).toBeGreaterThan(60);
  });

  it("factors weight sum to 1", () => {
    const s = scoreToken(base);
    const sum = s.factors.reduce((a, f) => a + f.weight, 0);
    expect(Math.abs(sum - 1)).toBeLessThan(1e-9);
  });

  it("new token with bad deployment gets higher score than old clean token", () => {
    const dirty = scoreToken({
      ...base,
      ageSec: 30,
      sniperCount: 40,
      deployer: { totalLaunched: 8, diedEarly: 7 },
    });
    const clean = scoreToken({ ...base, ageSec: 86400 });
    expect(dirty.total).toBeGreaterThan(clean.total);
  });
});
