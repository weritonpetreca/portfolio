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

        {/* Menu de Navegação Rápida */}
        <nav className="flex items-center gap-3 sm:gap-6 font-mono text-xs font-bold uppercase tracking-wider text-steel">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={`transition-all duration-200 hover:-translate-y-0.5 hover:text-amber-400 ${
                item.label === "Contato"
                  ? "rounded-md border border-amber-600/50 bg-forge-900/90 px-3 py-1.5 text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "hidden sm:inline-block"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
}