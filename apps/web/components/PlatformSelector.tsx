"use client";

import { useEffect, useState } from "react";
import {
  PumpFunLogo,
  XTwitterLogo,
  DexScreenerLogo,
  HeliusLogo,
  PhantomLogo,
  SolflareLogo,
} from "./CryptoLogos";

const PLATFORMS = [
  {
    id: "pump",
    name: "pump.fun",
    badge: "Full Overlay + Live Dev Alert",
    status: "Active",
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16,185,129,0.35)",
    desc: "Mounts a full risk breakdown panel on /coin/:mint. Live streaming trade alerts turn red when the deployer dumps.",
    icon: <PumpFunLogo className="h-6 w-6" />,
  },
  {
    id: "x",
    name: "X / Twitter",
    badge: "Inline CA Chip Detector",
    status: "Active",
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59,130,246,0.35)",
    desc: "Automatically scans timeline tweets for Solana base58 Contract Addresses and renders clickable 0–100 risk chips.",
    icon: <XTwitterLogo className="h-5 w-5 text-slate-800 group-hover:text-white" />,
  },
  {
    id: "dex",
    name: "DexScreener",
    badge: "Header Pair Risk Chip",
    status: "Active",
    color: "from-teal-500 to-emerald-500",
    glowColor: "rgba(20,184,166,0.35)",
    desc: "Injects risk scoring directly beside the pair header on /solana/:mint, highlighting top-10 holder concentration.",
    icon: <DexScreenerLogo className="h-6 w-6" />,
  },
  {
    id: "solscan",
    name: "Solscan & Helius",
    badge: "Deployer History Forensics",
    status: "Synced",
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249,115,22,0.35)",
    desc: "Deep-dives into creator wallet history to count total launched tokens and identify recurring rug patterns.",
    icon: <HeliusLogo className="h-6 w-6" />,
  },
  {
    id: "wallet",
    name: "Phantom & Solflare",
    badge: "Non-Custodial Wallet Connect",
    status: "Optional",
    color: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168,85,247,0.35)",
    desc: "Connect your Solana wallet to identify your own bag holdings with a 'YOU' badge and manage a persistent watchlist.",
    icon: (
      <div className="flex items-center -space-x-1.5">
        <PhantomLogo className="h-5 w-5 rounded-md shadow-xs" />
        <SolflareLogo className="h-5 w-5 rounded-md shadow-xs ring-1 ring-white" />
      </div>
    ),
  },
];

export default function PlatformSelector() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle every 3 seconds if not interacted
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PLATFORMS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const active = PLATFORMS[activeIdx];

  return (
    <section className="relative py-28 overflow-hidden" id="platforms">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Column: Text & CTA */}
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
              — INLINE ON EVERY PLATFORM
            </p>
            <h2 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Explore & Detect <br />
              <span className="grad-text">Where You Already Trade.</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-600">
              Never leave the timeline or switch tabs to vet a memecoin again.
              CanaryCheck injects verified on-chain risk scores into the interfaces you already use every day.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="/api/download"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 font-semibold text-xs text-white shadow-xs transition-colors hover:bg-slate-800"
              >
                Install Free Extension
                <span>→</span>
              </a>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-500 self-center">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Zero configuration needed</span>
              </div>
            </div>

            {/* Dynamic Active Description Box */}
            <div className="mt-10 rounded-2xl border border-slate-200/90 bg-slate-50 p-5 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">{active.icon}</span>
                <span className="font-display text-sm font-bold text-slate-900">{active.name}</span>
                <span className="rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-700">
                  {active.badge}
                </span>
              </div>
              <p className="mt-3 font-mono text-xs leading-relaxed text-slate-600">
                {active.desc}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Cycling Selector Card */}
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl transition-all duration-700 opacity-20"
              style={{ background: active.glowColor }}
            />
            
            <div className="glass relative rounded-3xl p-6 border border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] bg-white">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 font-mono text-xs text-slate-500">
                <span className="font-bold">SUPPORTED DESTINATIONS</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  REAL-TIME HOOKS
                </span>
              </div>

              <div className="space-y-2.5">
                {PLATFORMS.map((p, idx) => {
                  const isSelected = activeIdx === idx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`group relative flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                          : "bg-slate-50 text-slate-700 border border-slate-100 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-xl">{p.icon}</span>
                        <div>
                          <div className={`font-display text-sm font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                            {p.name}
                          </div>
                          <div className={`font-mono text-[10px] ${isSelected ? "text-slate-400" : "text-slate-400"}`}>
                            {p.badge}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                            isSelected
                              ? "bg-white/15 text-white"
                              : "bg-white border border-slate-200 text-slate-500 shadow-xs"
                          }`}
                        >
                          {p.status}
                        </span>
                        <span
                          className={`text-xs transition-transform ${
                            isSelected ? "translate-x-1 font-bold text-white" : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
