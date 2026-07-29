import type { MouseEvent } from "react";

const NAV_ITEMS = [
  { label: "Habilidades", href: "#habilidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Formação", href: "#formacao" },
  { label: "Contato", href: "#contact" },
] as const;

export function Header() {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-forge-700/80 bg-forge-950/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5">
        
        {/* Logo / Nome com Toque de Forja */}
        <a
          href="#"
          onClick={(e) => handleScroll(e, "#")}
          className="group font-mono text-sm sm:text-base font-bold tracking-widest text-bone transition-colors"
          title="Voltar ao topo"
        >
          <span className="text-ember transition-transform duration-300 group-hover:inline-block group-hover:scale-125">⚡</span> W.{" "}
          <span className="text-slate-200 transition-colors group-hover:text-amber-400">PETRECA</span>
        </a>

        {/* Menu de Navegação Rápida (Desktop / Tablet) */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs font-bold uppercase tracking-wider text-steel">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-amber-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Status Indicador Pulsante (Verde / Operational Online) */}
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="hidden sm:inline font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
            Disponível para Oportunidades
          </span>
          <span className="sm:hidden font-bold text-emerald-400 text-[11px] tracking-wider">
            DISPONÍVEL
          </span>
        </div>

      </div>
    </header>
  );
}