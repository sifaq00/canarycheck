"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SCRAMBLE = "!<>-_\\/[]{}—=+*^?#________";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  const [scramble, setScramble] = useState(false);
  const [display, setDisplay] = useState("ape in.");

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMx(((e.clientX - r.left) / r.width) * 100);
      setMy(((e.clientY - r.top) / r.height) * 100);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!scramble) return;
    let frame = 0;
    let raf: number;
    const target = "ape in.";
    const chars = target.split("");
    const tick = () => {
      frame++;
      setDisplay(
        chars
          .map((c, i) => {
            if (c === " ") return " ";
            if (frame > i * 2 + 12) return c;
            return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
          })
          .join("")
      );
      if (frame < 12 + chars.length * 2) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scramble]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseEnter={() => setScramble(true)}
      onMouseLeave={() => setScramble(false)}
    >
      <div className="bg-grid absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${mx}% ${my}%, rgba(6,182,212,0.1), transparent 45%)`,
        }}
      />
      <div className="aurora h-[420px] w-[420px] bg-cyan-500/30 top-[-80px] left-[10%]" style={{ animationDelay: "0s" }} />
      <div className="aurora h-[380px] w-[380px] bg-blue-500/25 top-[10%] right-[8%]" style={{ animationDelay: "-7s" }} />
      <div className="aurora h-[320px] w-[320px] bg-emerald-500/20 bottom-[-60px] left-[35%]" style={{ animationDelay: "-14s" }} />

      <motion.div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live on pump.fun · X · DexScreener
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl"
        >
          See the <span className="grad-text">risk</span> before
          <br />
          you {display}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-base text-slate-400 sm:text-lg"
        >
          Real-time rug-risk scores, dev-sell alerts, and deployer history —
          inline on every token page, tweet, and chart. AI rug reports on demand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="/api/download"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Install the extension
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-slate-200 transition-colors hover:bg-white/10"
          >
            How it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-6 font-mono text-xs text-slate-500"
        >
          <span>Free tier</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>No wallet needed</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>3 AI reports / day</span>
        </motion.div>
      </motion.div>
    </section>
  );
}