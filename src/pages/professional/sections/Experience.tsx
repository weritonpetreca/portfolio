import { Divider } from "../../../components/ui/Divider.tsx";

/**
 * Aprendizados práticos de missão crítica derivados da operação rural (DRY).
 */
const EXPERIENCE_HIGHLIGHTS = [
  {
    label: "SLA & Zero Indisponibilidade",
    desc: "Ações imediatas para prevenir paralisações. Equipamento e processo crítico não podem falhar.",
  },
  {
    label: "Gestão Operacional & Custos",
    desc: "Execução direta e controle financeiro com foco constante em eficiência e otimização de recursos.",
  },
  {
    label: "Manutenção Preventiva",
    desc: "Diagnóstico e correção antes que a falha ocorra: exata mentalidade de observability e TDD.",
  },
] as const;

export function Experience() {
  return (
    <>
      <Divider />
      <section id="experiencia" className="texture-forged px-6 py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember">
              📜 QUEST LOG & JORNADA
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              Experiência Anterior
            </h2>
            <p className="mt-1 text-sm text-steel">
              Base operacional sólida e resolução de problemas sob restrições reais de missão crítica.
            </p>
          </div>

          {/* Timeline com Card Integrado */}
          <div className="relative ml-2 mt-8 border-l-2 border-forge-700/60 pl-6 sm:pl-8">
            
            {/* Marcador da Linha do Tempo (Nó) */}
            <div className="absolute -left-[9px] top-1 h-4 w-4 rotate-45 border-2 border-ember bg-forge-950 shadow-sm shadow-ember/50" />

            {/* Card Principal da Experiência */}
            <div className="hover-lift rounded-sm border border-forge-700 bg-forge-900/60 p-6 shadow-xl">
              
              {/* Cabeçalho do Card */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-forge-700/50 pb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-bone">
                    Gestão e Operação Rural
                  </h3>
                  <p className="font-mono text-xs text-ember">
                    Pecuária Leiteira · Operacional & Financeiro
                  </p>
                </div>
                <span className="rounded-sm border border-forge-700 bg-forge-950/80 px-2.5 py-1 font-mono text-xs text-steel">
                  ~5 Anos
                </span>
              </div>

              {/* Descrição */}
              <p className="mt-4 text-sm leading-relaxed text-steel">
                Executei e geri a operação de uma propriedade rural voltada à pecuária leiteira, uma rotina que ensina, na prática, o que sistemas de missão crítica exigem na teoria: monitoramento constante, manutenção preventiva (um equipamento que falha não espera reunião) e tomadas de decisão sob limitação de recursos. É a exata mentalidade transferida para o desenvolvimento de software: <strong className="text-bone">prevenir é mais eficiente do que remediar</strong>, seja em campo ou em uma arquitetura distribuída na nuvem.
              </p>

              {/* Destaques de Aprendizado Prático */}
              <div className="mt-6 border-t border-forge-700/40 pt-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-steel">
                  🛡️ APRENDIZADOS DE MISSÃO CRÍTICA
                </span>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {EXPERIENCE_HIGHLIGHTS.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-sm border border-forge-700/80 bg-forge-950/80 p-3"
                    >
                      <h4 className="font-mono text-xs font-bold text-bone">
                        {item.label}
                      </h4>
                      <p className="mt-1 font-mono text-[11px] leading-snug text-steel/80">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}