"use client";

import { motion } from "motion/react";

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
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-400">
          / pricing
        </p>
        <h2 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl">
          Free for the masses.
          <br />
          <span className="grad-gold">Premium for the holders.</span>
        </h2>
        <p className="mb-14 max-w-lg text-sm text-slate-400">
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
              className={`relative rounded-3xl p-8 ${
                t.highlight
                  ? "border border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-transparent shadow-[0_0_60px_-15px_rgba(245,158,11,0.35)]"
                  : "glass"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                  Most powerful
                </span>
              )}
              <div className="font-display text-lg font-semibold text-white">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-white">{t.price}</span>
                <span className="font-mono text-xs text-slate-500">{t.per}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">{t.desc}</p>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className={t.highlight ? "text-amber-400" : "text-emerald-400"}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={t.href}
                className={`mt-8 block rounded-xl py-3.5 text-center font-semibold transition-transform hover:scale-[1.02] ${
                  t.highlight
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-slate-600">
          $RGRD is a utility token for access tiers — not an investment product.
        </p>
      </div>
    </section>
  );
}