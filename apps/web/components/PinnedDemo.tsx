"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Plus,
  ShieldAlert,
  History,
  Bot,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { PumpFunLogo, SolanaLogo } from "./CryptoLogos";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    step: "01",
    title: "Risk score mounts itself",
    desc: "Open any pump.fun coin page. A live 0–100 score panel appears top-right — computed from holder concentration, dev position, deployer history, and sniper behavior.",
    tag: "SCORE · 74",
    color: "#0284c7",
    activePillBg: "#0284c7",
  },
  {
    step: "02",
    title: "Dev sells → red row",
    desc: "The trade stream is live. The instant a deployer or insider wallet sells, its row turns red with a DEV tag. You see the dump while it happens.",
    tag: "DEV SELL · $2.4K",
    color: "#e11d48",
    activePillBg: "#e11d48",
  },
  {
    step: "03",
    title: "Deployer history surfaces",
    desc: "12 launches, 9 dead under 1 SOL? The panel shows the track record before you add liquidity to a scammer's wallet.",
    tag: "12 LAUNCHES · 9 RUGGED",
    color: "#d97706",
    activePillBg: "#d97706",
  },
  {
    step: "04",
    title: "AI rug report on demand",
    desc: "One click. Claude reads the on-chain picture and writes the verdict — red flags, timeline, and what to watch. 3 free per day.",
    tag: "AI REPORT · READY",
    color: "#059669",
    activePillBg: "#059669",
  },
];

