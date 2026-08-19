"use client";

const ITEMS = [
  "DEV SELL DETECTED",
  "TOP-10 HOLDER 82%",
  "DEPLOYER: 12 LAUNCHES · 9 RUGGED",
  "SNIPER WALLETS: 47",
  "AGE: 3 MIN",
  "BUNDLE RISK: HIGH",
  "LIQUIDITY LOCKED",
  "GRADUATION SOON",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm text-slate-400">
            <span>{t}</span>
            <span className="text-cyan-400">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}