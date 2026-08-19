import type { TradeEvent } from "../shared/types";

export type TradeHandler = (t: TradeEvent) => void;

export class PumpWS {
  private ws: WebSocket | null = null;
  private subscribed = new Set<string>();
  private handlers = new Set<TradeHandler>();
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING)) return;

    this.ws = new WebSocket("wss://pumpportal.fun/api/data");
    this.ws.onopen = () => {
      for (const mint of this.subscribed) this.sendSubscribe(mint);
    };
    this.ws.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        if (d.txType === "buy" || d.txType === "sell") {
          const t: TradeEvent = {
            txType: d.txType,
            trader: d.traderPublicKey,
            mint: d.mint,
            solAmount: d.solAmount ?? 0,
            tokenAmount: d.tokenAmount ?? 0,
            timestamp: Date.now(),
          };
          this.handlers.forEach((h) => h(t));
        }
      } catch {
        /* ignore non-trade messages */
      }
    };
    this.ws.onclose = () => {
      if (this.retryTimer) clearTimeout(this.retryTimer);
      this.retryTimer = setTimeout(() => this.connect(), 2000);
    };
    this.ws.onerror = () => this.ws?.close();
  }

  subscribe(mint: string) {
    this.subscribed.add(mint);
    this.sendSubscribe(mint);
  }

  unsubscribe(mint: string) {
    this.subscribed.delete(mint);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ method: "unsubscribeTokenTrade", keys: [mint] }));
    }
  }

  onTrade(h: TradeHandler) {
    this.handlers.add(h);
  }

  private sendSubscribe(mint: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ method: "subscribeTokenTrade", keys: [mint] }));
    }
  }
}

export const pumpWS = new PumpWS();