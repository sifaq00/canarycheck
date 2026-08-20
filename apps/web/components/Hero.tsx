"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Shield,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  Plus,
  Crosshair,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Zap,
  Activity,
  Lock,
} from "lucide-react";
import { SolanaLogo, PumpFunLogo, DexScreenerLogo } from "./CryptoLogos";

interface TokenPreset {
  id: string;
  name: string;
  ca: string;
  score: number;
  scoreLabel: string;
  scoreColor: string;
  scoreBg: string;
  scoreBorder: string;
  marketCap: string;
  devSold: string;
  devHold: string;
  top10: string;
  snipers: number;
  rugRate: string;
  launches: string;
  avgLifespan: string;
  trades: {
    type: "buy" | "dev-sell" | "sniper";
    amount: string;
    wallet: string;
    time: string;
  }[];
}

const PRESETS: Record<string, TokenPreset> = {
  canary: {
    id: "canary",
    name: "$CANARY",
    ca: "9eThz9Cw1BVHTzSj12SfFpU9Jm7zK1fDRSHHkXNUpump",
    score: 74,
    scoreLabel: "Very High Risk",
    scoreColor: "text-red-600",
    scoreBg: "bg-red-50",
    scoreBorder: "border-red-200",
    marketCap: "$34,820",
    devSold: "42%",
    devHold: "18%",
    top10: "82%",
    snipers: 47,
    rugRate: "75%",
    launches: "12 launched · 9 died < 1 SOL",
    avgLifespan: "4.2 Minutes",
    trades: [
      { type: "dev-sell", amount: "DEV SELL 2.40 SOL", wallet: "9xQz…31aB", time: "just now" },
      { type: "buy", amount: "BUY 0.45 SOL", wallet: "kLm9…77cD", time: "2s ago" },
      { type: "sniper", amount: "SNIPER BUNDLE (47)", wallet: "block 0", time: "3s ago" },
      { type: "buy", amount: "BUY 1.10 SOL", wallet: "3mJp…88eA", time: "6s ago" },
    ],
  },
  rugged: {
    id: "rugged",
    name: "$RUGGED",
    ca: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    score: 93,
    scoreLabel: "Critical Rug Risk",
    scoreColor: "text-rose-600",
    scoreBg: "bg-rose-50",
    scoreBorder: "border-rose-300",
    marketCap: "$8,450",
    devSold: "89%",
    devHold: "4%",
    top10: "94%",
    snipers: 84,
    rugRate: "92%",
    launches: "24 launched · 22 died < 0.5 SOL",
    avgLifespan: "1.5 Minutes",
    trades: [
      { type: "dev-sell", amount: "DEV DUMP 12.8 SOL", wallet: "7fKp…91mQ", time: "just now" },
      { type: "dev-sell", amount: "INSIDER EXIT 4.2 SOL", wallet: "4aBz…12xP", time: "1s ago" },
      { type: "sniper", amount: "MASS SNIPER EXIT", wallet: "block 0-2", time: "2s ago" },
      { type: "buy", amount: "BUY 0.05 SOL", wallet: "victim…88aa", time: "4s ago" },
    ],
  },
  safe: {
    id: "safe",
    name: "$BONK_SAFE",
    ca: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    score: 16,
    scoreLabel: "Low Risk Verified",
    scoreColor: "text-emerald-700",
    scoreBg: "bg-emerald-50",
    scoreBorder: "border-emerald-200",
    marketCap: "$1.42M",
    devSold: "0%",
    devHold: "0%",
    top10: "14%",
    snipers: 0,
    rugRate: "0%",
    launches: "1 launched · 1 graduated (Fair)",
    avgLifespan: "240+ Days",
    trades: [
      { type: "buy", amount: "BUY 4.80 SOL", wallet: "88xP…44tZ", time: "just now" },
      { type: "buy", amount: "BUY 2.15 SOL", wallet: "2aJk…99eX", time: "3s ago" },
      { type: "buy", amount: "BUY 1.90 SOL", wallet: "9qLm…11wB", time: "5s ago" },
      { type: "buy", amount: "BUY 0.85 SOL", wallet: "4xYt…66kP", time: "8s ago" },
    ],
  },
};

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}

