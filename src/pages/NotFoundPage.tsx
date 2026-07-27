import { Link } from "react-router";
import { Seo } from "../components/layout/Seo.tsx";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Seo
        title="Página não encontrada — Weriton Petreca"
        description="Página não encontrada."
        path="/404"
      />
      <p className="font-mono text-ember">404</p>
      <h1 className="mt-2 font-display text-2xl text-bone">Página não encontrada</h1>
      <Link to="/" className="mt-6 text-steel hover:text-ember">
        ← Voltar para o início
      </Link>
    </div>
  );
}
