import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./styles/index.css";

// HelmetProvider precisa envolver toda a árvore para que qualquer
// componente <Seo /> (ver components/layout/Seo.tsx), não importa
// o quão fundo esteja na árvore, consiga atualizar <title> e meta tags.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
