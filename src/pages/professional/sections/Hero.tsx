import type { MouseEvent } from "react";
import { Button } from "../../../components/ui/Button.tsx";

const EQUIPPED_BADGES = [
  {
    id: "clf-c02",
    title: "AWS Cloud Practitioner",
    href: "https://www.credly.com/badges/828afdfe-9acc-4bba-873a-0f37a13a0903/public_url",
    isExternal: true,
    image: "/badge-clf-c02.png",
  },
  {
    id: "dva-c02",
    title: "AWS Developer Associate",
    href: "https://www.credly.com/badges/2b6490cc-6509-4987-916f-d7cab2c3a28f/public_url",
    isExternal: true,
    image: "/badge-dva-c02.png",
  },
  {
    id: "c100-dev",
    title: "MongoDB Associate Developer",
    href: "https://www.credly.com/badges/979b45cc-ec00-4980-b7c1-4970bc846b36/public_url",
    isExternal: true,
    image: "/badge-c100-dev.png",
  },
] as const;

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/weriton-petreca",
    isExternal: true,
    hoverClass: "hover:border-sky-500 hover:text-sky-400 hover:shadow-[0_0_12px_rgba(56,189,248,0.3)]",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/weritonpetreca",
    isExternal: true,
    hoverClass: "hover:border-slate-300 hover:text-bone hover:shadow-[0_0_12px_rgba(241,245,249,0.2)]",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    id: "credly",
    label: "Perfil Credly",
    href: "https://www.credly.com/users/weriton-luis-petreca",
    isExternal: true,
    hoverClass: "hover:border-amber-500 hover:text-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.8 14.3L12 14.2l-3.8 2.1.8-4.3-3.2-3 4.3-.6L12 4.5l1.9 3.9 4.3.6-3.2 3 .8 4.3z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/5535997231989?text=Ol%C3%A1%20Weriton,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!",
    isExternal: true,
    hoverClass: "hover:border-emerald-500 hover:text-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Enviar e-mail",
    href: "#contact",
    isExternal: false,
    hoverClass: "hover:border-ember hover:text-ember hover:shadow-[0_0_12px_rgba(234,88,12,0.3)]",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
] as const;

export function Hero() {
  const handleScrollToContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact") || document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="texture-forged relative overflow-hidden px-6 py-20">
      <div className="relative mx-auto max-w-4xl">
        
        {/* Card de Ficha de Personagem */}
        <div className="mb-12 rounded-lg border border-forge-700/80 bg-forge-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            
            {/* Estrutura Única: Moldura Forjada com Cavidades de Gemas */}
            <div className="flex shrink-0 flex-col items-center self-center sm:self-start">
              
              <div className="relative flex flex-col items-center rounded-xl border-2 border-amber-600/60 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                
                {/* Foto Hexagonal Embutida */}
                <div className="relative flex items-center justify-center p-[2px] bg-gradient-to-b from-amber-400 to-amber-700 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
                  <div className="h-44 w-40 overflow-hidden bg-forge-950 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
                    <img
                      src="/profile-photo.jpg"
                      alt="Weriton Luis Petreca"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Divisor Metálico Interno da Moldura */}
                <div className="my-2.5 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                {/* Cavidades/Soquetes Encravados (Sombra Interna / Depth) */}
                <div className="flex items-center justify-center gap-2 rounded-lg bg-black/60 p-1.5 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] border border-forge-800">
                  {EQUIPPED_BADGES.map((badge) => (
                    <a
                      key={badge.id}
                      href={badge.href}
                      target={badge.isExternal ? "_blank" : undefined}
                      rel={badge.isExternal ? "noopener noreferrer" : undefined}
                      title={badge.title}
                      className="group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-forge-900 bg-forge-950/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.5),inset_0_0_8px_rgba(245,158,11,0.2)]"
                    >
                      <img
                        src={badge.image}
                        alt={badge.title}
                        className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Tooltip em cima da badge */}
                      <div className="pointer-events-none absolute bottom-full mb-3 hidden w-44 rounded-md border border-forge-700 bg-forge-950 p-2 text-center font-mono text-xs text-bone shadow-2xl group-hover:block z-30">
                        {badge.title}
                      </div>
                    </a>
                  ))}
                </div>

              </div>

            </div>

            {/* Lado Direito: Dados da Ficha + Redes Sociais */}
            <div className="flex w-full flex-col justify-between gap-6 self-stretch">
              
              <dl className="grid w-full grid-cols-[100px_1fr] gap-x-4 gap-y-3 font-mono text-sm sm:grid-cols-[110px_1fr]">
                <dt className="font-bold tracking-wider text-amber-500/90">NOME</dt>
                <dd className="font-semibold text-bone sm:text-base">Weriton Luis Petreca</dd>
                
                <dt className="font-bold tracking-wider text-amber-500/90">CLASSE</dt>
                <dd className="font-semibold text-bone sm:text-base">Back-End Engineer · Java · Python · AWS</dd>
                
                <dt className="font-bold tracking-wider text-amber-500/90">ORIGEM</dt>
                <dd className="font-semibold text-bone sm:text-base">Poços de Caldas, MG</dd>
              </dl>

              {/* Redes e Contato Alinhadas à Direita */}
              <div className="flex flex-col items-end gap-2.5 border-t border-forge-700/50 pt-4">
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-steel/80">
                  CONEXÕES & PERFIS
                </span>
                
                <div className="flex items-center gap-2.5">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.isExternal ? "_blank" : undefined}
                      rel={social.isExternal ? "noopener noreferrer" : undefined}
                      onClick={!social.isExternal ? handleScrollToContact : undefined}
                      title={social.label}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border border-forge-700 bg-forge-950/90 text-steel transition-all duration-300 hover:-translate-y-1 active:translate-y-0 ${social.hoverClass}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Headline Principal */}
        <h1 className="font-display text-4xl font-bold leading-tight text-bone sm:text-5xl lg:text-6xl">
          Construo sistemas resilientes e escaláveis para a nuvem
          <span className="text-ember">
            {" "}
            — porque falhar não é uma opção.
          </span>
        </h1>

        {/* Descrição */}
        <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-slate-300">
          Desenvolvedor Back-End (Java/Python), 2x AWS certificado (Developer Associate, Cloud Practitioner) e MongoDB Associate Developer, em
          transição de carreira da Engenharia Ambiental para arquitetura de software,
          trazendo a mesma disciplina operacional para sistemas distribuídos e nuvem.
        </p>

        {/* Botões Principais com Motion (Hover Lift + Ember Glow + Click Press) */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] active:translate-y-0">
            <Button href="#projetos" variant="primary">
              Ver projetos
            </Button>
          </div>
          
          <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:translate-y-0">
            <Button href="/cv-weriton-petreca.pdf" variant="secondary" download>
              Baixar CV
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}