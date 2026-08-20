"use client";

import { motion } from "motion/react";
import { ShieldCheck, Zap, Activity, ArrowRight } from "lucide-react";
import { SolanaLogo, PumpFunLogo, DexScreenerLogo, XTwitterLogo } from "./CryptoLogos";

export default function InnovationTrio() {
  return (
    <section className="relative py-28 overflow-hidden" id="architecture">
      {/* Subtle background glow */}
      <div className="aurora h-[400px] w-[400px] bg-amber-500/10 top-[20%] left-[-10%]" />
      <div className="aurora h-[400px] w-[400px] bg-sky-500/10 bottom-[10%] right-[-10%]" style={{ animationDelay: "-8s" }} />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
              — ARCHITECTURE & INNOVATION
            </p>
            <h2 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Shaping the Future of <br />
              <span className="grad-text">On-Chain Risk Intelligence</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-slate-600 leading-relaxed md:text-right font-medium">
            Beyond speculation and blind trust. <br />
            Deterministic scoring, live WebSocket streaming, and zero-leak security.
          </p>
        </div>

        {/* 3 Showcase Bento Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Card 1: Secure by Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="glass group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 border border-slate-200/90 hover:border-cyan-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all"
          >
            <div>
              <div className="mb-2 font-display text-xl font-bold text-slate-900">Secure by Design</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Keyless architecture. No private keys, seed phrases, or external API keys ever touch the client bundle.
              </p>
            </div>

            {/* Clean Shield Schematic Box */}
            <div className="relative my-8 flex h-52 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-grid opacity-30" />
              
              {/* Outer Security Ring */}
              <div className="absolute h-36 w-36 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow" />
              
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-50 border border-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-md">
                <ShieldCheck className="h-10 w-10 text-cyan-600" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
              </div>
              <div className="absolute bottom-3 font-mono text-[10px] font-bold tracking-wider text-slate-600">
                ZERO-LEAK MV3 SERVICE WORKER
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-xs text-slate-600 font-medium">
              <span>Client Security</span>
              <span className="text-emerald-700 font-bold">100% Non-Custodial</span>
            </div>
          </motion.div>

          {/* Card 2: Multi-Feed Orbital Power (Concentric Orbital Rings) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 border border-amber-300/80 bg-gradient-to-b from-amber-50/40 via-white to-slate-50 shadow-[0_15px_40px_rgba(245,158,11,0.08)]"
          >
            <div>
              <div className="mb-2 font-display text-xl font-bold text-slate-900">Multi-Feed Power</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Harmonizing pump.fun, DexScreener, X timeline, and Solana RPC streams into one continuous signal.
              </p>
            </div>

            {/* Concentric Orbital Rings with Rotating Nodes */}
            <div className="relative my-6 flex h-52 items-center justify-center overflow-hidden">
              {/* Outer Ring */}
              <div className="absolute h-44 w-44 rounded-full border border-dashed border-amber-400/40 animate-spin-slow flex items-center justify-center">
                {/* Node 1: Solana */}
                <div className="absolute top-0 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-cyan-400 shadow-md p-1.5">
                  <SolanaLogo className="h-4 w-4" />
                </div>
                {/* Node 2: Pump */}
                <div className="absolute bottom-0 translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-emerald-400 shadow-md p-1.5">
                  <PumpFunLogo className="h-4 w-4" />
                </div>
              </div>

              {/* Inner Ring */}
              <div className="absolute h-28 w-28 rounded-full border border-cyan-400/50 animate-spin-reverse-slow flex items-center justify-center">
                {/* Node 3: Dex */}
                <div className="absolute left-0 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 border border-teal-400 shadow-md p-1">
                  <DexScreenerLogo className="h-4 w-4" />
                </div>
                {/* Node 4: X */}
                <div className="absolute right-0 translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 border border-slate-700 shadow-md p-1.5 text-white">
                  <XTwitterLogo className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Central Core Shield */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-amber-400 shadow-md">
                <Zap className="h-6 w-6 fill-amber-400" />
              </div>
            </div>

            {/* Attached CTA Pill Button */}
            <a
              href="/api/download"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-xs text-white shadow-xs transition-colors hover:bg-slate-800 active:scale-[0.98]"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          {/* Card 3: Instant & Scalable */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 border border-slate-200/90 hover:border-cyan-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all"
          >
            <div>
              <div className="mb-2 font-display text-xl font-bold text-slate-900">Instant & Scalable</div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Sub-3 second latency from on-chain event to visual alert. Designed for rapid-fire memecoin market tempo.
              </p>
            </div>

            {/* Radiating Beacon Graphic */}
            <div className="relative my-8 flex h-52 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-grid opacity-30" />
              {/* Radiating Waves */}
              <div className="absolute h-36 w-36 rounded-full border border-cyan-500/30 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute h-24 w-24 rounded-full border border-cyan-500/50 animate-ping" style={{ animationDuration: "2s" }} />
              
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-300 shadow-md">
                <Activity className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="absolute bottom-3 font-mono text-[10px] font-bold text-slate-600">
                PUMPPORTAL WS + HELIUS RPC
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 font-mono text-xs text-slate-600 font-medium">
              <span>Alert Pipeline</span>
              <span className="text-cyan-800 font-bold">&lt; 3,000 ms</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
