import { Link } from "react-router";
import { Seo } from "../../components/layout/Seo.tsx";

/**
 * Fase 0 entrega só o portal (framing + volta para o profissional) —
 * o showcase de projetos temáticos e o jogo de cartas entram nas
 * Fases 2 e 3 (ver roadmap no SRS, seção 14).
 *
 * Note a paleta diferente (realm-950, realm-parchment, realm-ember,
 * font-realm-display) e o fato de que isto vive dentro de uma div própria,
 * não do <body> global — é assim que garantimos que a identidade visual
 * desta persona não vaza para a página profissional e vice-versa (RF-19).
 */
export function WitcherRealmPage() {
  return (
    <div className="min-h-screen bg-realm-950 px-6 py-24 text-realm-parchment">
      <Seo
        title="Witcher Realm — Weriton Petreca"
        description="Extensão pessoal e experimental do portfólio de Weriton Petreca, explorando arquitetura de software através do universo The Witcher."
        path="/witcher-realm"
        favicon="/witcher-favicon.ico"
      />

      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-realm-ember uppercase">
          Você saiu da trilha principal
        </p>

        <h1 className="font-realm-display mt-4 text-4xl italic text-realm-parchment">
          Witcher Realm
        </h1>

        <p className="mt-8 text-balance leading-relaxed text-realm-parchment/80">
          Esta é uma extensão pessoal e experimental do meu portfólio, onde uso
          referências desse universo para explorar conceitos de arquitetura de
          software e, ocasionalmente, programar por puro prazer. Se você chegou até
          aqui vindo de uma vaga, ótimo sinal: você também vai ver como eu penso e
          aprendo fora do horário comercial.
        </p>

        <p className="mt-4 text-sm text-realm-parchment/50">
          (Em construção — Fases 2 e 3 trazem os projetos temáticos e um pequeno jogo
          de cartas original.)
        </p>

        <Link
          to="/"
          className="mt-10 inline-block font-mono text-sm text-realm-ember hover:underline"
        >
          ← Voltar para a página profissional
        </Link>
      </div>
    </div>
  );
}
