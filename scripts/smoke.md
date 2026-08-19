# Smoke Checklist — Rug Radar MVP

Run after full build. Every item must pass before MVP.

- [ ] Extension loads unpacked (`apps/ext/dist`) without errors
- [ ] Popup opens: 4 tabs (Score / Watchlist / Wallet / Report)
- [ ] Popup Score: paste CA → score + factor breakdown appears
- [ ] pump.fun coin page: panel renders top-right < 2s
- [ ] pump.fun coin page: live trade rows stream in
- [ ] pump.fun coin page: dev-wallet trade → row highlighted red + DEV label
- [ ] pump.fun panel: "Add to watchlist" saves to popup Watchlist tab
- [ ] pump.fun panel: "Generate AI Report" → verdict + markdown renders
- [ ] X: CA in tweet text → chip injected, colored by band, tooltip on hover
- [ ] DexScreener /solana/<mint>: chip next to heading, colored by band
- [ ] AI report: 4th report in 24h → 429 error message shown
- [ ] Phantom / Solflare connect + disconnect works in popup
- [ ] Extension works after browser restart (SW reconnect)

## Setup

1. Build: `pnpm build:ext`
2. Chrome → `chrome://extensions` → Developer mode → Load unpacked → `apps/ext/dist`
3. Set `NEXT_PUBLIC_SITE_URL` / `SERVER_URL` to deployed or `http://localhost:3000`
4. Start web: `pnpm dev:web`

## Known gaps (tracked in SDD ledger)

- devHoldingPct / sniperCount default 0 on server until WS snapshot wiring
- SERVER_URL is hardcoded localhost in content/background — change before production deploy