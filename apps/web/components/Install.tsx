"use client";

import { motion } from "motion/react";
import { Download, ArrowRight } from "lucide-react";

const STEPS = [
  "Download the extension ZIP file",
  "Extract the ZIP to a local folder",
  "Open chrome://extensions in Chrome/Brave",
  "Enable Developer mode toggle (top right)",
  "Click Load unpacked (top left)",
  "Select the extracted folder",
  "Open pump.fun, X, or DexScreener — the radar mounts itself",
];

export default function Install() {
  return (
    <section className="relative py-28" id="install">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — 06 / GETTING STARTED
        </p>
        <h2 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Installed in <span className="grad-text">developer mode.</span>
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-slate-600">
          This is a manual developer-mode installation. It is not a one-click
          Chrome Web Store installation.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="glass rounded-3xl p-8 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] bg-white"
          >
            <ol className="space-y-5">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-amber-50 font-mono text-sm font-bold text-amber-700 shadow-xs">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-slate-700 font-medium">{s}</span>
                </li>
              ))}
            </ol>
            <a
              href="/api/download"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-xs transition-colors hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              <span>Download Extension</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Why not the store?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Crypto-adjacent extensions face slow and unpredictable store
                review. Developer mode runs the published source directly,
                with nothing in between.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                The repository is open — read it before you trust it.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
              <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Cost</div>
                  <div className="mt-1 font-bold text-emerald-700 text-sm">Free</div>
                </div>
                <div>
                  <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Wallet</div>
                  <div className="mt-1 font-bold text-slate-800 text-sm">Not required</div>
                </div>
                <div>
                  <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Source</div>
                  <div className="mt-1 font-bold text-slate-800 text-sm">On-chain</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}