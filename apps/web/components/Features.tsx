"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

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
    icon: "◉",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Dev-sell alerts",
    desc: "Live trade stream. The moment a deployer or insider wallet sells, the row turns red. Inline, real-time, zero refresh.",
    icon: "⚡",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Deployer track record",
    desc: "How many tokens has this wallet launched? How many died under 1 SOL? One glance and you know who you're dealing with.",
    icon: "◈",
    color: "from-amber-500 to-yellow-400",
  },
  {
    title: "AI rug reports",
    desc: "One click → Claude analyzes the on-chain picture and writes a verdict with red flags. Free, 3 per day.",
    icon: "✦",
    color: "from-emerald-500 to-teal-400",
  },
  {
    title: "Sniper & bundle detection",
    desc: "Buyers in the first block, clustered entries, mass early exits — the classic rug choreography, surfaced automatically.",
    icon: "◎",
    color: "from-teal-500 to-cyan-400",
  },
  {
    title: "Watchlist + wallet",
    desc: "Track tokens across tabs, connect your Phantom or Solflare wallet, and spot your own bags on the radar.",
    icon: "⬡",
    color: "from-blue-500 to-cyan-400",
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
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-400">
              / features
            </p>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Everything a degen
              <br />
              <span className="grad-text">needs to know.</span>
            </h2>
          </div>

          <div
            ref={ref}
            className="glass flex items-center gap-5 rounded-2xl px-6 py-5"
          >
            <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
              <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
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
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <div className="font-display text-5xl font-bold text-white">{count}</div>
              <div className="mt-1 font-mono text-xs text-slate-500">
                LIVE RISK SCORE
                <br />
                <span className="text-red-400">dev selling · bundle detected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <TiltCard className="group glass relative h-full overflow-hidden rounded-2xl p-6 transition-[border-color,background] duration-300 hover:bg-white/[0.05] hover:border-cyan-400/30">
                <div className="spotlight" />
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-lg text-white shadow-lg`}
                  style={{ transform: "translateZ(24px)" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white" style={{ transform: "translateZ(16px)" }}>
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}