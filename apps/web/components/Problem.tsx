"use client";

import { motion } from "motion/react";
import { ShieldAlert, ExternalLink, ArrowDownRight } from "lucide-react";

export default function Problem() {
  return (
    <section className="relative py-28" id="problem">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — 01 / THE PROBLEM
        </p>
        <h2 className="max-w-2xl font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
          The CA is right there.
          <br />
          <span className="grad-text">The verdict is not.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          A contract address lands in your timeline. In that moment the only
          questions that matter are simple ones. Is the dev still holding, or
          is the bag already in the hands of linked wallets ready to exit
          together?
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Reading that should take a glance. Instead it means leaving the
          post, opening another tool, pasting the address, and waiting. By the
          time the score loads, the call has moved on without you.
        </p>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="glass max-w-md rounded-3xl p-6 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white shadow-xs">
                an
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">anon</div>
                <div className="font-mono text-xs text-slate-500">@anon · 1m</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-800 font-medium">
              is this one safe?
              <span className="ml-2 rounded bg-slate-100 border border-slate-200 px-2 py-0.5 font-mono text-xs font-bold text-slate-700">
                9dFp…4kQt
              </span>
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-600 font-bold">
              <ExternalLink className="h-3.5 w-3.5 text-cyan-600 animate-pulse" />
              LOADING ANOTHER TAB…
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative max-w-md lg:justify-self-end"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-transparent to-cyan-500/10 blur-xl" />
            <div className="glass relative rounded-3xl p-6 border border-slate-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)] bg-white">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-mono text-xs font-bold text-emerald-700">
                  <ShieldAlert className="h-3.5 w-3.5" /> 62 / 100
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  inline · already here
                </span>
              </div>
              <div className="mt-4 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-slate-800 font-medium">
                  <span className="text-slate-600">Dev position</span>
                  <span className="text-red-700 font-bold">18% holds · sold 42%</span>
                </div>
                <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-slate-800 font-medium">
                  <span className="text-slate-600">Top-10 holders</span>
                  <span className="text-amber-700 font-bold">82%</span>
                </div>
                <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2 text-slate-800 font-medium">
                  <span className="text-slate-600">Deployer record</span>
                  <span className="text-amber-700 font-bold">12 launches · 9 died</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 border border-red-200 px-3 py-2 font-mono text-xs text-red-700">
                <span className="flex items-center gap-1 font-bold">
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                  <b>DEV</b> SELL 2.40 SOL
                </span>
                <span className="text-[10px] font-extrabold text-red-600">live</span>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-slate-500 font-medium">
                The signal leaves the timeline the instant you look for it.
                All addresses and metrics are illustrative previews.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}