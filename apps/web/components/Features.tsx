"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ShieldAlert,
  Flame,
  History,
  Sparkles,
  Crosshair,
  Bookmark,
} from "lucide-react";

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}

const FEATURES = [
  {
    title: "Risk score, on-chain",
    desc: "A 0–100 score from holder concentration, dev position, deployer history, and sniper behavior. Factor-by-factor breakdown — no black boxes.",
    icon: <ShieldAlert className="h-4 w-4 text-cyan-600" />,
    color: "from-cyan-50 to-blue-50",
    tag: "LIVE METRICS",
    renderVisual: () => (
      <div className="flex flex-col justify-between h-full p-4 font-mono text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-slate-900 text-sm">74 / 100</span>
          </div>
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-600 border border-red-500/20">
            HIGH RISK
          </span>
        </div>
        <div className="space-y-2 mt-3">
          <div>
            <div className="flex justify-between text-[10px] text-slate-600 font-medium">
              <span>Top-10 Concentration</span>
              <span className="text-amber-700 font-bold">82%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-amber-500" style={{ width: "82%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-slate-600 font-medium">
              <span>Dev Holding</span>
              <span className="text-red-700 font-bold">18% (Sold 42%)</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-red-500" style={{ width: "68%" }} />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Dev-sell alerts",
    desc: "Live trade stream. The moment a deployer or insider wallet sells, the row turns red. Inline, real-time, zero refresh.",
    icon: <Flame className="h-4 w-4 text-red-500" />,
    color: "from-red-50 to-orange-50",
    tag: "STREAM < 3S",
    renderVisual: () => (
      <div className="flex flex-col justify-between h-full p-3.5 font-mono text-[11px] space-y-1.5">
        <div className="flex items-center justify-between rounded-lg bg-red-50 border border-red-200 px-2.5 py-1.5 text-red-700">
          <span className="font-bold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            DEV SELL 2.40 SOL
          </span>
          <span className="text-[9px] text-red-600 font-extrabold">JUST NOW</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-slate-800 font-medium">
          <span className="text-emerald-700 font-bold">▲ BUY 0.45 SOL</span>
          <span className="text-[10px] text-slate-500">2s ago</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-slate-800 font-medium">
          <span className="text-emerald-700 font-bold">▲ BUY 1.10 SOL</span>
          <span className="text-[10px] text-slate-500">6s ago</span>
        </div>
      </div>
    ),
  },
  {
    title: "Deployer track record",
    desc: "How many tokens has this wallet launched? How many died under 1 SOL? One glance and you know who you're dealing with.",
    icon: <History className="h-4 w-4 text-amber-600" />,
    color: "from-amber-50 to-yellow-50",
    tag: "FORENSICS",
    renderVisual: () => (
      <div className="flex flex-col justify-between h-full p-4 font-mono text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-[11px] font-medium">12 Launches</span>
          <span className="text-red-700 font-bold text-[11px]">75% Rug Rate</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          <div className="rounded-lg bg-red-50 border border-red-200 p-1.5 text-center">
            <div className="font-extrabold text-red-700 text-sm">9</div>
            <div className="text-[9px] text-slate-600 font-bold">&lt; 1 SOL</div>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-1.5 text-center">
            <div className="font-extrabold text-amber-800 text-sm">2</div>
            <div className="text-[9px] text-slate-600 font-bold">Graduated</div>
          </div>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-1.5 text-center">
            <div className="font-extrabold text-emerald-800 text-sm">1</div>
            <div className="text-[9px] text-slate-600 font-bold">Active</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-[10px] text-slate-600 font-medium border-t border-slate-100 pt-2">
          <span>Avg Lifespan</span>
          <span className="text-red-700 font-bold">4.2 Minutes</span>
        </div>
      </div>
    ),
  },
  {
    title: "AI rug reports",
    desc: "One click → Claude analyzes the on-chain picture and writes a verdict with red flags. Free, 3 per day.",
    icon: <Sparkles className="h-4 w-4 text-emerald-600" />,
    color: "from-emerald-50 to-teal-50",
    tag: "CLAUDE 3.5",
    renderVisual: () => (
      <div className="flex flex-col justify-between h-full p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-emerald-800 font-bold text-[11px] flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> Claude Verdict
          </span>
          <span className="text-[10px] text-slate-500 font-medium">0.8s analysis</span>
        </div>
        <div className="space-y-1.5 mt-2 text-[10px] text-slate-700 font-medium">
          <div className="flex items-center gap-1.5 text-red-600">
            <span>⚠</span>
            <span>Deployer sold 42% initial bag</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-600">
            <span>⚠</span>
            <span>82% supply held in 10 wallets</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600">
            <span>✓</span>
            <span>Mint authority revoked</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Sniper & bundle detection",
    desc: "Buyers in the first block, clustered entries, mass early exits — the classic rug choreography, surfaced automatically.",
    icon: <Crosshair className="h-4 w-4 text-cyan-600" />,
    color: "from-teal-50 to-cyan-50",
    tag: "BLOCK 0",
    renderVisual: () => (
      <div className="relative flex flex-col justify-between h-full p-4 font-mono text-xs overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-cyan-800 font-bold text-[11px]">Bundle Detection</span>
          <span className="rounded bg-cyan-50 border border-cyan-200 px-2 py-0.5 text-[10px] font-bold text-cyan-700">
            47 Snipers
          </span>
        </div>
        {/* Radar concentric rings */}
        <div className="relative my-2 flex items-center justify-center h-20">
          <div className="absolute h-16 w-16 rounded-full border border-cyan-400/30 animate-ping" />
          <div className="absolute h-12 w-12 rounded-full border border-cyan-400/40" />
          <div className="absolute h-6 w-6 rounded-full border border-cyan-500/60 bg-cyan-50" />
          <div className="absolute top-2 right-8 h-2 w-2 rounded-full bg-red-500 shadow-md" />
          <div className="absolute bottom-3 left-10 h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-md" />
          <div className="absolute top-4 left-12 h-2 w-2 rounded-full bg-amber-500 shadow-md" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Clustered block 0 buys</span>
          <span className="text-red-600 font-bold">14.8 SOL</span>
        </div>
      </div>
    ),
  },
  {
    title: "Watchlist & Wallet Connect",
    desc: "Track tokens across tabs, connect your Phantom or Solflare wallet, and spot your own bags on the radar.",
    icon: <Bookmark className="h-4 w-4 text-blue-600" />,
    color: "from-blue-50 to-cyan-50",
    tag: "MULTI-TAB",
    renderVisual: () => (
      <div className="flex flex-col justify-between h-full p-3.5 font-mono text-xs space-y-1.5">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-100">
          <span className="text-slate-900 font-bold">Active Radar</span>
          <span className="text-emerald-600 font-bold text-[10px]">3 Tracking</span>
        </div>
        <div className="space-y-1 text-[10px]">
          <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-1 text-slate-700">
            <span>$CANARY</span>
            <span className="text-red-600 font-bold">Score 74</span>
          </div>
          <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-1 text-slate-700">
            <span>$BONK</span>
            <span className="text-emerald-600 font-bold">Score 18</span>
          </div>
          <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-1 text-slate-700">
            <span>$WIF</span>
            <span className="text-emerald-600 font-bold">Score 22</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1200, 1);
      setCount(Math.round(88 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <section className="relative py-28" id="features">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
              — 04 / WHAT SETS IT APART
            </p>
            <h2 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Everything a degen
              <br />
              <span className="grad-text">needs to know.</span>
            </h2>
          </div>

          <div
            ref={ref}
            className="glass flex items-center gap-5 rounded-3xl px-6 py-5 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
          >
            <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
              <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="7" />
              <circle
                cx="44"
                cy="44"
                r="38"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - count / 100)}
                className="ring-progress"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <div className="font-display text-5xl font-extrabold text-slate-900">{count}</div>
              <div className="mt-1 font-mono text-xs text-slate-600 font-medium">
                LIVE RISK SCORE
                <br />
                <span className="text-red-700 font-bold">dev selling · bundle detected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <TiltCard className="group glass relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 border border-slate-200/90 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_15px_40px_rgba(2,132,199,0.08)]">
                <div className="spotlight" />
                
                {/* Clean Micro-Widget Preview Box */}
                <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/90 shadow-inner group-hover:border-cyan-500/30 transition-colors">
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="relative z-10 h-full">
                    {f.renderVisual()}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${f.color} border border-slate-200/80 shadow-xs`}
                    >
                      {f.icon}
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 font-normal">
                    {f.desc}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}