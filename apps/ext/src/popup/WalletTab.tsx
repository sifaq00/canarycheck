import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import type { WalletName } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

function Inner() {
  const { publicKey, select, connect, disconnect, connecting } = useWallet();

  if (publicKey) {
    return (
      <div className="space-y-2">
        <p className="text-xs text-slate-300">
          Connected:{" "}
          <span className="font-mono text-slate-100">
            {publicKey.toBase58().slice(0, 8)}…
          </span>
        </p>
        <button
          onClick={() => disconnect()}
          className="rounded bg-slate-700 px-3 py-1 text-xs text-white"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const connectWallet = (name: "Phantom" | "Solflare") => {
    select(name as WalletName);
    connect();
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400">
        Connect a wallet for the holder badge & upcoming premium features.
      </p>
      <button
        onClick={() => connectWallet("Phantom")}
        disabled={connecting}
        className="block w-full rounded bg-slate-700 px-3 py-2 text-xs text-white disabled:opacity-50"
      >
        {connecting ? "Connecting…" : "Phantom"}
      </button>
      <button
        onClick={() => connectWallet("Solflare")}
        disabled={connecting}
        className="block w-full rounded bg-slate-700 px-3 py-2 text-xs text-white disabled:opacity-50"
      >
        {connecting ? "Connecting…" : "Solflare"}
      </button>
    </div>
  );
}

export function WalletTab() {
  const endpoint = useMemo(
    () => "https://api.mainnet-beta.solana.com",
    []
  );
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Inner />
      </WalletProvider>
    </ConnectionProvider>
  );
}