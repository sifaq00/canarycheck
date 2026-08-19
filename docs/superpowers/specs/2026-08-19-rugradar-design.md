# Design Spec — Rug Radar

**Tanggal:** 2026-08-19
**Status:** Approved, siap untuk `writing-plans`
**PRD:** `docs/PRD.md`

## 1. Arsitektur

```
┌─ Extension (Manifest V3) ───────────────────────────┐
│                                                      │
│ content scripts                                      │
│  ├─ content/pumpfun   → panel + trade highlight      │
│  ├─ content/x         → CA chip + tooltip            │
│  └─ content/dexscreener → pair chip                  │
│                                                      │
│ background service worker                            │
│  ├─ ws/pumpportal     → trade stream, keepalive      │
│  ├─ scoring/engine    → risk score + breakdown       │
│  ├─ cache             → TTL 30s per token            │
│  └─ api/client        → call web/* API               │
│                                                      │
│ popup (React)                                        │
│  ├─ wallet connect (adapter)                         │
│  ├─ watchlist                                        │
│  └─ report viewer                                    │
└──────────────┬───────────────────────────────────────┘
               │ HTTPS
┌──────────────▼───────────────┐
│ web/ (Next.js 15, App Router) │
│  ├─ landing page              │
│  ├─ GET  /api/download        │
│  ├─ POST /api/report → Claude │
│  ├─ POST /api/rate   → Upstash│
│  └─ GET  /api/token/:mint     │
└───────────────────────────────┘
```

### Repo layout (monorepo, pnpm workspaces)

```
extension/
├─ apps/
│   ├─ ext/              # Vite + @crxjs/vite-plugin, React 19, TS
│   │   ├─ src/content/{pumpfun,x,dexscreener}/
│   │   ├─ src/background/{ws,scoring,cache}/
│   │   ├─ src/popup/
│   │   ├─ src/shared/   # types, utils, scoring faktor
│   │   └─ manifest.ts
│   └─ web/              # Next.js 15 + Tailwind v4
│       ├─ app/(landing)/
│       └─ app/api/{report,token,download,rate}/
├─ packages/
│   └─ core/             # scoring engine murni, testable, no browser API
├─ pnpm-workspace.yaml
└─ package.json
```

## 2. Keputusan Teknologi

| Area | Pilih | Alasan |
|---|---|---|
| Build extension | Vite + `@crxjs/vite-plugin` | HMR untuk content scripts, MV3 native, satu manifest.ts sebagai sumber kebenaran |
| UI extension | React 19 + Tailwind v4 + shadcn/ui | Cepat, konsisten dengan web/, komponen panel kecil |
| State | Zustand + TanStack Query | Query cache token natural (TTL 30s), minim boilerplate |
| Wallet | `@solana/wallet-adapter-react` (Phantom/Solflare) | Standar de facto, inject provider otomatis |
| Data on-chain | pump.fun Advanced API + WebSocket pumpportal.fun + Helius RPC free | Gratis semua, cukup untuk MVP |
| Web server | Next.js 15 App Router, deploy Vercel | Konsisten pola fleet; serverless API route tempat Claude key |
| AI | `@anthropic-ai/sdk` (server only) | Report terstruktur; key aman |
| Rate limit | Upstash Redis (`@upstash/redis`) | Free tier cukup, serverless-friendly |
| Testing | Vitest untuk `packages/core` + Playwright harness | Scoring wajib satu-satunya logika bisnis — must test |

### Catatan MV3 penting
- WebSocket hidup di background SW. Chrome bisa matikan SW setelah 30 s idle → **keepalive wajib**: `chrome.alarms.create('ws-keepalive', {periodInMinutes: 0.4})` + reconnect otomatis.
- Content scripts tidak boleh simpan state global di window; komunikasi via `chrome.runtime.sendMessage` + topic store di SW.
- CSP MV3: tidak ada `eval`, tidak ada remote code. Semua bundle lokal.

## 3. Modul Backend API (web/)

