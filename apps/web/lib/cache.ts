const store = new Map<string, { v: unknown; ts: number }>();
const TTL_MS = 30_000;

export function getCached<T>(key: string): T | null {
  const hit = store.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > TTL_MS) {
    store.delete(key);
    return null;
  }
  return hit.v as T;
}

export function setCached(key: string, v: unknown) {
  store.set(key, { v, ts: Date.now() });
}
