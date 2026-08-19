"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      ref={ref}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold text-white">
          🛡 Rug<span className="grad-text">Radar</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-slate-400 sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
          <a
            href="/api/download"
            className="rounded-lg bg-white/10 px-4 py-2 font-medium text-white transition-colors hover:bg-white/20"
          >
            Install
          </a>
        </nav>
      </div>
    </motion.header>
  );
}