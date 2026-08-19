export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight">Rug Radar</h1>
      <p className="text-xl text-neutral-500">
        Angka di depan mata, verdict satu klik.
      </p>
      <p className="max-w-xl text-neutral-400">
        Skor risiko token memecoin Solana langsung di pump.fun, X, dan
        DexScreener. Alert saat developer menjual, histori deployer, dan AI Rug
        Report on-demand.
      </p>
      <a
        href="/api/download"
        className="mt-2 rounded-lg bg-foreground px-6 py-3 font-semibold text-background hover:opacity-80"
      >
        Download extension
      </a>

      <section className="mt-12 w-full max-w-xl rounded-xl border border-neutral-800 p-6 text-left">
        <h2 className="mb-3 text-lg font-semibold">Pasang manual di Chrome</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-400">
          <li>Download lalu ekstrak ZIP extension.</li>
          <li>
            Buka <code className="text-neutral-300">chrome://extensions</code>.
          </li>
          <li>
            Aktifkan <strong className="text-neutral-300">Developer mode</strong>{" "}
            di pojok kanan atas.
          </li>
          <li>
            Klik <strong className="text-neutral-300">Load unpacked</strong>,
            pilih folder hasil ekstrak.
          </li>
          <li>Selesai — buka pump.fun, skor muncul di depan mata.</li>
        </ol>
      </section>
    </main>
  );
}