```
apps/web/app/api/
├─ token/[mint]/route.ts   # GET  — proxy data on-chain + hit score
├─ report/route.ts         # POST — rakit prompt → Claude → {markdown}
├─ rate/route.ts           # POST — increment & check counter IP
└─ download/route.ts       # GET  — serve ZIP build ext
```

**`/api/token/[mint]`** (satu-satunya endpoint data):
1. pump.fun metadata (creator, market cap, created_at)
2. Helius `getTokenLargestAccounts` → top holder
3. Pump.fun creator history → deployer track record
4. Score engine hitung → response JSON < 2 s p95
5. Cache server-side 30 s (in-memory Map, Vercel edge tidak wajib)

**`/api/report`** (Claude):
1. Rate limit: `INCR rl:{ip}:{day}`; jika > 3 → 429 + pesan limit
2. Fetch `/api/token/[mint]` hasil lengkap + trade last 100 dari WS snapshot (dapat dari ext request body)
3. Prompt sistem terstruktur: konteks data + tugas verdict
4. Claude Sonnet 4.5, max_tokens 1024, response JSON `{verdict, markdown, red_flags[]}`

## 4. Scoring Engine (`packages/core`)

Pure function, zero side-effect. Signature kunci:

```ts
scoreToken(input: TokenData): Score
// TokenData: { devHoldingPct, devSoldPct, top10Pct, ageSec,
//              deployerStats{total, died}, sniperCount, earlyMassSellPct }
// Score: { total: 0-100, factors: FactorBreakdown[] }
```

Implementasi: weighted table di `factors.ts`, tiap factor export `{ id, weight, compute, explain }`. Ubah bobot = edit satu file, test wajib di `core/__tests__`.

## 5. Content Script Detail

### pump.fun
- Detect route `/coin/{mint}` via MutationObserver terhadap location.
- Inject anchor component setelah chart container.
- Subscribe trade topic WS via SW; filter `wallet === creator` → push event `dev_sell` → UI highlight.
- Unsubscribe otomatis saat navigasi keluar dari halaman coin.

### X/Twitter
- MutationObserver `article[data-testid="tweet"]`.
- Regex CA: `/\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g`.
- Render chip inline di text node container; chip clickable memakai portal React.
- Cleanup observer = `article` removed.
- `selectors.ts` terpusat, update mudah saat X mengganti DOM.

### DexScreener
- Detect `/solana/{mint}` route.
- Inject chip di header pair; hide bawaan jika user pilih.

## 6. Popup UI

| Tab | Isi |
|---|---|
| Home | Score input: paste CA → score panel |
| Watchlist | Card token tersimpan dengan badge live |
| Wallet | Connect/disconnect, alamat, "YOU" badge list |
| Report | Histori report disimpan di `chrome.storage.local` |

## 7. Data Flow (dev sell alert)

```
pumpportal WS (trade) ──▶ SW filter creator ──▶
  broadcast "trade:dev_sell" ──▶ content/pumpfun
  ──▶ UI push row merah + badge "DEV SOLD"
```

## 8. Testing

| Level | Tool | Wajib? |
|---|---|---|
| Scoring engine unit | Vitest | **Ya** — minimal cover setiap faktor + band threshold |
| API report mock | Vitest + mock Claude | Ya |
| Content scripts | Playwright manual smoketest list | Ya (script `scripts/smoke.md`) |
| E2E pump.fun | Playwright (optional) | Nice-to-have |

## 9. Environment & Secrets

```
# apps/web/.env.local
ANTHROPIC_API_KEY=        # server only
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
HELIUS_API_KEY=           # free tier key, server side juga bisa
NEXT_PUBLIC_SITE_URL=
```

Extension **tidak** pernah membaca API key. Semua via `fetch` ke `NEXT_PUBLIC_SITE_URL/api/*`.

## 10. Out of Scope (v1)

- Sell/buy button, desktop watchlist alert, token gate aktif, Chrome Web Store, i18n UI.
