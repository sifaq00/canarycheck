import { Radio, ShieldCheck } from "lucide-react";
import {
  SolanaLogo,
  PumpFunLogo,
  DexScreenerLogo,
  HeliusLogo,
  BirdeyeLogo,
  PhantomLogo,
  SolflareLogo,
  JupiterLogo,
  RaydiumLogo,
  XTwitterLogo,
} from "./CryptoLogos";

const THREAT_ITEMS = [
  "DEV SELL DETECTED",
  "TOP-10 HOLDER 82%",
  "DEPLOYER: 12 LAUNCHES · 9 RUGGED",
  "SNIPER WALLETS: 47",
  "AGE: 3 MIN",
  "BUNDLE RISK: HIGH",
  "LIQUIDITY LOCKED",
  "GRADUATION SOON",
];

const ECOSYSTEM_PARTNERS = [
  { name: "Solana", logo: <SolanaLogo className="h-4 w-4" />, tag: "L1 Network" },
  { name: "pump.fun", logo: <PumpFunLogo className="h-5 w-5" />, tag: "Bonding Curve" },
  { name: "DexScreener", logo: <DexScreenerLogo className="h-4 w-4" />, tag: "Real-Time DEX" },
  { name: "Helius", logo: <HeliusLogo className="h-4 w-4" />, tag: "High-Speed RPC" },
  { name: "Birdeye", logo: <BirdeyeLogo className="h-4 w-4" />, tag: "Analytics Feed" },
  { name: "Phantom", logo: <PhantomLogo className="h-4 w-4" />, tag: "Wallet Connect" },
  { name: "Solflare", logo: <SolflareLogo className="h-4 w-4" />, tag: "Wallet Connect" },
  { name: "Jupiter", logo: <JupiterLogo className="h-4 w-4" />, tag: "Swap Routing" },
  { name: "Raydium", logo: <RaydiumLogo className="h-4 w-4" />, tag: "AMM Protocol" },
  { name: "X (Twitter)", logo: <XTwitterLogo className="h-3.5 w-3.5" />, tag: "Timeline Radar" },
];

export default function Ticker() {
  const threatRow = [...THREAT_ITEMS, ...THREAT_ITEMS, ...THREAT_ITEMS];
  const partnerRow = [...ECOSYSTEM_PARTNERS, ...ECOSYSTEM_PARTNERS, ...ECOSYSTEM_PARTNERS];

  return (
    <div className="relative overflow-hidden border-y border-slate-200/80 bg-white/90 shadow-xs">
      {/* Top Track: Live Threat Stream */}
      <div className="border-b border-slate-100 py-3">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {threatRow.map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs font-bold tracking-wider text-slate-600">
              <span>{t}</span>
              <Radio className="h-3 w-3 text-amber-500 shrink-0 animate-pulse" />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Track: Official Ecosystem & Supported Platforms */}
      <div className="bg-slate-50/70 py-3">
        <div className="marquee-reverse flex w-max items-center gap-8 whitespace-nowrap">
          {partnerRow.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 shadow-xs transition-all hover:border-cyan-400 hover:shadow-sm"
            >
              <span className="shrink-0">{p.logo}</span>
              <span className="font-display text-xs font-bold text-slate-800">{p.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.2 font-mono text-[9px] font-semibold text-slate-500">
                {p.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}