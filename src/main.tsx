import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./Contexts/LanguageContext.tsx";
import { GameProvider } from "./Contexts/GameContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </LanguageProvider>
);
