export interface Score {
  total: number;
  factors: {
    id: string;
    label: string;
    weight: number;
    raw: number;
    explain: string;
  }[];
}

export interface TradeEvent {
  txType: "buy" | "sell";
  trader: string;
  mint: string;
  solAmount: number;
  tokenAmount: number;
  timestamp: number;
}

export interface Report {
  verdict: "SAFE" | "CAUTION" | "DANGER" | "UNKNOWN";
  markdown: string;
  red_flags: string[];
}

export type ScoreBand = "green" | "yellow" | "red";

export const scoreBand = (total: number): ScoreBand =>
  total < 40 ? "green" : total < 70 ? "yellow" : "red";

export interface WatchItem {
  mint: string;
  label: string;
}

export interface ReportEntry {
  mint: string;
  at: number;
  report: Report;
}