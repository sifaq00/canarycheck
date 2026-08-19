import { PAIR_MINT_RE } from "./selectors";

let currentMint = "";
let chip: HTMLSpanElement | null = null;

function mountChip(mint: string) {
  if (chip) {
    chip.remove();
    chip = null;
  }
  chip = document.createElement("span");
  chip.id = "rr-dex-chip";
  chip.textContent = "🛡 …";
  Object.assign(chip.style, {
    fontSize: 13,
    marginLeft: 8,
    cursor: "pointer",
    color: "#9ca3af",
    display: "inline-block",
  });
  chrome.runtime.sendMessage({ type: "getScore", mint }, (r) => {
    if (r?.score) {
      const total = r.score.total;
      chip!.textContent = `🛡 ${total}`;
      chip!.style.color =
        total < 40 ? "#10b981" : total < 70 ? "#f59e0b" : "#ef4444";
      chip!.title = r.score.factors
        .map((f: { label: string; explain: string }) => `${f.label}: ${f.explain}`)
        .join("\n");
    } else {
      chip!.textContent = "🛡";
    }
  });
  chip.onclick = () => window.open(`https://pump.fun/coin/${mint}`, "_blank");

  // Append to page header (first <h1> or first element with role="heading")
  const h1 = document.querySelector("h1");
  if (h1) {
    h1.insertAdjacentElement("afterend", chip);
    return;
  }
  const heading = document.querySelector('[role="heading"]');
  if (heading) {
    heading.insertAdjacentElement("afterend", chip);
    return;
  }
  document.body.appendChild(chip);
}

function observeRoute() {
  const mint = PAIR_MINT_RE.exec(location.pathname)?.[1];
  if (mint !== currentMint) {
    currentMint = mint ?? "";
    if (currentMint) mountChip(currentMint);
    else if (chip) {
      chip.remove();
      chip = null;
    }
  }
}

new MutationObserver(observeRoute).observe(document.body, { childList: true, subtree: true });
observeRoute();