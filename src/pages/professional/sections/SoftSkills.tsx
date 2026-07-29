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
      <section id="competencias" className="texture-forged px-6 py-20">
        <div className="mx-auto max-w-4xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>🛡️</span> TRAÇOS PROVADOS EM COMBATE
            </p>
            <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">
              Competências Comportamentais
            </h2>
            <p className="mt-1 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Habilidades interpessoais e atitudes validadas por fatos concretos, histórico de resiliência e entregas reais.
            </p>
          </div>

          {/* Grid de Cards de Competências */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {evidence.map((item) => (
              <div
                key={item.trait}
                className="group rounded-lg border border-forge-700/80 border-l-4 border-l-ember bg-forge-900/80 p-5 sm:p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:border-l-amber-400 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Título do Traço */}
                <div className="flex items-center justify-between border-b border-forge-700/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                      {item.icon}
                    </span>
                    <h3 className="font-mono text-sm sm:text-base font-bold text-bone">
                      {item.trait}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-500/90 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                    Fato Comprovado
                  </span>
                </div>

                {/* Fato / História Probatória */}
                <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-300">
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