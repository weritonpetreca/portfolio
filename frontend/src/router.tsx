import { Routes, Route } from "react-router";
import { ProfessionalPage } from "./pages/professional/ProfessionalPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";

/**
 * Roteador da aplicação de Portfólio Profissional (weriton.dev).
 * O produto Cloudwardens foi desacoplado para repositório privado próprio
 * e domínio dedicado (cloudwardens.weriton.dev).
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProfessionalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
