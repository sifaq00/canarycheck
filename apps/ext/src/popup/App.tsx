import { useState } from "react";
import { WalletTab } from "./WalletTab";
import { WatchlistTab } from "./WatchlistTab";
import { ReportTab } from "./ReportTab";

const TABS = [
  { id: "score", label: "Score" },
  { id: "watchlist", label: "Watchlist" },
  { id: "wallet", label: "Wallet" },
  { id: "report", label: "Report" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function App() {
  const [tab, setTab] = useState<TabId>("score");

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-slate-800 p-3">
        <h1 className="text-sm font-bold text-slate-100">🛡 Rug Radar</h1>
      </header>
      <nav className="flex gap-1 border-b border-slate-800 px-2 py-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded px-3 py-1 text-xs font-medium ${
              tab === t.id
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="flex-1 overflow-auto p-3">
        {tab === "score" && <ScoreTab />}
        {tab === "watchlist" && <WatchlistTab />}
        {tab === "wallet" && <WalletTab />}
        {tab === "report" && <ReportTab />}
      </main>
    </div>
  );
}

function ScoreTab() {
  const [mint, setMint] = useState("");
  const [score, setScore] = useState<{ total: number; factors: { label: string; raw: number; explain: string }[] } | null>(null);
  const [err, setErr] = useState("");

  const lookup = () => {
    if (!mint.trim()) return;
    setErr("");
    chrome.runtime.sendMessage({ type: "getScore", mint: mint.trim() }, (r) => {
      if (r?.score) setScore(r.score);
      else setErr("Token not found / API error.");
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={mint}
          onChange={(e) => setMint(e.target.value)}
          placeholder="Paste token CA…"
          className="flex-1 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100"
        />
        <button
          onClick={lookup}
          className="rounded bg-slate-700 px-3 py-1 text-xs font-medium text-white"
        >
          Check
        </button>
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
      {score && (
        <div className="rounded-lg border border-slate-800 p-3">
          <div className="text-3xl font-bold">{score.total}</div>
          {score.factors.map((f) => (
            <div key={f.label} className="mt-1 flex justify-between text-xs text-slate-300">
              <span>{f.label}</span>
              <span title={f.explain}>{f.raw}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}