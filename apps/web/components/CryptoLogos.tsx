import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

// 1. Solana Official 3-Bar Vector Logo
export function SolanaLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 397 311"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="sol-g1" x1="363" y1="21.5" x2="16.5" y2="280.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient id="sol-g2" x1="363" y1="21.5" x2="16.5" y2="280.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient id="sol-g3" x1="363" y1="21.5" x2="16.5" y2="280.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
      <path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
        fill="url(#sol-g1)"
      />
      <path
        d="M64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
        fill="url(#sol-g2)"
      />
      <path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-63.5-62.7z"
        fill="url(#sol-g3)"
      />
    </svg>
  );
}

// 2. Pump.fun Iconic Pill Capsule Logo
export function PumpFunLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <circle cx="50" cy="50" r="48" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="3" />
      {/* 45 degree pill capsule */}
      <g transform="rotate(-45 50 50)">
        <path
          d="M32 30 C32 20, 68 20, 68 30 L68 50 L32 50 Z"
          fill="#10B981"
        />
        <path
          d="M32 50 L68 50 L68 70 C68 80, 32 80, 32 70 Z"
          fill="#FFFFFF"
        />
        <rect x="30" y="48" width="40" height="4" fill="#047857" rx="2" />
      </g>
    </svg>
  );
}

// 3. DexScreener Eagle Vector Logo
export function DexScreenerLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="100" height="100" rx="22" fill="#111827" />
      <path
        d="M50 18 L76 34 L76 66 L50 82 L24 66 L24 34 Z"
        fill="none"
        stroke="#10B981"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M50 30 L65 40 L65 60 L50 70 L35 60 L35 40 Z"
        fill="#10B981"
        fillOpacity="0.3"
      />
      <circle cx="50" cy="50" r="7" fill="#10B981" />
      <path d="M35 50 L65 50" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 4. Helius RPC Solar Fusion Logo
export function HeliusLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="helius-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="#0F172A" />
      {/* Radiant Solar geometry */}
      <circle cx="50" cy="50" r="26" fill="url(#helius-grad)" />
      <circle cx="50" cy="50" r="15" fill="#0F172A" />
      <circle cx="50" cy="50" r="7" fill="#F97316" />
      <path d="M50 14 L50 24 M50 76 L50 86 M14 50 L24 50 M76 50 L86 50" stroke="url(#helius-grad)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// 5. Phantom Wallet Ghost Logo
export function PhantomLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="phantom-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AB9FF2" />
          <stop offset="100%" stopColor="#7B6FE8" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#phantom-bg)" />
      {/* Ghost Face */}
      <path
        d="M26 48 C26 34, 37 23, 50 23 C63 23, 74 34, 74 48 L74 69 C74 72, 70 75, 67 73 L62 69 L56 73 L50 69 L44 73 L38 69 L33 73 C30 75, 26 72, 26 69 Z"
        fill="#FFFFFF"
      />
      <ellipse cx="42" cy="46" rx="4.5" ry="5.5" fill="#5045C8" />
      <ellipse cx="58" cy="46" rx="4.5" ry="5.5" fill="#5045C8" />
    </svg>
  );
}

// 6. Solflare Wallet Flame Logo
export function SolflareLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="100" height="100" rx="22" fill="#18181B" />
      {/* Geometric Solflare Flame */}
      <path
        d="M50 18 C50 18, 68 36, 68 56 C68 68, 60 78, 50 82 C40 78, 32 68, 32 56 C32 36, 50 18, 50 18 Z"
        fill="url(#solflare-flame)"
      />
      <path
        d="M50 42 C50 42, 59 52, 59 62 C59 68, 55 74, 50 76 C45 74, 41 68, 41 62 C41 52, 50 42, 50 42 Z"
        fill="#FEF08A"
      />
      <defs>
        <linearGradient id="solflare-flame" x1="50" y1="18" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 7. Birdeye Analytics Vision Logo
export function BirdeyeLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="100" height="100" rx="22" fill="#0A0F1D" />
      <path
        d="M18 50 C28 32, 72 32, 82 50 C72 68, 28 68, 18 50 Z"
        stroke="#06B6D4"
        strokeWidth="5"
        fill="none"
      />
      <circle cx="50" cy="50" r="14" fill="#06B6D4" />
      <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
    </svg>
  );
}

// 8. Jupiter DEX Planetary Swap Logo
export function JupiterLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="jup-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="#0F172A" />
      <circle cx="50" cy="50" r="22" fill="url(#jup-grad)" />
      {/* Planetary Ring */}
      <ellipse
        cx="50"
        cy="50"
        rx="36"
        ry="10"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="4"
        transform="rotate(-25 50 50)"
      />
    </svg>
  );
}

// 9. Raydium DEX Prism Logo
export function RaydiumLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="100" height="100" rx="22" fill="#131B2E" />
      <polygon points="50,18 78,68 22,68" fill="none" stroke="#38BDF8" strokeWidth="5" />
      <polygon points="50,34 68,68 32,68" fill="#38BDF8" fillOpacity="0.4" />
      <circle cx="50" cy="56" r="6" fill="#00FFA3" />
    </svg>
  );
}

// 10. Official X / Twitter Logo
export function XTwitterLogo({ className = "h-5 w-5", size }: LogoProps) {
  return (
    <svg
      viewBox="0 0 1200 1227"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}
