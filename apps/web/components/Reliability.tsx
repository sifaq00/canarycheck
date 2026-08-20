"use client";

import { motion } from "motion/react";
import { Zap, Lock, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    t: "Raw data in",
    d: "Trades, holders, deployer history — streamed straight from the chain.",
  },
  {
    t: "Pattern engine",
    d: "Rug choreography is a pattern. We flag the choreography, not the ticker.",
  },
  {
    t: "Verdict out",
    d: "Score, alerts, and AI reports land inline where you already look.",
  },
];

const GUARANTEES = [
  {
    icon: <Zap className="h-6 w-6 text-amber-600" />,
    t: "Real-time",
    d: "Trade stream < 3s from chain",
  },
  {
    icon: <Lock className="h-6 w-6 text-emerald-600" />,
    t: "Keyless",
    d: "No keys in extension, ever",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-cyan-600" />,
    t: "Transparent",
    d: "Every factor shown, no black box",
  },
];

export default function Reliability() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — THE RELIABILITY LAYER
        </p>
        <h2 className="mb-14 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Built to be <span className="grad-text">used, not remembered.</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/50 bg-amber-50 font-mono text-sm font-bold text-amber-700 shadow-xs">
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-400/40 to-transparent" />
                )}
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid gap-5 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:grid-cols-3"
        >
          {GUARANTEES.map((g) => (
            <div key={g.t} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 shadow-inner">
                {g.icon}
              </div>
              <div>
                <div className="font-display text-sm font-bold text-slate-900">{g.t}</div>
                <div className="mt-0.5 text-xs text-slate-600 font-medium">{g.d}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}