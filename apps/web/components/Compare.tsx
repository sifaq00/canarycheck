"use client";

import { motion } from "motion/react";
import { Check, X, Minus } from "lucide-react";

const ROWS = [
  ["Reads inline on pump.fun, X & DexScreener", "Yes", "No", "No"],
  ["A verdict without a single click", "Yes", "No", "No"],
  ["Real-time dev-sell alerts", "Yes", "No", "Partial"],
  ["One task, not a bundle", "Yes", "Yes", "No"],
  ["Free to use", "Yes", "Partial", "Partial"],
] as const;

function CellStatus({ val }: { val: string }) {
  if (val === "Yes") {
    return (
      <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
        <Check className="h-3.5 w-3.5 text-slate-600" /> Yes
      </span>
    );
  }
  if (val === "No") {
    return (
      <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
        <X className="h-3.5 w-3.5 text-rose-500 font-bold" /> No
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
      <Minus className="h-3.5 w-3.5 text-amber-600 font-bold" /> Partial
    </span>
  );
}

export default function Compare() {
  return (
    <section className="relative py-28" id="compare">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — 05 / AGAINST THE ALTERNATIVES
        </p>
        <h2 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
          The same data,
          <br />
          <span className="grad-text">in a different place.</span>
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-slate-600 font-normal">
          Every checker exists. The difference is where the answer lives — and
          whether you ever have to leave the timeline to get it.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="glass mt-14 overflow-x-auto rounded-3xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] bg-white"
        >
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                <th className="px-6 py-4 font-bold"> </th>
                <th className="px-6 py-4 font-bold text-amber-800 bg-amber-50/40">CanaryCheck</th>
                <th className="px-6 py-4 font-bold">Destination sites</th>
                <th className="px-6 py-4 font-bold">Bundled extensions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4 text-slate-900 font-bold">{r[0]}</td>
                  <td className="px-6 py-4 font-bold text-emerald-800 bg-amber-50/20">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs">
                      <Check className="h-3.5 w-3.5" /> Yes
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    <CellStatus val={r[2]} />
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    <CellStatus val={r[3]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="mt-6 font-mono text-xs text-slate-600 font-medium">
          Destination sites = Solscan / separate checkers. Bundled extensions = all-in-one wallets & security suites.
        </p>
      </div>
    </section>
  );
}