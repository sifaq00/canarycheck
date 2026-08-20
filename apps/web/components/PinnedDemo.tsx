"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowDownRight, Sparkles, Plus } from "lucide-react";

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
          anticipatePin: 1,
        },
      });

      let pos = 0;
      steps.forEach((step) => {
        tl.fromTo(
          step,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          pos
        ).to(
          step,
          { opacity: 0, y: -32, duration: 0.3, ease: "power2.in" },
          pos + 1.15
        );
        pos += 1.3; // next step fades in while this one fades out — crossfade
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
    <section ref={sectionRef} className="relative" id="demo">
      <div ref={stickyRef} className="relative flex min-h-screen items-center overflow-hidden">
        <div className="pin-glow aurora h-[500px] w-[500px] bg-amber-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <p className="absolute top-8 left-6 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold md:left-12">
            — 03 / LIVE DEMO
          </p>
          {/* Live panel mockup */}
          <div ref={panelRef} className="relative order-2 md:order-1">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-cyan-500/10 blur-xl" />
            <div className="glass relative rounded-3xl p-6 font-mono text-xs border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white">
              <div className="flex items-center gap-1.5 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-slate-500 font-medium">pump.fun/coin/9xQz…pump</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
                <div>
                  <div className="font-display text-4xl font-extrabold text-slate-900">74</div>
                  <div className="mt-1 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    risk score
                  </div>
                </div>
                <div className="space-y-1.5 text-right">
                  <div className="rounded-lg bg-white border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-700 shadow-xs">
                    TOP-10 HOLDERS <span className="text-amber-700 font-bold">82%</span>
                  </div>
                  <div className="rounded-lg bg-white border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-700 shadow-xs">
                    DEV HOLDING <span className="text-red-700 font-bold">18%</span>
                  </div>
                  <div className="rounded-lg bg-white border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-700 shadow-xs">
                    SNIPERS <span className="text-cyan-800 font-bold">47 WALLETS</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-800 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <ArrowUpRight className="h-3 w-3" /> BUY 0.45 SOL
                  </span>
                  <span className="text-slate-500">9xQz…31aB</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700 font-bold">
                  <span className="flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                    <b>DEV</b> SELL 2.40 SOL
                  </span>
                  <span className="text-red-700 font-semibold">9xQz…31aB</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-800 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <ArrowUpRight className="h-3 w-3" /> BUY 0.12 SOL
                  </span>
                  <span className="text-slate-500">kLm9…77cD</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-[10px] font-bold text-cyan-700">
                    <Plus className="h-2.5 w-2.5" /> Watchlist
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700">
                    <Sparkles className="h-2.5 w-2.5" /> AI Report
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
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
                    className="rounded-full px-3 py-1 font-mono text-[10px] font-bold"
                    style={{
                      color: s.color,
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}40`,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
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