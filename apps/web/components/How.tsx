"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

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
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — 02 / HOW IT WORKS
        </p>
        <h2 className="mb-14 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
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
              className="glass relative rounded-3xl p-7 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] bg-white"
            >
              <div className="mb-6 font-mono text-4xl font-extrabold text-slate-300">{s.n}</div>
              <h3 className="font-display text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 font-normal">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-slate-400 md:block">
                  <ArrowRight className="h-6 w-6" />
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
          className="mt-20 overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-amber-50/50 via-white to-cyan-50/50 p-10 text-center shadow-xl sm:p-16"
        >
          <h3 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Stop trusting vibes.
            <br />
            <span className="grad-text">Start reading the chain.</span>
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-600">
            Free to use. No wallet required. Built for people who check the
            deployer before they check the chart.
          </p>
          <a
            href="/api/download"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-xs transition-colors hover:bg-slate-800"
          >
            <span>Install the extension</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}