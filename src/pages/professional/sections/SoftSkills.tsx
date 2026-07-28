import { Divider } from "../../../components/ui/Divider.tsx";

interface Evidence {
  trait: string;
  icon: string;
  story: string;
}

/**
 * Evidência substitui adjetivo (ver seção 12 do SRS).
 * Cada competência é comprovada com fatos e resultados reais (DRY).
 */
const evidence: Evidence[] = [
  {
    trait: "Resiliência Operacional",
    icon: "🛡️",
    story:
      "Geri uma operação 24/7 onde falha não era opção, por cerca de cinco anos, antes de trazer essa mesma exigência de disponibilidade para arquiteturas de software.",
  },
  {
    trait: "Trabalho em Equipe",
    icon: "⚔️",
    story:
      "Parte da equipe vencedora (Grupo 12) do Hack2Hire 2026 com o CrediFácil IDP, um pipeline serverless construído sob pressão real de hackathon.",
  },
  {
    trait: "Aprendizado Contínuo",
    icon: "📜",
    story:
      "Enquanto curso Análise e Desenvolvimento de Sistemas, concluí as certificações AWS Developer Associate, AWS Cloud Practitioner e MongoDB Associate Java Developer (mais por vir).",
  },
  {
    trait: "Comunicação Técnica",
    icon: "💬",
    story:
      "Crio conteúdo técnico-didático no LinkedIn, traduzindo conceitos de arquitetura de software e DevSecOps para uma audiência mais ampla.",
  },
];

export function SoftSkills() {
  return (
    <>
      <Divider />
      <section id="competencias" className="texture-forged px-6 py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember">
              🛡️ TRAÇOS PROVADOS EM COMBATE
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              Competências Comportamentais
            </h2>
            <p className="mt-1 text-sm text-steel">
              Habilidades interpessoais e atitudes validadas por fatos concretos e resultados operacionais.
            </p>
          </div>

          {/* Grid de Cards de Competências */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {evidence.map((item) => (
              <div
                key={item.trait}
                className="hover-lift rounded-sm border border-forge-700 border-l-2 border-l-ember bg-forge-900/60 p-5 shadow-md"
              >
                {/* Título do Traço */}
                <div className="flex items-center gap-2 border-b border-forge-700/40 pb-2.5">
                  <span className="text-base" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-bone">
                    {item.trait}
                  </h3>
                </div>

                {/* Fato / História Probatória */}
                <p className="mt-3 font-sans text-xs leading-relaxed text-steel">
                  {item.story}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}