import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Utilitário invisível que escuta mudanças na rota principal (URL)
 * e força o navegador a rolar para o topo imediatamente.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Se não tiver hash na URL, sobe para o topo
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
