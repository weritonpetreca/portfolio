import { useEffect, useState, type MouseEvent } from "react";
import { getCloudwardensUrl, isCloudwardensEnabled } from "../../lib/config.ts";

const NAV_ITEMS = [
  { label: "Sobre", href: "#sobre", id: "sobre" },
  { label: "Habilidades", href: "#habilidades", id: "habilidades" },
  { label: "Projetos", href: "#projetos", id: "projetos" },
  { label: "Experiência", href: "#experiencia", id: "experiencia" },
  { label: "Formação", href: "#formacao", id: "formacao" },
  { label: "Competências", href: "#competencias", id: "competencias" },
  { label: "Contato", href: "#contact", id: "contact" },
] as const;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const cloudwardensEnabled = isCloudwardensEnabled();

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)),
        );
      } else {
        setScrollProgress(0);
      }

      if (scrollTop < 220) {
        setActiveSection("");
        return;
      }

      let currentId = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            currentId = item.id;
          }
        }
      }
      setActiveSection(currentId);
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    if (!targetId) {
      setActiveSection("");
      window.history.replaceState(null, "", window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setActiveSection(targetId);
      window.history.replaceState(null, "", href);
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-forge-700/80 bg-forge-950/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Logo: WERITON.dev colado e alinhado por baseline */}
        <a
          href="#"
          onClick={(e) => handleScroll(e, "#")}
          className="group flex shrink-0 items-baseline gap-1 font-mono font-bold transition-colors"
          title="Voltar ao topo"
        >
          <span className="text-ember self-center transition-transform duration-300 group-hover:scale-125">⚡</span>
          <span className="text-sm sm:text-base text-bone tracking-wider transition-colors group-hover:text-amber-400">
            WERITON
          </span>
          <span className="text-xs text-amber-400 font-semibold tracking-normal">
            .dev
          </span>
        </a>

        {/* Menu de Navegação Rápida + Destaque Cloudwardens */}
        <nav aria-label="Navegação principal" className="flex items-center gap-2.5 sm:gap-4 font-mono text-xs font-bold uppercase tracking-wider text-steel">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            if (item.label === "Contato") {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded-md border px-3 py-1.5 transition-all duration-200 hover:-translate-y-0.5 ${
                    isActive
                      ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                      : "border-amber-600/50 bg-forge-900/90 text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  }`}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                aria-current={isActive ? "location" : undefined}
                className={`relative hidden lg:inline-block py-1 transition-all duration-200 hover:-translate-y-0.5 hover:text-amber-400 ${
                  isActive ? "text-amber-400" : "text-steel"
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="pointer-events-none absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-ember to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}

          {/* Destaque Cloudwardens no Topo (Apenas quando Feature Flag ativa) */}
          {cloudwardensEnabled && (
            <a
              href={getCloudwardensUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-amber-500/60 bg-linear-to-r from-amber-950/80 via-forge-900 to-amber-950/80 px-2.5 py-1 text-xs text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all duration-200 hover:border-amber-400 hover:scale-105 hover:text-amber-200 hover:shadow-[0_0_18px_rgba(245,158,11,0.45)]"
              title="Conheça o Cloudwardens: Jogo Tático e Simulador de Nuvem AWS"
            >
              <img src="/images/cloudwardens/logo.jpg" alt="CloudWardens" className="w-5 h-5 rounded shadow-[0_0_8px_rgba(56,189,248,0.3)] border border-sky-500/30 object-cover" />
              <span className="tracking-wide">CLOUDWARDENS</span>
              <span className="hidden sm:inline rounded bg-amber-500/20 px-1 py-0.5 text-[10px] text-amber-400 font-bold">
                TCG CLOUD
              </span>
            </a>
          )}

          {/* Botão de Menu Mobile (< lg) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            className="inline-flex lg:hidden h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-forge-700 bg-forge-900/90 text-bone transition-colors hover:border-amber-400 hover:text-amber-400"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </div>

      {/* Gaveta de Navegação Mobile */}
      {isMobileMenuOpen && (
        <div className="border-t border-forge-700/80 bg-forge-950/95 px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            {NAV_ITEMS.filter((item) => item.label !== "Contato").map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded-md border px-3 py-2 transition-colors ${
                    isActive
                      ? "border-amber-400/80 bg-amber-500/15 text-amber-300"
                      : "border-forge-700/80 bg-forge-900/80 text-steel hover:border-amber-400 hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Barra de Progresso de Leitura da Forja (2px no limite inferior do Header) */}
      <div className="pointer-events-none h-0.5 w-full bg-transparent overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-linear-to-r from-ember via-amber-500 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
