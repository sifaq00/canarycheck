import { useEffect, useState } from "react";
import type { WatchItem } from "../shared/types";

export function WatchlistTab() {
  const [items, setItems] = useState<WatchItem[]>([]);

  useEffect(() => {
    chrome.storage.local.get(["watchlist"], (r) => {
      setItems((r.watchlist as WatchItem[]) ?? []);
    });
  }, []);

  const remove = (mint: string) => {
    const next = items.filter((i) => i.mint !== mint);
    setItems(next);
    chrome.storage.local.set({ watchlist: next });
  };

  if (items.length === 0) {
    return <p className="text-xs text-slate-400">Watchlist is empty. Add tokens from the pump.fun panel.</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i.mint} className="flex items-center justify-between rounded border border-slate-800 p-2">
          <div>
            <div className="text-xs font-medium text-slate-200">{i.label || i.mint.slice(0, 10)}</div>
            <div className="font-mono text-[10px] text-slate-500">{i.mint.slice(0, 12)}…</div>
          </div>
          <button
            onClick={() => remove(i.mint)}
            className="rounded bg-red-900/50 px-2 py-1 text-[10px] text-red-300"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}