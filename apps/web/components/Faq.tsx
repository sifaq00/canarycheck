"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Is the risk score reliable?",
    a: "The score is a weighted composite of six on-chain factors — dev position, top-10 holder concentration, token age, deployer track record, sniper behavior, and early mass-sell patterns. Every factor is transparent and clickable: you see the raw numbers behind the verdict. It flags patterns, it does not promise outcomes.",
  },
  {
    q: "Does the extension need my wallet?",
    a: "No. All features in the free tier work without connecting a wallet. Wallet connect is optional — it powers the holder badge and unlocks the premium tier later.",
  },
  {
    q: "Where does the data come from?",
    a: "Real-time trades stream from pump.fun's WebSocket, holder data comes from Solana RPC, and deployer history from pump.fun's public API. Everything is on-chain and verifiable.",
  },
  {
    q: "Do you see my private keys?",
    a: "Never. Wallet connect only reads your public address to check token holdings. We never request transaction signing, and no API keys ever leave our server.",
  },
  {
    q: "How do the free AI reports work?",
    a: "One click sends the token's on-chain picture to Claude, which writes a verdict with red flags. Free users get 3 per 24 hours per IP — enough to vet the tokens that matter.",
  },
  {
    q: "Is this financial advice?",
    a: "No. CanaryCheck surfaces data and flags risk patterns. It never tells you to buy or sell. Always do your own research.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28" id="faq">
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — QUICK QUESTIONS
        </p>
        <h2 className="mb-12 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Questions, <span className="grad-text">answered.</span>
        </h2>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass overflow-hidden rounded-3xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] bg-white"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-base font-bold text-slate-900 sm:text-lg">
                  {f.q}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-300 ${
                    open === i ? "rotate-45 text-amber-700 border-amber-400 bg-amber-50" : "bg-slate-50"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}