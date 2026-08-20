"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    per: "forever",
    desc: "Everything a retail degen needs to stay out of rugs.",
    cta: "Install now",
    href: "/api/download",
    features: [
      "Unlimited risk scores on pump.fun, X & DexScreener",
      "Real-time dev-sell alerts",
      "Deployer track record & sniper detection",
      "Watchlist up to 5 tokens",
      "3 AI rug reports per day",
    ],
    highlight: false,
  },
  {
    name: "Holder",
    price: "$RGRD",
    per: "hold to unlock",
    desc: "For people who read the chain for a living.",
    cta: "Hold the token",
    href: "#",
    features: [
      "Everything in Free",
      "Unlimited AI rug reports",
      "Unlimited watchlist + desktop alerts",
      "Advanced bundle detection",
      "Weekly deployer leaderboard access",
      "Priority support",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section className="relative py-28" id="pricing">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
          — ACCESS & PRICING
        </p>
        <h2 className="mb-4 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Free for the masses.
          <br />
          <span className="grad-gold">Premium for the holders.</span>
        </h2>
        <p className="mb-14 max-w-lg text-sm text-slate-600">
          The radar stays free. Power users who hold the $RGRD utility token
          unlock the full arsenal — same playbook as every tool in this space.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={`relative rounded-3xl p-8 transition-all ${
                t.highlight
                  ? "border border-amber-300/90 bg-gradient-to-b from-amber-50/70 via-white to-slate-50 shadow-[0_20px_50px_rgba(245,158,11,0.12)]"
                  : "glass border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] bg-white"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                  Most powerful
                </span>
              )}
              <div className="font-display text-lg font-bold text-slate-900">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-5xl font-extrabold text-slate-900">{t.price}</span>
                <span className="font-mono text-xs text-slate-500 font-medium">{t.per}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed">{t.desc}</p>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                    <Check className={`h-4 w-4 shrink-0 mt-0.5 ${t.highlight ? "text-amber-700 font-bold" : "text-emerald-700"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                className={`mt-8 block rounded-xl py-3.5 text-center font-bold transition-all shadow-xs ${
                  t.highlight
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                }`}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-slate-600 font-medium">
          $RGRD is a utility token for access tiers — not an investment product.
        </p>
      </div>
    </section>
  );
}