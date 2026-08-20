"use client";

import { Star } from "lucide-react";

const REVIEWS_ROW_1 = [
  {
    author: "Elena R.",
    handle: "@elena_sol",
    role: "Pump.fun Degen",
    rating: "4.9",
    text: "Caught a dev dumping 40% of the supply in under 2 seconds. The red alert saved me 15 SOL before the chart even twitched.",
    tag: "Dev Dump Alert",
  },
  {
    author: "Daniel R.",
    handle: "@dan_defi",
    role: "DeFi Analyst",
    rating: "5.0",
    text: "The deployer history is priceless. Seeing '12 launched · 10 died' on a coin that just opened is all you need to know.",
    tag: "Deployer Forensics",
  },
  {
    author: "CryptoKev",
    handle: "@kevin_trades",
    role: "Memecoin Trader",
    rating: "4.9",
    text: "Having the score right on X timeline means I never copy-paste CAs into sketchy checker websites anymore.",
    tag: "Inline X Chip",
  },
  {
    author: "Sofia M.",
    handle: "@sofia_web3",
    role: "Solana Researcher",
    rating: "5.0",
    text: "Claude AI report generated in 5 seconds with all red flags clearly explained. Essential tool for daily trading.",
    tag: "AI Rug Report",
  },
];

const REVIEWS_ROW_2 = [
  {
    metric: "148,000+",
    label: "Tokens Scanned On-Chain",
    subtext: "Real-time RPC tracking across Solana",
    isMetric: true,
  },
  {
    author: "Alex V.",
    handle: "@alex_pump",
    role: "Full-Time Trader",
    rating: "4.9",
    text: "The sniper counter flagged 52 wallets buying in block 0. Immediately skipped what turned out to be a massive bundle rug.",
    tag: "Sniper Detection",
  },
  {
    metric: "2,840+",
    label: "Dev Sells Alerted Live",
    subtext: "Instant red rows in the trade stream",
    isMetric: true,
  },
  {
    author: "Marcus T.",
    handle: "@marcus_solana",
    role: "Community Mod",
    rating: "5.0",
    text: "Zero API key leakage and pure open source. The fastest and cleanest extension in the Solana ecosystem.",
    tag: "Keyless Security",
  },
];

export default function CommunityWall() {
  const row1 = [...REVIEWS_ROW_1, ...REVIEWS_ROW_1, ...REVIEWS_ROW_1];
  const row2 = [...REVIEWS_ROW_2, ...REVIEWS_ROW_2, ...REVIEWS_ROW_2];

  return (
    <section className="relative py-28 overflow-hidden bg-slate-100/50 border-y border-slate-200/80" id="community">
      <div className="mx-auto max-w-6xl px-6 text-center mb-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — COMMUNITY & SOCIAL PROOF
        </p>
        <h2 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Built for Degens, <br />
          <span className="grad-text">Powered by On-Chain Truth.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-slate-600">
          Join thousands of smart traders who check the deployer before they check the chart.
        </p>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="relative mb-6 overflow-hidden">
        <div className="marquee-track flex gap-5 w-max">
          {row1.map((r, i) => (
            <div
              key={i}
              className="glass w-[340px] shrink-0 rounded-3xl p-6 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] bg-white text-left hover:border-cyan-400/60 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-sm font-bold text-slate-900">{r.author}</div>
                  <div className="font-mono text-[10px] text-slate-500 font-medium">{r.handle} · {r.role}</div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 border border-amber-400/30">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>{r.rating}</span>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-700">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 font-mono text-[10px]">
                <span className="text-cyan-800 font-bold">{r.tag}</span>
                <span className="text-slate-500 font-medium">Verified User</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="relative overflow-hidden">
        <div className="marquee-reverse flex gap-5 w-max">
          {row2.map((r, i) => (
            <div
              key={i}
              className={`w-[340px] shrink-0 rounded-3xl p-6 text-left transition-all ${
                r.isMetric
                  ? "bg-gradient-to-br from-amber-50/70 via-white to-cyan-50/70 border border-amber-300/80 shadow-[0_10px_35px_rgba(245,158,11,0.08)]"
                  : "glass border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] bg-white hover:border-cyan-400/60"
              }`}
            >
              {r.isMetric ? (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="font-display text-3xl font-extrabold text-slate-900 grad-text">{r.metric}</div>
                    <div className="mt-1 font-display text-sm font-bold text-slate-900">{r.label}</div>
                  </div>
                  <div className="mt-4 font-mono text-[11px] text-slate-600 font-medium border-t border-slate-100 pt-3">
                    {r.subtext}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-sm font-bold text-slate-900">{r.author}</div>
                      <div className="font-mono text-[10px] text-slate-500 font-medium">{r.handle} · {r.role}</div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 border border-amber-400/30">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>{r.rating}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-700">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 font-mono text-[10px]">
                    <span className="text-cyan-800 font-bold">{r.tag}</span>
                    <span className="text-slate-500 font-medium">Verified User</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
