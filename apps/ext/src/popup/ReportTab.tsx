import { useEffect, useState } from "react";
import type { ReportEntry } from "../shared/types";

export function ReportTab() {
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(["reports"], (r) => {
      setReports((r.reports as ReportEntry[]) ?? []);
    });
  }, []);

  if (reports.length === 0) {
    return <p className="text-xs text-slate-400">Belum ada AI report. Generate dari panel pump.fun.</p>;
  }

  return (
    <div className="space-y-2">
      {reports.map((r) => (
        <div key={r.mint} className="rounded border border-slate-800 p-2">
          <button
            onClick={() => setOpen(open === r.mint ? null : r.mint)}
            className="flex w-full items-center justify-between text-xs text-slate-200"
          >
            <span className="font-mono">{r.mint.slice(0, 10)}…</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                r.report.verdict === "DANGER"
                  ? "bg-red-900/50 text-red-300"
                  : r.report.verdict === "CAUTION"
                    ? "bg-yellow-900/50 text-yellow-300"
                    : "bg-emerald-900/50 text-emerald-300"
              }`}
            >
              {r.report.verdict}
            </span>
          </button>
          {open === r.mint && (
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded bg-slate-900 p-2 text-[10px] text-slate-300">
              {r.report.markdown}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}