export default function Hero() {
  const [selectedTokenKey, setSelectedTokenKey] = useState<string>("canary");
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(1);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [tradesStream, setTradesStream] = useState(PRESETS.canary.trades);

  const currentToken = PRESETS[selectedTokenKey] || PRESETS.canary;

  // Handle Token Switching Simulation
  const handleSelectToken = (key: string) => {
    if (key === selectedTokenKey) return;
    setIsScanning(true);
    setTimeout(() => {
      setSelectedTokenKey(key);
      setTradesStream(PRESETS[key].trades);
      setIsScanning(false);
    }, 450);
  };

  // Copy CA to clipboard
  const copyCa = () => {
    navigator.clipboard?.writeText(currentToken.ca).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  // Toggle watchlist
  const toggleWatchlist = () => {
    if (isWatchlisted) {
      setIsWatchlisted(false);
      setWatchlistCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsWatchlisted(true);
      setWatchlistCount((prev) => prev + 1);
    }
  };

  // Simulated live trade stream every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTradesStream((prev) => {
        const randomBuyAmounts = ["0.32", "0.64", "1.25", "2.10", "0.18"];
        const randomAmount = randomBuyAmounts[Math.floor(Math.random() * randomBuyAmounts.length)];
        const newTrade = {
          type: "buy" as const,
          amount: `BUY ${randomAmount} SOL`,
          wallet: `${Math.random().toString(36).substring(2, 6)}…${Math.random().toString(36).substring(2, 6)}`,
          time: "just now",
        };
        return [newTrade, ...prev.slice(0, 3)];
      });
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // Parallax Scroll Tracking
  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  // Staggered 3D Parallax layers
  const cardLeftY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const cardCenterY = useTransform(scrollYProgress, [0, 1], [0, -95]);
  const cardRightY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const horizonY = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const aurorasY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 35]);

  return (
    <section ref={heroSectionRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Background Starfield Grid & Parallax Auroras */}
      <div className="bg-grid absolute inset-0 opacity-80 z-0" />
      <motion.div style={{ y: aurorasY }} className="pointer-events-none absolute inset-0 z-0">
        <div className="aurora h-[480px] w-[480px] bg-amber-500/15 top-[-100px] left-[15%]" />
        <div className="aurora h-[420px] w-[420px] bg-sky-500/15 top-[10%] right-[10%]" style={{ animationDelay: "-6s" }} />
        <div className="aurora h-[360px] w-[360px] bg-emerald-500/10 bottom-[20%] left-[30%]" style={{ animationDelay: "-12s" }} />
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        
        {/* Live Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="badge-wave-reaction mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-bold text-amber-700 backdrop-blur-md shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          CANARYCHECK MV3 EXTENSION · FREE FOR RETAIL
        </motion.div>

        {/* Hero Title with Synced Radar Wave Lighting Beam Sweep */}
        <div className="relative z-30 w-full max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight select-none leading-[1.08]"
          >
            <span className="hero-title-lighting-1 block whitespace-nowrap">Spot Every Solana Rug</span>
            <span className="hero-title-lighting-2 block whitespace-nowrap">Early &amp; In Place.</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="subtitle-wave-reaction relative z-30 mt-6 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed font-normal"
        >
          CanaryCheck reads every token, tweet, and chart you look at —
          putting real-time risk scores, dev-sell alerts, and deployer history right in front of your eyes.
        </motion.p>

        {/* Interactive Search Bar with Live Scan Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="search-wave-reaction relative z-30 mt-8 flex w-full max-w-lg items-center justify-between gap-2 rounded-full border border-slate-200/90 bg-white p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20"
        >
          <div className="flex flex-1 items-center gap-3 pl-4">
            <Shield className="h-4 w-4 text-cyan-600 shrink-0" />
            <input
              type="text"
              value={currentToken.ca}
              readOnly
              className="w-full bg-transparent font-mono text-xs text-slate-900 outline-none sm:text-sm cursor-default select-all"
            />
          </div>
          <button
            onClick={() => handleSelectToken(selectedTokenKey === "canary" ? "rugged" : selectedTokenKey === "rugged" ? "safe" : "canary")}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-xs text-white shadow-xs transition-colors hover:bg-slate-800 active:scale-[0.98] sm:text-sm whitespace-nowrap"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Scanning…</span>
              </>
            ) : (
              <>
                <span>Switch Token</span>
                <span>→</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Interactive Preset Chips Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="chips-wave-reaction relative z-30 mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-slate-500"
        >
          <span className="text-[11px] font-medium text-slate-400">Live Simulator:</span>
          
          {/* Preset 1: Canary */}
          <button
            onClick={() => handleSelectToken("canary")}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-bold transition-all ${
              selectedTokenKey === "canary"
                ? "border-amber-400 bg-amber-50 text-amber-800 shadow-xs scale-105"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>$CANARY (Score 74)</span>
          </button>

          {/* Preset 2: Rugged */}
          <button
            onClick={() => handleSelectToken("rugged")}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-bold transition-all ${
              selectedTokenKey === "rugged"
                ? "border-rose-400 bg-rose-50 text-rose-800 shadow-xs scale-105"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span>$RUGGED (Score 93)</span>
          </button>

          {/* Preset 3: Safe */}
          <button
            onClick={() => handleSelectToken("safe")}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-bold transition-all ${
              selectedTokenKey === "safe"
                ? "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-xs scale-105"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>$BONK_SAFE (Score 16)</span>
          </button>

          {/* Copy Current Button */}
          <button
            onClick={copyCa}
            title="Copy Contract Address"
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600 hover:border-cyan-500 hover:text-cyan-700 transition-colors ml-1"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-emerald-600 font-bold"><Check className="h-3 w-3" /> Copied</span>
            ) : (
              <Copy className="h-3 w-3 text-slate-400" />
            )}
          </button>
        </motion.div>

        {/* 3 Floating Bento Cards Deck (Rising from Horizon Curve with 3D Staggered Parallax) */}
        <div className="relative z-20 mt-14 w-full max-w-5xl">
          {/* Single Pure Glowing Letter-n Dome Wave (Radiating from the Horizon Dome Rim) */}
          <div className="hero-single-n-wave pointer-events-none z-[1]">
            <svg viewBox="0 0 1000 250" className="w-full h-full overflow-visible" fill="none">
              <path
                d="M 15,240 A 520,225 0 0,1 985,240"
                stroke="url(#n-wave-grad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="n-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(2, 132, 199, 0)" />
                  <stop offset="12%" stopColor="rgba(2, 132, 199, 0.4)" />
                  <stop offset="35%" stopColor="rgba(14, 165, 233, 0.65)" />
                  <stop offset="50%" stopColor="rgba(56, 189, 248, 0.85)" />
                  <stop offset="65%" stopColor="rgba(14, 165, 233, 0.65)" />
                  <stop offset="88%" stopColor="rgba(2, 132, 199, 0.4)" />
                  <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Glowing Horizon Arc Behind the Cards */}
          <div className="horizon-glow bottom-[-80px] z-[2]" />

          {/* Cards Flex/Grid with Staggered Parallax Depths */}
          <div className="relative z-20 grid items-end gap-6 md:grid-cols-3">
            
            {/* Left Card: Deployer Track Record */}
            <motion.div
              style={{ y: cardLeftY }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TiltCard className="card-wave-reaction bg-white animate-float rounded-3xl p-6 text-left shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-200/90 transition-all duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-700">
                    DEPLOYER TRACK RECORD
                  </span>
                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold border ${currentToken.scoreBorder} ${currentToken.scoreBg} ${currentToken.scoreColor}`}>
                    <AlertTriangle className="h-2.5 w-2.5" />
                    {currentToken.score >= 50 ? "SUSPICIOUS" : "CLEAN"}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="font-display text-2xl font-bold text-slate-900">
                    {currentToken.rugRate} Rug Rate
                  </div>
                  <p className="font-mono text-xs text-slate-600 mt-1 font-medium">
                    {currentToken.launches}
                  </p>
                </div>
                <div className="mt-4 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-slate-800 font-medium">
                    <span className="text-slate-600">Dev Wallet</span>
                    <span className="text-slate-700 font-bold">{currentToken.trades[0]?.wallet || "9xQz…31aB"}</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-slate-800 font-medium">
                    <span className="text-slate-600">Avg Lifespan</span>
                    <span className={`font-bold ${currentToken.score >= 50 ? "text-red-700" : "text-emerald-700"}`}>
                      {currentToken.avgLifespan}
                    </span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-slate-800 font-medium">
                    <span className="text-slate-600">Snipers in Block 0</span>
                    <span className="text-cyan-800 font-bold">{currentToken.snipers} Wallets</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Center Card: Main Live Token Score Dial (Deepest Protrusion Parallax) */}
            <motion.div
              style={{ y: cardCenterY }}
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <TiltCard className="card-wave-reaction animate-float-delayed relative -top-4 rounded-3xl p-6 text-left shadow-[0_20px_50px_rgba(245,158,11,0.12)] border border-amber-300/80 bg-white transition-all duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200/80 shadow-xs">
                      <PumpFunLogo className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-display text-sm font-bold text-slate-900">
                        <span>{currentToken.name}</span>
                        <span className="rounded bg-slate-900 border border-slate-700 px-1.5 py-0.5 font-mono text-[9px] font-bold text-white flex items-center gap-1 shadow-xs">
                          <SolanaLogo className="h-2.5 w-2.5" />
                          SOL
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-slate-500 font-medium flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Live pump.fun WebSocket
                      </div>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-xs font-bold border ${currentToken.scoreBorder} ${currentToken.scoreBg} ${currentToken.scoreColor}`}>
                    <AlertTriangle className="h-3 w-3" />
                    Score: {currentToken.score}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-4xl font-extrabold text-slate-900">
                      {currentToken.score}
                      <span className="text-lg text-slate-500">/100</span>
                    </div>
                    <div className={`font-mono text-[10px] font-bold uppercase tracking-wider mt-0.5 ${currentToken.scoreColor}`}>
                      {currentToken.scoreLabel}
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <div className="text-slate-500 font-medium">Market Cap</div>
                    <div className="font-extrabold text-emerald-700">{currentToken.marketCap}</div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between font-mono text-[10px] text-slate-600 font-medium">
                      <span>Dev Position (Sold {currentToken.devSold})</span>
                      <span className={`font-bold ${currentToken.score >= 50 ? "text-red-700" : "text-emerald-700"}`}>
                        {currentToken.devHold} Holds
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${currentToken.score >= 50 ? "bg-red-500" : "bg-emerald-500"}`}
                        initial={{ width: "0%" }}
                        animate={{ width: currentToken.devHold }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono text-[10px] text-slate-600 font-medium">
                      <span>Top-10 Concentration</span>
                      <span className={`font-bold ${parseInt(currentToken.top10) > 50 ? "text-amber-700" : "text-emerald-700"}`}>
                        {currentToken.top10}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${parseInt(currentToken.top10) > 50 ? "bg-amber-500" : "bg-emerald-500"}`}
                        initial={{ width: "0%" }}
                        animate={{ width: currentToken.top10 }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={toggleWatchlist}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2 text-center font-mono text-[11px] font-bold transition-all ${
                      isWatchlisted
                        ? "bg-cyan-600 text-white border-cyan-600 shadow-xs"
                        : "bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                    }`}
                  >
                    {isWatchlisted ? (
                      <>
                        <Check className="h-3 w-3" /> In Watchlist
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3" /> Watchlist
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowAiModal(true)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 py-2 text-center font-mono text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors active:scale-95"
                  >
                    <Sparkles className="h-3 w-3" /> AI Report
                  </button>
                </div>
              </TiltCard>
            </motion.div>

            {/* Right Card: Real-Time Trade Stream */}
            <motion.div
              style={{ y: cardRightY }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <TiltCard className="card-wave-reaction bg-white animate-float rounded-3xl p-6 text-left shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-200/90 transition-all duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-700">
                    REAL-TIME TRADES
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE WS
                  </span>
                </div>

                <div className="mt-3 space-y-2 font-mono text-[11px]">
                  <AnimatePresence mode="popLayout">
                    {tradesStream.map((t, idx) => (
                      <motion.div
                        key={idx + t.amount}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center justify-between rounded-lg px-3 py-1.5 ${
                          t.type === "dev-sell"
                            ? "bg-red-50 border border-red-200 text-red-700 font-bold"
                            : t.type === "sniper"
                            ? "bg-cyan-50 border border-cyan-200 text-cyan-800 font-medium"
                            : "bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          {t.type === "dev-sell" ? (
                            <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                          ) : t.type === "sniper" ? (
                            <Crosshair className="h-3.5 w-3.5 text-cyan-600" />
                          ) : (
                            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                          )}
                          {t.amount}
                        </span>
                        <span className="text-[10px] text-slate-400">{t.time}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* AI Report Popover Modal */}
        <AnimatePresence>
          {showAiModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
              onClick={() => setShowAiModal(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span className="font-display font-bold text-slate-900">Claude 3.5 AI Rug Audit</span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">0.4s generated</span>
                </div>
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <div className="font-bold text-slate-900 text-sm">Verdict: {currentToken.scoreLabel}</div>
                    <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                      Token {currentToken.name} has a score of {currentToken.score}/100 based on {currentToken.snipers} detected sniper wallets in Block 0 and {currentToken.top10} supply held by top-10 clusters.
                    </p>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-red-600">
                      <span>⚠</span>
                      <span>Deployer dumped {currentToken.devSold} bag immediately after curve opened</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600">
                      <span>⚠</span>
                      <span>Historical wallet rug rate is {currentToken.rugRate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <span>✓</span>
                      <span>Zero private key permissions requested</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowAiModal(false)}
                    className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                  >
                    Got It
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Summary Metric Counters Below Hero Deck */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 border-t border-slate-200/80 pt-10"
        >
          <div>
            <div className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">+148,000</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">Tokens Scanned</div>
          </div>
          <div>
            <div className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">2,840+</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">Dev Dumps Alerted</div>
          </div>
          <div>
            <div className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">&lt; 3.0s</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">Live RPC Stream Latency</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}