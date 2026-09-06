import webchatCss from "./botpressWebchat.css?raw";

const INJECT_SRC = "https://cdn.botpress.cloud/webchat/v3.7/inject.js";
const CONFIG_SRC =
  "https://files.bpcontent.cloud/2026/09/06/14/20260906142905-0XF6DLJ1.js";

const READY_CLASS = "nm-webchat-ready";

type BotpressWebchat = {
  init: (config: unknown) => void;
};

declare global {
  interface Window {
    botpress?: BotpressWebchat;
  }
}

let loadPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing) {
      if (existing.dataset.bpLoaded === "1") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load ${src}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.addEventListener("load", () => {
      script.dataset.bpLoaded = "1";
      resolve();
    });
    script.addEventListener("error", () =>
      reject(new Error(`Failed to load ${src}`)),
    );
    document.body.appendChild(script);
  });
}

function webchatHost(): Element | null {
  return document.querySelector(".bpChatContainer");
}

function webchatShadowRoot(): ShadowRoot | null {
  const host = webchatHost();
  if (!host) return null;
  if (host.shadowRoot) return host.shadowRoot;
  return host.firstElementChild?.shadowRoot ?? null;
}

function revealWebchat() {
  webchatHost()?.classList.add(READY_CLASS);
}

function injectCompactFab(): boolean {
  const shadow = webchatShadowRoot();
  if (!shadow) return false;
  if (!shadow.getElementById("nextmove-webchat-skin")) {
    const style = document.createElement("style");
    style.id = "nextmove-webchat-skin";
    style.textContent = webchatCss;
    shadow.appendChild(style);
  }
  revealWebchat();
  return true;
}

function watchForWebchat() {
  if (injectCompactFab()) return;

  let attempts = 0;
  const tick = window.setInterval(() => {
    attempts += 1;
    if (injectCompactFab() || attempts > 80) {
      window.clearInterval(tick);
      if (attempts > 80) revealWebchat();
    }
  }, 50);
}

export function ensureBotpressLoaded(): Promise<void> {
  if (!loadPromise) {
    watchForWebchat();
    loadPromise = (async () => {
      await loadScript(INJECT_SRC);
      await loadScript(CONFIG_SRC);
      injectCompactFab();
    })().catch((error) => {
      loadPromise = null;
      throw error;
    });
  }
  return loadPromise;
}
