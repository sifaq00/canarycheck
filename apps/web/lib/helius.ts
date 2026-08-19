function rpcUrl(): string {
  return process.env.HELIUS_API_KEY
    ? `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`
    : "https://api.mainnet-beta.solana.com";
}

async function rpcCall(method: string, params: unknown[]) {
  const r = await fetch(rpcUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    next: { revalidate: 30 },
  });
  return r.json();
}

export async function getTopHolders(mint: string): Promise<{ pct: number }> {
  const [largest, supply] = await Promise.all([
    rpcCall("getTokenLargestAccounts", [mint]),
    rpcCall("getTokenSupply", [mint]),
  ]);

  const accounts: { uiAmount: number }[] = largest.result?.value ?? [];
  const totalSupply: number = supply.result?.value?.uiAmount ?? 0;
  if (!totalSupply) return { pct: 0 };

  const top10 = accounts.slice(0, 10).reduce((a, acc) => a + (acc.uiAmount ?? 0), 0);
  return { pct: (top10 / totalSupply) * 100 };
}
