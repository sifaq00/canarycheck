# PRD — Rug Radar

**Tanggal:** 2026-08-19
**Status:** Approved (MVP scope)
**Repo:** `D:\Project\extension`

## 1. Ringkasan Produk

Rug Radar adalah Chrome Extension (Manifest V3) untuk trader memecoin Solana. Menampilkan **risk score token inline** di tiga tempat: halaman token pump.fun, timeline X/Twitter, dan halaman pair DexScreener. Plus **real-time alert saat developer/insider menjual**, **histori deployer**, dan **AI Rug Report on-demand** (Claude, diproses server-side). Wallet connect Solana untuk personalisasi.

Slogan kerja: *"Angka di depan mata, verdict satu klik."*

## 2. Masalah & Peluang

**Masalah:**
- Trader pump.fun takut kena rug tapi harus membuka banyak tab (pump.fun, Solscan, checker terpisah) untuk menilai satu token.
- Data on-chain tersedia gratis (RPC, WebSocket pump.fun) tapi mentah dan sulit dibaca cepat.
- Saat muncul CA di timeline X, keputusan buy sering dibuat tanpa cek sama sekali.

**Peluang:**
- Belum ada overlay yang menyatukan data di tempat user sudah berada (khususnya halaman pump.fun sendiri).
- Pola fleet membuktikan produk web3 + Claude report diterima market (Sable, Feline, GlassPrism).
- Data core gratis; biaya hanya Claude report per request.

## 3. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| Degen trader pump.fun (utama) | Cek cepat sebelum ape in, alert kalau dev buang barang |
| Riset trader di X/CT | Tau CA aman/tidak tanpa buka tab baru |
| Token ops/holder (sekunder) | Pantau token mereka sendiri di watchlist |

## 4. Goals & Non-Goals (MVP)

**Goals:**
1. Risk score 0–100 dengan breakdown transparan, muncul di pump.fun, X, DexScreener.
2. Real-time trade stream pump.fun + highlight row merah saat dev/insider jual.
3. Histori deployer: berapa token pernah diluncurkan, berapa yang mati.
4. Sniper counter (jumlah buyer di block pertama).
5. AI Rug Report via Claude (server-side), gratis 3 report/hari per IP.
6. Wallet connect (Phantom, Solflare) untuk "YOU" badge + identitas holder.
7. Instalasi manual ZIP + landing page Next.js.

**Non-Goals (ditunda):**
- Tombol jual/buy lewat extension.
- Desktop alert watchlist.
- Token-gated tier premium (fondasi disiapkan, gate aktif nanti).
- Chrome Web Store listing.
- Multi-chain selain Solana.

## 5. Spesifikasi Fitur

### 5.1 Overlay Halaman Token pump.fun
- **Lokasi:** panel terdapat di kanan/atas area chart token.
- **Isi:**
  - Risk score besar (badge warna) + tombol breakdown.
  - Bar daftar trade real-time; trade dari wallet milik deployer/insider ditandai **merah** + label `DEV`.
  - Histori deployer: `12 tokens launched · 9 died < 1 SOL`.
  - Sniper count: `43 wallets di block pertama`.
  - Tombol **Add to watchlist**.
  - Tombol **AI Rug Report** (lihat 5.4).
- **Acceptance:**
  - Panel muncul < 2 detik setelah halaman token load.
  - Highlight dev sell muncul real-time (< 3 detik dari trade on-chain).
  - Score tidak berubah-ubah liar; refresh diberi interval minimum.

### 5.2 Overlay X/Twitter
- **Behavior:** scan DOM timeline/quoted tweet/reply untuk regex alamat Solana (base58 32-44 karakter).
- **Render:** chip kecil di samping CA dengan badge warna:
  - 🟢 0–39 · 🟡 40–69 · 🔴 70–100
- **Interaksi:**
  - Hover → tooltip ringkas (top-10 holder %, dev holding %, umur token).
  - Klik → expand panel mini dengan tombol buka pump.fun dan AI report.
- **Acceptance:** chip bertahan saat infinite scroll; tidak double-inject pada CA sama; cleanup saat tweet dihapus.

