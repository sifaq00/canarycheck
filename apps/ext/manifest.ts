import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "CanaryCheck",
  version: "0.1.0",
  description: "Real-time pump.fun risk intelligence overlay. Canary in the coal mine.",
  permissions: ["storage", "alarms"],
  host_permissions: [
    "https://pump.fun/*",
    "https://frontend-api.pump.fun/*",
    "https://pumpportal.fun/*",
    "wss://pumpportal.fun/*",
    "https://x.com/*",
    "https://twitter.com/*",
    "https://dexscreener.com/*",
    "http://localhost:3000/*"
  ],
  background: { service_worker: "src/background/index.ts", type: "module" },
  content_scripts: [
    { matches: ["https://pump.fun/*"], js: ["src/content/pumpfun/index.tsx"] },
    { matches: ["https://x.com/*", "https://twitter.com/*"], js: ["src/content/x/index.tsx"] },
    { matches: ["https://dexscreener.com/*"], js: ["src/content/dexscreener/index.tsx"] },
  ],
  action: { default_popup: "src/popup/index.html" },
  icons: {
    "16": "icon/16.png",
    "32": "icon/32.png",
    "48": "icon/48.png",
    "128": "icon/128.png",
  },
});