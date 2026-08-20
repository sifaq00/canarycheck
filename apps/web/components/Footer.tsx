import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/60 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <a href="#top" className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.webp"
              alt="CanaryCheck"
              width={34}
              height={34}
              className="h-8.5 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-display text-lg font-bold text-slate-900 tracking-tight">Canary<span className="grad-text">Check</span></span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
            Risk intelligence for Solana memecoins. Real-time scores, dev-sell
            alerts, and AI rug reports — inline on pump.fun, X, and DexScreener.
          </p>
          <div className="mt-4 flex gap-4 font-mono text-xs">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-cyan-700"
            >
              X / Twitter
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-cyan-700"
            >
              Telegram
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-cyan-700"
            >
              GitHub
            </a>
          </div>
        </div>

        <div>
          <div className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
            Product
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
            <li><a href="#features" className="transition-colors hover:text-slate-900">Features</a></li>
            <li><a href="#how" className="transition-colors hover:text-slate-900">How it works</a></li>
            <li><a href="#pricing" className="transition-colors hover:text-slate-900">Pricing</a></li>
            <li><a href="#faq" className="transition-colors hover:text-slate-900">FAQ</a></li>
          </ul>
        </div>

        <div>
          <div className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
            Legal
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
            <li><a href="#" className="transition-colors hover:text-slate-900">Privacy policy</a></li>
            <li><a href="#" className="transition-colors hover:text-slate-900">Terms of use</a></li>
            <li><a href="#" className="transition-colors hover:text-slate-900">Disclaimer</a></li>
            <li><a href="#" className="transition-colors hover:text-slate-900">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono text-xs text-slate-500 md:flex-row">
        <span>© 2026 CanaryCheck. All rights reserved.</span>
        <span>Not financial advice. Do your own research.</span>
      </div>
    </footer>
  );
}