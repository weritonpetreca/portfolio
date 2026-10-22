import { Link } from "react-router";
import { Seo } from "../components/layout/Seo.tsx";
import { EmbersCanvas } from "../components/ui/EmbersCanvas.tsx";
import { getCloudwardensUrl, isCloudwardensEnabled } from "../lib/config.ts";

export function NotFoundPage() {
  const cloudwardensEnabled = isCloudwardensEnabled();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-forge-950 overflow-hidden text-center">
      {/* Background with Embers and Gradient */}
      <div className="absolute inset-0 z-0 bg-[url('/images/portfolio/portfolio_hero_bg.jpg')] bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-forge-950/40 via-forge-950/80 to-forge-950 pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <EmbersCanvas count={50} />
      </div>

      <Seo
        title="Página não encontrada — Weriton Petreca"
        description="A rota que você busca não foi encontrada."
        path="/404"
        noindex
      />

      <div className="relative z-10 max-w-2xl px-6 py-12 backdrop-blur-sm bg-forge-900/40 border border-forge-700/50 shadow-2xl rounded-xl">
        <p className="font-mono text-amber-500 font-bold tracking-[0.2em] animate-pulse">ERRO 404</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl text-bone">
          Rota Não Encontrada
        </h1>
        <p className="mt-4 text-steel font-mono text-sm leading-relaxed max-w-md mx-auto">
          O endereço que você tentou acessar não existe ou não está disponível no momento.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 font-mono text-xs font-bold text-bone bg-forge-800 border border-forge-600 hover:border-ember hover:bg-forge-700 transition-colors shadow-lg shadow-black/50 rounded-md"
          >
            ← Voltar ao Portfólio
          </Link>

          {cloudwardensEnabled && (
            <a
              href={getCloudwardensUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 font-mono text-xs font-bold text-amber-100 bg-amber-900/60 border border-amber-600/50 hover:border-amber-400 hover:bg-amber-800/80 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] rounded-md group"
            >
              Acessar Cloudwardens{" "}
              <img
                src="/images/cloudwardens/logo.jpg"
                alt="CW"
                className="w-5 h-5 inline-block rounded shadow-[0_0_8px_rgba(56,189,248,0.3)] border border-sky-500/30 object-cover ml-1 transition-transform group-hover:translate-x-1"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
