import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ensureBotpressLoaded } from "./lib/botpress";
import "./index.css";

void ensureBotpressLoaded();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
