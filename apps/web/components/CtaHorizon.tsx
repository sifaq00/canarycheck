"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

export default function CtaHorizon() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden pt-28 pb-20 text-center">
      {/* Massive Curved Glowing Horizon Dome (Centered) */}
      <div className="horizon-dome bottom-[-160px]" />
      
      {/* Aurora Ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora h-[450px] w-[450px] bg-amber-500/15 bottom-[10%] left-[25%]" />
        <div className="aurora h-[400px] w-[400px] bg-sky-500/15 bottom-[15%] right-[25%]" style={{ animationDelay: "-9s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-50 px-4 py-1.5 font-mono text-xs font-bold text-amber-700 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          START TRADING WITH CONFIDENCE
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
        >
          Ready to Spot Every Rug <br />
          <span className="grad-text">Before It Drops?</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base text-slate-600 leading-relaxed"
        >
          Join thousands of Solana traders. Real-time scores, dev-sell alerts, and AI rug reports right where you browse.
        </motion.p>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/api/download"
            className="flex items-center gap-2.5 rounded-full bg-slate-900 px-8 py-4 font-display font-bold text-sm text-white shadow-lg shadow-slate-900/10 transition-all hover:scale-[1.03] hover:bg-slate-800 active:scale-[0.98]"
          >
            <span>Add to Chrome (Free)</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#install"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 font-mono text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            Installation Guide
          </a>
        </motion.div>

        {/* Email Updates Subscription Pill */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-10 flex max-w-md items-center justify-between gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.06)]"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Get token & product updates..."
            className="w-full bg-transparent pl-4 font-mono text-xs text-slate-900 placeholder-slate-400 outline-none"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition-transform hover:scale-105 hover:bg-slate-800 active:scale-95"
          >
            {subscribed ? <Check className="h-4 w-4 text-white" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </motion.form>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-600 font-bold" /> 100% Free Forever
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-600 font-bold" /> Keyless & Non-Custodial
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-600 font-bold" /> No Wallet Connection Required
          </span>
        </div>

      </div>
    </section>
  );
}