export default function PinnedDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const panel = panelRef.current;
      if (!section || !sticky || !panel) return;

      const stepEls = gsap.utils.toArray<HTMLElement>(".demo-step-content");
      const progressPills = gsap.utils.toArray<HTMLElement>(".progress-step-pill");
      const panelStates = gsap.utils.toArray<HTMLElement>(".panel-state-view");

      // Master Timeline bound to a single ScrollTrigger
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",
          scrub: 1.2, // Buttery smooth scrubbing with Lenis momentum
          pin: sticky,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial state: Step 0 visible, others hidden
      gsap.set(stepEls, { opacity: 0, y: 25, pointerEvents: "none" });
      gsap.set(stepEls[0], { opacity: 1, y: 0, pointerEvents: "auto" });

      gsap.set(panelStates, { opacity: 0, scale: 0.97, display: "none" });
      gsap.set(panelStates[0], { opacity: 1, scale: 1, display: "block" });

      // Progress bar fill track
      masterTl.fromTo(
        ".demo-progress-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", duration: 3 }
      );

      // Transition between the 4 scenes seamlessly
      SCENES.forEach((_, idx) => {
        if (idx === 0) return;

        const prevIdx = idx - 1;
        const timelinePos = idx; // 1, 2, 3

        // Crossfade text step
        masterTl
          .to(
            stepEls[prevIdx],
            { opacity: 0, y: -20, duration: 0.4, ease: "power2.inOut", pointerEvents: "none" },
            timelinePos - 0.2
          )
          .to(
            stepEls[idx],
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.inOut", pointerEvents: "auto" },
            timelinePos + 0.1
          );

        // Crossfade panel dynamic states
        masterTl
          .to(
            panelStates[prevIdx],
            {
              opacity: 0,
              scale: 0.97,
              duration: 0.35,
              ease: "power2.inOut",
              onComplete: () => {
                panelStates[prevIdx].style.display = "none";
              },
            },
            timelinePos - 0.2
          )
          .set(panelStates[idx], { display: "block" }, timelinePos + 0.05)
          .to(
            panelStates[idx],
            { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
            timelinePos + 0.1
          );

        // Highlight progress indicator pill
        masterTl.to(
          progressPills[idx],
          {
            backgroundColor: SCENES[idx].activePillBg,
            color: "#ffffff",
            borderColor: SCENES[idx].activePillBg,
            duration: 0.2,
          },
          timelinePos
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 overflow-hidden" id="demo">
      <div ref={stickyRef} className="relative flex min-h-screen w-full items-center overflow-hidden py-12">
        {/* Subtle Porcelain Ambient Glow */}
        <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-amber-500/6 blur-[100px] top-1/3 right-1/4" />

        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Section Subtitle */}
          <div className="mb-8 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              — 03 / LIVE INTERACTIVE RADAR
            </p>
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500">
              <span>SCROLL TO EXPLORE</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Interactive Live Mockup Card (7 Cols) */}
            <div ref={panelRef} className="relative lg:col-span-7">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-sky-500/5 to-amber-500/10 blur-xl opacity-60" />
              
              <div className="glass relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 font-mono shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 flex items-center gap-1.5 font-mono text-[11px] text-slate-600 font-medium">
                      <PumpFunLogo className="h-3.5 w-3.5" />
                      pump.fun/coin/9xQz…pump
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE HOOK
                  </div>
                </div>

                {/* DYNAMIC SCENE PANELS (Smoothly crossfades as you scroll) */}
                <div className="relative min-h-[340px] pt-4">
                  
                  {/* State 1: Risk Score Dial Focus */}
                  <div className="panel-state-view space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-cyan-200/90 bg-gradient-to-r from-cyan-50/70 via-white to-sky-50/50 p-5 shadow-xs">
                      <div>
                        <div className="font-display text-5xl font-extrabold text-slate-900 tracking-tight">
                          74<span className="text-xl text-slate-500 font-normal">/100</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 font-mono text-xs uppercase font-bold tracking-widest text-amber-700">
                          <ShieldAlert className="h-3.5 w-3.5" /> High Risk Detected
                        </div>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
                          TOP-10 HOLDERS <span className="text-amber-700 font-bold">82%</span>
                        </div>
                        <div className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
                          DEV HOLDING <span className="text-rose-700 font-bold">18%</span>
                        </div>
                        <div className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs">
                          SNIPERS <span className="text-cyan-800 font-bold">47 WALLETS</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-xs space-y-2">
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Liquidity Curve Status</span>
                        <span className="text-emerald-700 font-bold">Raydium Graduation 64%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full w-[64%] bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* State 2: Dev Sell Alert Live Focus */}
                  <div className="panel-state-view space-y-3">
                    <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-xs">
                      <div className="flex items-center justify-between text-rose-800 font-bold pb-2 border-b border-rose-200">
                        <span className="flex items-center gap-1.5">
                          <Flame className="h-4 w-4 text-rose-600" />
                          URGENT INSIDER DUMP ALERT
                        </span>
                        <span className="text-rose-600">0.2s AGO</span>
                      </div>
                      <p className="mt-2 text-[11px] text-rose-900 font-mono">
                        Deployer wallet dumped <b>14.2M tokens (18.4% supply)</b> across 2 bundled transactions.
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 text-slate-700">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <ArrowUpRight className="h-3.5 w-3.5" /> BUY 0.45 SOL
                        </span>
                        <span className="text-slate-500">9xQz…31aB</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-rose-50 border border-rose-300 px-3.5 py-2.5 text-rose-800 font-bold shadow-xs">
                        <span className="flex items-center gap-1.5">
                          <ArrowDownRight className="h-4 w-4 text-rose-600" />
                          <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[9px]">DEV</span>
                          SELL 2.40 SOL (DUMP)
                        </span>
                        <span className="text-rose-700">9xQz…31aB</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 text-slate-700">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <ArrowUpRight className="h-3.5 w-3.5" /> BUY 0.12 SOL
                        </span>
                        <span className="text-slate-500">kLm9…77cD</span>
                      </div>
                    </div>
                  </div>

                  {/* State 3: Deployer Forensics Focus */}
                  <div className="panel-state-view space-y-3">
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs">
                      <div className="flex items-center justify-between text-amber-900 font-bold pb-2 border-b border-amber-200">
                        <span className="flex items-center gap-1.5">
                          <History className="h-4 w-4 text-amber-700" />
                          SERIAL DEPLOYER PROFILE
                        </span>
                        <span className="text-amber-800 font-mono font-bold">SERIAL RUGGER</span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                          <div className="text-[10px] text-slate-500">LAUNCHES</div>
                          <div className="text-base font-bold text-slate-900">12</div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                          <div className="text-[10px] text-slate-500">DEAD &lt; 1 SOL</div>
                          <div className="text-base font-bold text-rose-700">9 (75%)</div>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                          <div className="text-[10px] text-slate-500">AVG LIFETIME</div>
                          <div className="text-base font-bold text-amber-700">4.2 min</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5 text-xs text-slate-700">
                      <div className="text-slate-600 text-[11px] mb-1 font-semibold">Prior Deployments:</div>
                      <div className="space-y-1 font-mono text-[10px] text-slate-600">
                        <div className="flex justify-between"><span>$PEPEWIF ($0 MC)</span><span className="text-rose-700 font-bold">Rugged in 2m</span></div>
                        <div className="flex justify-between"><span>$CATMOON ($0 MC)</span><span className="text-rose-700 font-bold">Rugged in 6m</span></div>
                      </div>
                    </div>
                  </div>

                  {/* State 4: AI Report Modal Focus */}
                  <div className="panel-state-view space-y-3">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs">
                      <div className="flex items-center justify-between text-emerald-950 font-bold pb-2 border-b border-emerald-200">
                        <span className="flex items-center gap-1.5">
                          <Bot className="h-4 w-4 text-emerald-700" />
                          CANARY AI VERDICT — CLAUDE 3.5
                        </span>
                        <span className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded text-[9px] font-bold">CONFIDENCE: 98%</span>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-700">
                        &quot;High probability honey-pot / dev exit trap. Top 5 wallets share funding source from Tornado Cash 40 minutes before launch. Dev holds 18% disguised across 3 fresh sub-wallets.&quot;
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Analysis completed in 1.4s</span>
                      </div>
                      <span className="text-emerald-700 font-bold">SAFE TO SKIP</span>
                    </div>
                  </div>

                </div>

                {/* Window Bottom Actions Bar */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-[10px] font-bold text-cyan-700 shadow-xs">
                      <Plus className="h-2.5 w-2.5" /> Watchlist
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700 shadow-xs">
                      <Sparkles className="h-2.5 w-2.5" /> AI Report
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700">
                    <SolanaLogo className="h-3 w-3" />
                    SOLANA MAINNET
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Step Text & Interactive Progress Rail (5 Cols) */}
            <div className="relative lg:col-span-5 flex gap-6 items-start">
              
              {/* Vertical Progress Rail */}
              <div className="relative flex flex-col items-center self-stretch py-2">
                <div className="absolute top-0 bottom-0 w-0.5 bg-slate-200" />
                <div className="demo-progress-fill absolute top-0 w-0.5 origin-top bg-gradient-to-b from-cyan-500 via-amber-500 to-emerald-500 h-full" />
                
                {SCENES.map((s, idx) => (
                  <div
                    key={s.step}
                    className={`progress-step-pill relative z-10 my-auto flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-[10px] font-bold shadow-xs transition-all duration-300 ${
                      idx === 0 ? "border-cyan-600 bg-cyan-600 text-white shadow-sm" : "text-slate-500"
                    }`}
                  >
                    {s.step}
                  </div>
                ))}
              </div>

              {/* Step Descriptions Container */}
              <div className="relative min-h-[300px] flex-1">
                {SCENES.map((s) => (
                  <div key={s.step} className="demo-step-content absolute inset-0">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider shadow-xs"
                        style={{
                          color: s.color,
                          background: `${s.color}15`,
                          border: `1px solid ${s.color}40`,
                        }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
                      {s.title}
                    </h3>
                    
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 font-normal">
                      {s.desc}
                    </p>

                    <div className="mt-6 flex items-center gap-2 font-mono text-xs text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Inline overlay on pump.fun & DexScreener</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}