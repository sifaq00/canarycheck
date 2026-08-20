"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  ChevronRight,
} from "lucide-react";
import { PumpFunLogo, SolanaLogo } from "./CryptoLogos";

const SCENES = [
  {
    step: "01",
    title: "Risk score mounts itself",
    desc: "Open any pump.fun coin page. A live 0–100 score panel appears top-right — computed from holder concentration, dev position, deployer history, and sniper behavior.",
    tag: "SCORE · 74",
    color: "#0284c7",
    borderColor: "border-sky-500",
    bgActive: "bg-sky-50/50",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    step: "02",
    title: "Dev sells → red row",
    desc: "The trade stream is live. The instant a deployer or insider wallet sells, its row turns red with a DEV tag. You see the dump while it happens in real-time.",
    tag: "DEV SELL · $2.4K",
    color: "#e11d48",
    borderColor: "border-rose-500",
    bgActive: "bg-rose-50/50",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    step: "03",
    title: "Deployer history surfaces",
    desc: "12 launches, 9 dead under 1 SOL? The panel surfaces the serial deployer's track record before you add liquidity to a scammer's wallet.",
    tag: "12 LAUNCHES · 9 RUGGED",
    color: "#d97706",
    borderColor: "border-amber-500",
    bgActive: "bg-amber-50/50",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    step: "04",
    title: "AI rug report on demand",
    desc: "One click. Claude reads the complete on-chain picture and writes the verdict — red flags, timeline, and what to watch. 3 free per day.",
    tag: "AI REPORT · READY",
    color: "#059669",
    borderColor: "border-emerald-500",
    bgActive: "bg-emerald-50/50",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export default function PinnedDemo() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-24 overflow-hidden" id="demo">
      {/* Subtle Porcelain Ambient Glow */}
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-amber-500/6 blur-[100px] top-1/3 right-1/4" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            — 03 / LIVE INTERACTIVE RADAR
          </p>
          <h2 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">
            See CanaryCheck <br />
            <span className="grad-text">In Action as You Scroll.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
            Real-time HUD mounts directly onto pump.fun and DexScreener — giving you instant forensics with zero tab-switching.
          </p>
        </div>

        {/* 2-Column Sticky-Flow Layout (Matching markcowk.vercel.app Natural Scroll) */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Natural Step Cards List (6 Cols) */}
          <div className="space-y-4 lg:col-span-6">
            {SCENES.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <motion.div
                  key={s.step}
                  onViewportEnter={() => setActiveStep(idx)}
                  viewport={{ margin: "-30% 0px -30% 0px" }}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative cursor-pointer rounded-3xl p-6 transition-all duration-300 ${
                    isActive
                      ? `border-2 ${s.borderColor} bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] ${s.bgActive} scale-[1.01]`
                      : "border border-slate-200/80 bg-white/60 hover:bg-white hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-2xl font-mono text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? "text-white shadow-md"
                            : "border border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                        style={{
                          backgroundColor: isActive ? s.color : undefined,
                        }}
                      >
                        {s.step}
                      </span>
                      <span className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold border ${s.badgeBg}`}>
                        {s.tag}
                      </span>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive ? "text-slate-900 translate-x-1" : "text-slate-400 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                    {s.desc}
                  </p>

                  {isActive && (
                    <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-slate-500 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Viewing live preview in radar</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sticky Live Radar Mockup Card (6 Cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-sky-500/5 to-amber-500/10 blur-xl opacity-60" />
              
              <div className="glass relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 font-mono shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2.5 flex items-center gap-1.5 font-mono text-[11px] text-slate-700 font-semibold">
                      <PumpFunLogo className="h-3.5 w-3.5" />
                      pump.fun/coin/9xQz…pump
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE HOOK
                  </div>
                </div>

                {/* Animated Mockup State Views with Smooth Crossfade */}
                <div className="relative min-h-[175px] my-3">
                  <AnimatePresence mode="wait">
                    
                    {/* State 1: Risk Score Dial */}
                    {activeStep === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-2.5"
                      >
                        <div className="flex items-center justify-between rounded-xl border border-cyan-200/90 bg-gradient-to-r from-cyan-50/70 via-white to-sky-50/50 p-3.5 shadow-xs">
                          <div>
                            <div className="font-display text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                              74<span className="text-sm text-slate-500 font-normal">/100</span>
                            </div>
                            <div className="mt-1 flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-wider text-amber-700">
                              <ShieldAlert className="h-3 w-3" /> High Risk Detected
                            </div>
                          </div>
                          <div className="space-y-1 text-right">
                            <div className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow-xs">
                              TOP-10 <span className="text-amber-700 font-bold">82%</span>
                            </div>
                            <div className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow-xs">
                              DEV HOLD <span className="text-rose-700 font-bold">18%</span>
                            </div>
                            <div className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow-xs">
                              SNIPERS <span className="text-cyan-800 font-bold">47 WALLETS</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 text-xs space-y-1">
                          <div className="flex justify-between text-slate-700 font-semibold text-[10px]">
                            <span>Liquidity Curve Status</span>
                            <span className="text-emerald-700 font-bold">Raydium Graduation 64%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                            <div className="h-full w-[64%] bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* State 2: Dev Sell Dump Alert */}
                    {activeStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-1.5"
                      >
                        <div className="rounded-xl border border-rose-200 bg-rose-50/90 p-2.5 text-xs shadow-xs">
                          <div className="flex items-center justify-between text-rose-800 font-bold pb-1 border-b border-rose-200">
                            <span className="flex items-center gap-1 text-[11px]">
                              <Flame className="h-3.5 w-3.5 text-rose-600" />
                              URGENT INSIDER DUMP ALERT
                            </span>
                            <span className="text-rose-600 font-mono text-[9px]">0.2s AGO</span>
                          </div>
                          <p className="mt-1 text-[10px] text-rose-950 font-mono font-medium leading-snug">
                            Deployer wallet dumped <b>14.2M tokens (18.4% supply)</b>.
                          </p>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-slate-700 text-[10px]">
                            <span className="flex items-center gap-1 text-emerald-700 font-bold">
                              <ArrowUpRight className="h-3 w-3" /> BUY 0.45 SOL
                            </span>
                            <span className="text-slate-500 font-mono">9xQz…31aB</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-rose-50 border border-rose-300 px-2.5 py-1 text-rose-800 font-bold shadow-xs text-[10px]">
                            <span className="flex items-center gap-1">
                              <ArrowDownRight className="h-3 w-3 text-rose-600" />
                              <span className="bg-rose-600 text-white px-1 py-0.2 rounded text-[7px]">DEV</span>
                              SELL 2.40 SOL (DUMP)
                            </span>
                            <span className="text-rose-700 font-mono">9xQz…31aB</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-slate-700 text-[10px]">
                            <span className="flex items-center gap-1 text-emerald-700 font-bold">
                              <ArrowUpRight className="h-3 w-3" /> BUY 0.12 SOL
                            </span>
                            <span className="text-slate-500 font-mono">kLm9…77cD</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* State 3: Deployer Forensics */}
                    {activeStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-1.5"
                      >
                        <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-2.5 text-xs shadow-xs">
                          <div className="flex items-center justify-between text-amber-900 font-bold pb-1 border-b border-amber-200">
                            <span className="flex items-center gap-1 text-[11px]">
                              <History className="h-3.5 w-3.5 text-amber-700" />
                              SERIAL DEPLOYER PROFILE
                            </span>
                            <span className="text-amber-800 font-mono font-bold text-[9px]">SERIAL RUGGER</span>
                          </div>
                          <div className="mt-1.5 grid grid-cols-3 gap-1 text-center">
                            <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                              <div className="text-[8px] text-slate-500 font-semibold">LAUNCHES</div>
                              <div className="text-xs font-bold text-slate-900">12</div>
                            </div>
                            <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                              <div className="text-[8px] text-slate-500 font-semibold">DEAD &lt; 1 SOL</div>
                              <div className="text-xs font-bold text-rose-700">9 (75%)</div>
                            </div>
                            <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
                              <div className="text-[8px] text-slate-500 font-semibold">AVG LIFETIME</div>
                              <div className="text-xs font-bold text-amber-700">4.2m</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-2 text-xs text-slate-700">
                          <div className="text-slate-700 text-[9px] mb-0.5 font-bold">Prior Deployments:</div>
                          <div className="space-y-0.5 font-mono text-[9px] text-slate-600">
                            <div className="flex justify-between"><span>$PEPEWIF ($0 MC)</span><span className="text-rose-700 font-bold">Rugged in 2m</span></div>
                            <div className="flex justify-between"><span>$CATMOON ($0 MC)</span><span className="text-rose-700 font-bold">Rugged in 6m</span></div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* State 4: Claude AI Verdict */}
                    {activeStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-1.5"
                      >
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-2.5 text-xs shadow-xs">
                          <div className="flex items-center justify-between text-emerald-950 font-bold pb-1 border-b border-emerald-200">
                            <span className="flex items-center gap-1 text-[11px]">
                              <Bot className="h-3.5 w-3.5 text-emerald-700" />
                              CANARY AI VERDICT — CLAUDE 3.5
                            </span>
                            <span className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-1.5 py-0.2 rounded text-[7px] font-bold">98% CONFIDENCE</span>
                          </div>
                          <p className="mt-1 text-[10px] leading-snug text-slate-800 font-medium">
                            &quot;High probability honey-pot / dev exit trap. Top 5 wallets share funding from Tornado Cash. Dev holds 18% disguised across sub-wallets.&quot;
                          </p>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-200 p-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-slate-800 font-semibold text-[10px]">Analysis completed in 1.4s</span>
                          </div>
                          <span className="text-emerald-700 font-bold text-[10px]">SAFE TO SKIP</span>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Window Bottom Actions Bar */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
                  <div className="flex gap-1.5">
                    <span className="flex items-center gap-1 rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700 shadow-xs">
                      <Plus className="h-2.5 w-2.5" /> Watchlist
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 shadow-xs">
                      <Sparkles className="h-2.5 w-2.5" /> AI Report
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-700">
                    <SolanaLogo className="h-3 w-3" />
                    SOLANA MAINNET
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}