import { Routes, Route } from "react-router";
import { ProfessionalPage } from "./pages/professional/ProfessionalPage.tsx";
import { WitcherRealmPage } from "./pages/witcher-realm/WitcherRealmPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";

/**
 * Duas rotas correspondem às duas personas definidas no SRS (seção 6):
 * "/"              -> Página Profissional (experiência padrão, RF-02)
 * "/witcher-realm"  -> Witcher Realm (opt-in, RF-03)
 *
 * Optei pela API declarativa (<Routes>/<Route>) em vez da API de "data router"
 * (createBrowserRouter) porque não precisamos de loaders/actions carregando
 * dados por rota — é conteúdo estático. Vale conhecer a API de data router
 * no futuro, mas para este projeto ela adicionaria complexidade sem benefício.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProfessionalPage />} />
      <Route path="/witcher-realm" element={<WitcherRealmPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
