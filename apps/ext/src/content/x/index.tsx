import { TWEET_SEL, CA_RE } from "./selectors";

const seen = new WeakSet<Element>();
const CA_ATTR = "data-rr-ca";

function createChip(ca: string) {
  const span = document.createElement("span");
  span.setAttribute(CA_ATTR, ca);
  span.textContent = "🛡 …";
  Object.assign(span.style, {
    fontSize: 12,
    marginLeft: 6,
    cursor: "pointer",
    color: "#9ca3af",
  });
  chrome.runtime.sendMessage({ type: "getScore", mint: ca }, (r) => {
    if (r?.score) {
      const total = r.score.total;
      span.textContent = `🛡 ${total}`;
      span.style.color =
        total < 40 ? "#10b981" : total < 70 ? "#f59e0b" : "#ef4444";
      span.title = r.score.factors
        .map((f: { label: string; explain: string }) => `${f.label}: ${f.explain}`)
        .join("\n");
    } else {
      span.textContent = "🛡";
    }
  });
  span.onclick = () => window.open(`https://pump.fun/coin/${ca}`, "_blank");
  return span;
}

function injectChips(root: ParentNode) {
  for (const art of root.querySelectorAll(TWEET_SEL)) {
    if (seen.has(art)) continue;
    seen.add(art);
    const textNodes = art.querySelectorAll<HTMLDivElement>('div[data-testid="tweetText"]');
    for (const tn of textNodes) {
      const text = tn.innerText ?? "";
      for (const ca of text.match(CA_RE) ?? []) {
        if (tn.querySelector(`[${CA_ATTR}="${ca}"]`)) continue;
        tn.appendChild(createChip(ca));
      }
    }
  }
}

new MutationObserver((muts) => {
  for (const m of muts) {
    for (const n of m.addedNodes) {
      if (!(n instanceof HTMLElement)) continue;
      if (n.matches(TWEET_SEL)) injectChips(n);
      else if (n.querySelector) {
        const t = n.querySelector(TWEET_SEL);
        if (t) injectChips(t.parentElement ?? t);
      }
    }
  }
}).observe(document.body, { childList: true, subtree: true });

injectChips(document);