### 5.3 Overlay DexScreener
- Chip skor di area header pair + tombol expand panel ringkas.
- Data: sama seperti 5.1, dikurangi trade live (DexScreener sudah punya feed sendiri).

### 5.4 AI Rug Report (Claude)
- **Trigger:** tombol "Generate AI Report" di panel manapun.
- **Flow:** extension → `POST web/api/report` → server kumpulkan data on-chain → susun prompt terstruktur → Claude → balas JSON markdown.
- **Isi report:** ringkasan bahaya (bundling, dev dump, holder concentration), timeline kejadian kunci, situasi yang harus diwaspadai, verdict.
- **Rasio:** gratis 3 report per 24 jam per IP (Redis counter). Response error eksplisit saat limit tercapai.
- **Keamanan:** API key Claude **hanya** di environment server. Extension tidak pernah melihat key.

### 5.5 Wallet Connect
- UI via popup/sidebar extension, memakai `@solana/wallet-adapter-react`.
- **v1 fungsi:**
  - Connect/disconnect, tampilkan alamat.
  - Badge "YOU" pada token yang di-hold oleh wallet aktif.
  - Fondasi tier token-gate: satu fungsi helper `checkBalance(mint, min)` siap dipakai nanti.
- **Non-goal v1:** transaksi, tanda pesan, KMS.

### 5.6 Risk Score
Band:

| Skor | Badge | Arti |
|---|---|---|
| 0–39 | 🟢 | Risiko rendah |
| 40–69 | 🟡 | Hati-hati |
| 70–100 | 🔴 | Sangat berisiko |

Faktor & bobot awal (akan di-tune via data):

| Faktor | Bobot | Sumber |
|---|---|---|
| Dev holding % + dev sudah jual | 25% | pump.fun API + WS |
| Konsentrasi top-10 holder | 20% | RPC `getTokenLargestAccounts` |
| Umur token (lebih muda = lebih berisiko) | 10% | pump.fun API |
| Track record deployer (rug rate) | 25% | pump.fun API list token per creator |
| Sniper/bundle block pertama | 10% | WS trade history |
| Pola sell massal awal | 10% | WS trade history |

Breakdown selalu bisa diklik per-faktor di UI agar transparan.

### 5.7 Landing Page & Instalasi
- Next.js landing di Vercel: hero, screenshot overlay, install ZIP download, disclaimer.
- ZIP berisi build extension; instruksi Developer Mode install (pola NautilusMaps).

## 6. User Journey Utama

1. User buka token di pump.fun → panel Rug Radar muncul → lihat skor 🟡 62 → klik breakdown → lihat dev holding 18% + sniper 51 wallet.
2. User klik **AI Rug Report** → loading 5–10 detik → report markdown hadir di panel.
3. Besok di X, muncul CA token yang sama → chip 🟡 sudah tahu, skip.

## 7. Monetisasi

- **v1:** Gratis penuh. Sasaran: install + kebiasaan + bukti data.
- **Next:** Launch token utility (pola fleet). Holder token = unlimited AI report + watchlist alert. Fondasi wallet-connect sudah ada; tambahan cek balance saja.

## 8. Metrik Sukses (v1)

| Metrik | Target 30 hari |
|---|---|
| Install aktif | 500+ |
| AI report dihasilkan/hari | 50+ |
| Retensi D7 | > 30% |
| Crash/error report | < 1% panel gagal render |

## 9. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| API pump.fun tidak resmi, berubah | Module `adapters/` terisolasi per-umur, swap endpoint tanpa ganggu UI |
| Helius free tier limit | Cache skor 30 detik; fallback RPC publik lain |
| DOM X berubah | Selector di satu file `content/x/selectors.ts`; update mudah |
| WebSocket terputus (MV3 SW idle) | Keepalive `chrome.alarms` (30 s) + reconnect backoff eksponensial |
| User salah paham skor sebagai nasihat | Disclaimer selalu terlihat dekat skor |

## 10. Roadmap

| Versi | Isi |
|---|---|
| **v0.1 (MVP)** | Semua fitur 5.1–5.7, gratis |
| **v0.2** | Watchlist + desktop notification, token-gate premium, leaderboard deployer |
| **v1.0** | Chrome Web Store, docs publik, multibahasa UI |
