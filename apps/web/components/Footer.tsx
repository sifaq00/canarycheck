export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <a href="#top" className="font-display text-lg font-bold text-white">
            🛡 Rug<span className="grad-text">Radar</span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
            Risk intelligence for Solana memecoins. Real-time scores, dev-sell
            alerts, and AI rug reports — inline on pump.fun, X, and DexScreener.
          </p>
          <div className="mt-4 flex gap-4 font-mono text-xs">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-cyan-400"
            >
              X / Twitter
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-cyan-400"
            >
              Telegram
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-cyan-400"
            >
              GitHub
            </a>
          </div>
        </div>

        <div>
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">
            Product
          </div>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><a href="#features" className="transition-colors hover:text-white">Features</a></li>
            <li><a href="#how" className="transition-colors hover:text-white">How it works</a></li>
            <li><a href="#pricing" className="transition-colors hover:text-white">Pricing</a></li>
            <li><a href="#faq" className="transition-colors hover:text-white">FAQ</a></li>
          </ul>
        </div>

        <div>
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">
            Legal
          </div>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><a href="#" className="transition-colors hover:text-white">Privacy policy</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Terms of use</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Disclaimer</a></li>
            <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono text-xs text-slate-600 md:flex-row">
        <span>© 2026 Rug Radar. All rights reserved.</span>
        <span>Not financial advice. Do your own research.</span>
      </div>
    </footer>
  );
}