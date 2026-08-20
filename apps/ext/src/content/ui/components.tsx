import type { Score, TradeEvent, Report } from "../../shared/types";

export const SERVER_URL =
  (globalThis as { SERVER_URL?: string }).SERVER_URL ?? "http://localhost:3000";

export async function requestReport(
  mint: string
): Promise<Report> {
  const r = await fetch(`${SERVER_URL}/api/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mint }),
  });
  if (!r.ok) {
    const j = await r.json().catch(() => null);
    throw new Error(j?.error ?? r.statusText);
  }
  return r.json();
}

export function saveReport(mint: string, report: Report) {
  chrome.storage.local.get(["reports"], (r) => {
    const list = (r.reports as { mint: string; at: number; report: Report }[]) ?? [];
    list.unshift({ mint, at: Date.now(), report });
    chrome.storage.local.set({ reports: list.slice(0, 50) });
  });
}

export function addToWatchlist(mint: string, label?: string) {
  chrome.storage.local.get(["watchlist"], (r) => {
    const list = (r.watchlist as { mint: string; label: string }[]) ?? [];
    if (list.some((i) => i.mint === mint)) return;
    list.push({ mint, label: label ?? mint.slice(0, 10) });
    chrome.storage.local.set({ watchlist: list });
  });
}

export function ScoreBadge({ score }: { score: Score | null }) {
  const band =
    score === null
      ? null
      : score.total < 40
        ? "#10b981"
        : score.total < 70
          ? "#f59e0b"
          : "#ef4444";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: (band ?? "#9ca3af") + "22",
        color: band ?? "#9ca3af",
        border: `1px solid ${band ?? "#9ca3af"}55`,
      }}
    >
      🛡 CanaryCheck {score ? `· ${score.total}` : "…"}
    </span>
  );
}

export function RenderMarkdown({ text }: { text: string }) {
  const html = text
    .replace(/^###\s+(.*)$/gm, "<b>$1</b>")
    .replace(/^##\s+(.*)$/gm, "<b>$1</b>")
    .replace(/^#\s+(.*)$/gm, "<b>$1</b>")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\n/g, "<br/>");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function TradeRow({ t, isDev }: { t: TradeEvent; isDev: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        padding: "3px 4px",
        borderRadius: 4,
        fontSize: 11,
        background: isDev ? "#ef444433" : "transparent",
        color: isDev ? "#f87171" : t.txType === "buy" ? "#4ade80" : "#fbbf24",
      }}
    >
      {isDev && <b>DEV</b>}
      <span>{t.txType === "buy" ? "▲ BUY" : "▼ SELL"}</span>
      <span style={{ fontFamily: "monospace" }}>
        {t.trader.slice(0, 4)}…{t.trader.slice(-4)}
      </span>
      <span>{t.solAmount.toFixed(2)} SOL</span>
    </div>
  );
}