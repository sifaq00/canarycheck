"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    step: "01",
    title: "Risk score mounts itself",
    desc: "Open any pump.fun coin page. A live 0–100 score panel appears top-right — computed from holder concentration, dev position, deployer history, and sniper behavior.",
    tag: "SCORE · 74",
    color: "#06b6d4",
  },
  {
    step: "02",
    title: "Dev sells → red row",
    desc: "The trade stream is live. The instant a deployer or insider wallet sells, its row turns red with a DEV tag. You see the dump while it happens.",
    tag: "DEV SELL · $2.4K",
    color: "#f43f5e",
  },
  {
    step: "03",
    title: "Deployer history surfaces",
    desc: "12 launches, 9 dead under 1 SOL? The panel shows the track record before you add liquidity to a scammer's wallet.",
    tag: "12 LAUNCHES · 9 RUGGED",
    color: "#f59e0b",
  },
  {
    step: "04",
    title: "AI rug report on demand",
    desc: "One click. Claude reads the on-chain picture and writes the verdict — red flags, timeline, and what to watch. 3 free per day.",
    tag: "AI REPORT · READY",
    color: "#10b981",
  },
];

export default function PinnedDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".demo-step");
      const panel = panelRef.current!;
      const sticky = stickyRef.current!;
      const section = sectionRef.current!;

      // Single timeline: each step slides in, holds, slides out
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=700%",
          scrub: 0.6,
          pin: sticky,
          pinType: "transform",
          anticipatePin: 1,
        },
      });

      steps.forEach((step, i) => {
        const seg = 1.75;
        const base = i * seg;
        tl.fromTo(
          step,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          base
        ).to(
          step,
          { opacity: 0, y: -32, duration: 0.35, ease: "power2.in" },
          base + 1.3
        );
      });

      // Panel: subtle scale-down while pinned
      gsap.fromTo(
        panel,
        { scale: 1 },
        {
          scale: 0.94,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );

      // Parallax glow
      gsap.fromTo(
        sticky.querySelector(".pin-glow"),
        { opacity: 0.35 },
        {
          opacity: 0.85,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=700%",
            scrub: 1,
          },
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={stickyRef} className="relative flex min-h-screen items-center overflow-hidden">
        <div className="pin-glow aurora h-[500px] w-[500px] bg-cyan-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          {/* Live panel mockup */}
          <div ref={panelRef} className="relative order-2 md:order-1">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 blur-xl" />
            <div className="glass relative rounded-2xl p-5 font-mono text-xs">
              <div className="flex items-center gap-1.5 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-slate-500">pump.fun/coin/9xQz…pump</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div>
                  <div className="font-display text-4xl font-bold text-white">74</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
                    risk score
                  </div>
                </div>
                <div className="space-y-1.5 text-right">
                  <div className="rounded bg-white/5 px-2 py-1 text-[10px] text-slate-400">
                    TOP-10 HOLDERS <span className="text-amber-400">82%</span>
                  </div>
                  <div className="rounded bg-white/5 px-2 py-1 text-[10px] text-slate-400">
                    DEV HOLDING <span className="text-red-400">18%</span>
                  </div>
                  <div className="rounded bg-white/5 px-2 py-1 text-[10px] text-slate-400">
                    SNIPERS <span className="text-cyan-400">47 WALLETS</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between rounded bg-white/[0.03] px-3 py-2 text-[11px]">
                  <span className="text-slate-400">▲ BUY 0.45 SOL</span>
                  <span className="text-slate-600">9xQz…31aB</span>
                </div>
                <div className="flex items-center justify-between rounded bg-red-500/15 px-3 py-2 text-[11px] text-red-400">
                  <span><b>DEV</b> ▼ SELL 2.40 SOL</span>
                  <span className="text-red-400/60">9xQz…31aB</span>
                </div>
                <div className="flex items-center justify-between rounded bg-white/[0.03] px-3 py-2 text-[11px]">
                  <span className="text-slate-400">▲ BUY 0.12 SOL</span>
                  <span className="text-slate-600">kLm9…77cD</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-[10px] font-semibold text-cyan-400">
                    + Watchlist
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-semibold text-emerald-400">
                    ⚡ AI Report
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  LIVE
                </span>
              </div>
            </div>
          </div>

          {/* Step text column */}
          <div ref={stepsRef} className="relative order-1 min-h-[320px] md:order-2">
            {SCENES.map((s) => (
              <div key={s.step} className="demo-step absolute inset-0 opacity-0">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: s.color }}
                  >
                    {s.step}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[10px] font-semibold"
                    style={{
                      color: s.color,
                      background: `${s.color}1a`,
                      border: `1px solid ${s.color}40`,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}