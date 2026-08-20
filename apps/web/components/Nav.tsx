"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Shield } from "lucide-react";

const LINKS = [
  { label: "Architecture", href: "#architecture" },
  { label: "Platforms", href: "#platforms" },
  { label: "Features", href: "#features" },
  { label: "Live demo", href: "#demo" },
  { label: "Install", href: "#install" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-sm.png"
            alt="CanaryCheck"
            width={34}
            height={34}
            className="h-8.5 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-display text-lg font-bold text-slate-900 tracking-tight">
            Canary<span className="grad-text">Check</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-slate-900">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/api/download"
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-800 active:scale-[0.98]"
        >
          Add to Browser
        </a>
      </div>
    </motion.header>
  );
}