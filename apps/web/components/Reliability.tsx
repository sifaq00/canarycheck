"use client";

import { motion } from "motion/react";

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

export default function Reliability() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-400">
          / reliability
        </p>
        <h2 className="mb-14 font-display text-4xl font-bold text-white sm:text-5xl">
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
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 font-mono text-sm font-bold text-cyan-400">
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
                )}
              </div>
              <h3 className="font-display text-xl font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:grid-cols-3"
        >
          {[
            ["⚡", "Real-time", "Trade stream < 3s from chain"],
            ["🔒", "Keyless", "No keys in extension, ever"],
            ["🛡", "Transparent", "Every factor shown, no black box"],
          ].map(([icon, t, d]) => (
            <div key={t} className="flex items-center gap-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-display text-sm font-semibold text-white">{t}</div>
                <div className="mt-0.5 text-xs text-slate-500">{d}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}