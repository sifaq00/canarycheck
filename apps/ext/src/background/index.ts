import { pumpWS } from "./ws";
import { fetchScore, broadcastScore } from "./scoring";

pumpWS.connect();

chrome.alarms.create("ws-keepalive", { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener((a) => {
  if (a.name === "ws-keepalive") pumpWS.connect();
});

pumpWS.onTrade((t) => {
  chrome.runtime.sendMessage({ type: "trade", payload: t }).catch(() => {});
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "subscribe" && typeof msg.mint === "string") {
    pumpWS.subscribe(msg.mint);
    fetchScore(msg.mint).then((res) => {
      sendResponse({ score: res?.score ?? null, creator: res?.creator ?? null });
      if (res?.score) broadcastScore(msg.mint, res.score);
    });
    return true;
  }
  if (msg.type === "unsubscribe" && typeof msg.mint === "string") {
    pumpWS.unsubscribe(msg.mint);
  }
  if (msg.type === "getScore" && typeof msg.mint === "string") {
    fetchScore(msg.mint).then((res) =>
      sendResponse({ score: res?.score ?? null, creator: res?.creator ?? null })
    );
    return true;
  }
  return true;
});