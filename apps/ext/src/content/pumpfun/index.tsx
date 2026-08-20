import { createRoot, type Root } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import { COIN_MINT_RE } from "./selectors";
import type { Score, TradeEvent } from "../../shared/types";
import {
  ScoreBadge,
  TradeRow,
  RenderMarkdown,
  requestReport,
  saveReport,
  addToWatchlist,
} from "../ui/components";

let root: Root | null = null;
let currentMint = "";

function ensureRoot() {
  if (root) return root;
  const div = document.createElement("div");
  div.id = "canarycheck-root";
  Object.assign(div.style, {
    position: "fixed",
    top: 12,
    right: 12,
    zIndex: 99999,
    fontFamily: "system-ui",
  });
  document.body.appendChild(div);
  root = createRoot(div);
  return root;
}

function Panel({ mint }: { mint: string }) {
  const [score, setScore] = useState<Score | null>(null);
  const [creator, setCreator] = useState<string | null>(null);
  const [trades, setTrades] = useState<TradeEvent[]>([]);
  const [report, setReport] = useState<{ text: string; loading: boolean; error: string }>({
    text: "",
    loading: false,
    error: "",
  });
  const reportRef = useRef(false);

  useEffect(() => {
    setTrades([]);
    setReport({ text: "", loading: false, error: "" });
    setScore(null);
    setCreator(null);
    chrome.runtime.sendMessage({ type: "subscribe", mint }, (r) => {
      if (r?.score) setScore(r.score);
      if (r?.creator) setCreator(r.creator);
    });
    const onMsg = (msg: { type: string; mint?: string; score?: Score; payload?: TradeEvent }) => {
      if (msg.type === "score:update" && msg.mint === mint && msg.score) setScore(msg.score);
      if (msg.type === "trade" && msg.payload?.mint === mint) {
        setTrades((prev) => [msg.payload!, ...prev].slice(0, 20));
      }
    };
    chrome.runtime.onMessage.addListener(onMsg);
    return () => chrome.runtime.onMessage.removeListener(onMsg);
  }, [mint]);

  const generate = async () => {
    if (reportRef.current) return;
    reportRef.current = true;
    setReport({ text: "", loading: true, error: "" });
    try {
      const r = await requestReport(mint);
      saveReport(mint, r);
      setReport({ text: `**${r.verdict}**\n\n${r.markdown}`, loading: false, error: "" });
    } catch (e) {
      setReport({ text: "", loading: false, error: (e as Error).message });
    } finally {
      reportRef.current = false;
    }
  };

  return (
    <div
      style={{
        background: "#0f172a",
        color: "#e2e8f0",
        borderRadius: 12,
        padding: 12,
        minWidth: 320,
        maxWidth: 380,
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <ScoreBadge score={score} />
        <button
          onClick={() => addToWatchlist(mint, mint.slice(0, 10))}
          style={{ fontSize: 11, background: "#334155", border: 0, borderRadius: 6, color: "#e2e8f0", padding: "4px 8px", cursor: "pointer" }}
        >
          + Watchlist
        </button>
      </div>

      <div style={{ marginTop: 8 }}>
        <div className="rr-mint" style={{ fontFamily: "monospace", fontSize: 11, color: "#94a3b8", wordBreak: "break-all" }}>
          {mint}
        </div>
        {creator && (
          <div style={{ fontSize: 11, color: "#f87171", marginTop: 4 }}>
            Creator: <span style={{ fontFamily: "monospace" }}>{creator.slice(0, 8)}…</span>
          </div>
        )}
      </div>

      {score?.factors.map((f) => (
        <div
          key={f.id}
          style={{
            fontSize: 12,
            marginTop: 6,
            display: "flex",
            justifyContent: "space-between",
            cursor: "help",
          }}
          title={f.explain}
        >
          <span>{f.label}</span>
          <span>{Math.round(f.raw)}</span>
        </div>
      ))}

      <div
        style={{
          marginTop: 12,
          fontSize: 11,
          borderTop: "1px solid #334155",
          paddingTop: 8,
        }}
      >
        {trades.length === 0 && <div style={{ color: "#64748b" }}>Waiting for trades…</div>}
        {trades.map((t, i) => (
          <TradeRow key={i} t={t} isDev={!!creator && t.trader === creator} />
        ))}
      </div>

      <button
        onClick={generate}
        disabled={report.loading}
        style={{
          marginTop: 10,
          width: "100%",
          padding: "8px",
          borderRadius: 8,
          border: 0,
          background: report.loading ? "#334155" : "linear-gradient(135deg, #06b6d4, #3b82f6)",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {report.loading ? "Generating…" : "Generate AI Report"}
      </button>

      {report.error && (
        <div style={{ marginTop: 8, fontSize: 11, color: "#f87171" }}>{report.error}</div>
      )}
      {report.text && (
        <div
          style={{
            marginTop: 8,
            background: "#1e293b",
            borderRadius: 8,
            padding: 10,
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          <RenderMarkdown text={report.text} />
        </div>
      )}
    </div>
  );
}

function observeRoute() {
  const mint = COIN_MINT_RE.exec(location.pathname)?.[1];
  if (mint !== currentMint) {
    if (currentMint) chrome.runtime.sendMessage({ type: "unsubscribe", mint: currentMint });
    currentMint = mint ?? "";
    if (currentMint) {
      ensureRoot().render(<Panel mint={currentMint} />);
    } else {
      document.getElementById("canarycheck-root")?.remove();
      root = null;
    }
  }
}

new MutationObserver(observeRoute).observe(document.body, { childList: true, subtree: true });
observeRoute();