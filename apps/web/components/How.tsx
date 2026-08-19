"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Install",
    desc: "Download the ZIP, load it unpacked in chrome://extensions. Ten seconds, no store wait.",
  },
  {
    n: "02",
    title: "Browse",
    desc: "Open any pump.fun token, tweet with a CA, or a DexScreener pair. The radar mounts itself.",
  },
  {
    n: "03",
    title: "Decide",
    desc: "Read the score, watch dev behavior live, and hit Generate AI Report for the full picture.",
  },
];

export default function How() {
  return (
    <section className="relative py-28" id="how">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-400">
          / how it works
        </p>
        <h2 className="mb-14 font-display text-4xl font-bold text-white sm:text-5xl">
          Zero friction. <span className="grad-gold">Instant signal.</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="glass relative rounded-2xl p-7"
            >
              <div className="mb-6 font-mono text-4xl font-bold text-white/10">{s.n}</div>
              <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-2xl text-slate-600 md:block">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/80 via-slate-950 to-cyan-950/60 p-10 text-center sm:p-16"
        >
          <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Stop trusting vibes.
            <br />
            <span className="grad-text">Start reading the chain.</span>
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">
            Free to use. No wallet required. Built for people who check the
            deployer before they check the chart.
          </p>
          <a
            href="/api/download"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Install the extension →
          </a>
        </motion.div>
      </div>
    </section>
  );
}