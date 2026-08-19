import type { Score } from "../shared/types";

const BASE = (globalThis as { SERVER_URL?: string }).SERVER_URL ?? "http://localhost:3000";
const cache = new Map<string, { score: Score; creator: string | null; ts: number }>();
const TTL = 30_000;

export async function fetchScore(
  mint: string
): Promise<{ score: Score; creator: string | null } | null> {
  const hit = cache.get(mint);
  if (hit && Date.now() - hit.ts < TTL) return { score: hit.score, creator: hit.creator };
  try {
    const r = await fetch(`${BASE}/api/token/${mint}`);
    if (!r.ok) return null;
    const j = await r.json();
    const creator: string | null = j.creator ?? j.data?.creator ?? null;
    cache.set(mint, { score: j.score, creator, ts: Date.now() });
    return { score: j.score, creator };
  } catch {
    return null;
  }
}

export function broadcastScore(mint: string, score: Score) {
  chrome.runtime.sendMessage({ type: "score:update", mint, score }).catch(() => {});
}

export function getCachedCreator(mint: string): string | null {
  return cache.get(mint)?.creator ?? null;
}