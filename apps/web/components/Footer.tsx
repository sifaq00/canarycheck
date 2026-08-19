export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs text-slate-500 md:flex-row">
        <span>🛡 Rug Radar — risk intelligence for Solana memecoins</span>
        <span className="flex items-center gap-6">
          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-300">
            pump.fun
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-300">
            X
          </a>
          <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-300">
            DexScreener
          </a>
        </span>
        <span>Not financial advice. Do your own research.</span>
      </div>
    </footer>
  );
}