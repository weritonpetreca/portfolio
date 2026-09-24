import { motion } from "motion/react";
import { Divider } from "../../../components/ui/Divider.tsx";

/**
 * Aprendizados práticos de missão crítica derivados da operação rural (DRY).
 */
const EXPERIENCE_HIGHLIGHTS = [
  {
    icon: "⏱️",
    label: "SLA & Zero Indisponibilidade",
    desc: "Ações imediatas para prevenir paralisações. Equipamento e processo crítico não podem falhar.",
  },
  {
    icon: "📊",
    label: "Gestão Operacional & Custos",
    desc: "Execução direta e controle financeiro com foco constante em eficiência e otimização de recursos.",
  },
  {
    icon: "🔍",
    label: "Manutenção Preventiva",
    desc: "Diagnóstico e correção antes que a falha ocorra: exata mentalidade de Observability e TDD.",
  },
] as const;

export function Experience() {
  return (
    <>
      <Divider stage="ETAPA IV" />
      <section id="experiencia" className="texture-forged relative px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>📜</span> QUEST LOG & JORNADA · ETAPA IV
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-forged-gold">
              Experiência Anterior
            </h2>
            <p className="font-mono text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
              Base operacional sólida e resolução de problemas sob restrições reais de missão crítica.
            </p>
          </div>

          {/* Timeline com Card Integrado */}
          <div className="relative ml-2 mt-10 border-l-2 border-amber-600/40 pl-6 sm:pl-10">
            
            {/* Marcador da Linha do Tempo (Nó de Missão Rúnico) */}
            <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute h-4 w-4 rotate-45 border-2 border-ember bg-forge-950 shadow-[0_0_15px_rgba(234,88,12,0.9)]" />
              <span className="relative h-1.5 w-1.5 rotate-45 bg-amber-400" />
            </div>

            {/* Card Principal da Experiência */}
            <div className="group rounded-xl border border-forge-700/80 bg-gradient-to-b from-forge-900/90 to-forge-950/95 p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(210,69,31,0.15)]">
              
              {/* Cabeçalho do Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forge-700/60 pb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-bone sm:text-2xl group-hover:text-amber-300 transition-colors">
                    Gestão e Operação Rural
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-amber-500/90 mt-0.5">
                    Pecuária Leiteira · Execução Operacional & Financeira
                  </p>
                </div>
                <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs sm:text-sm font-semibold text-amber-300 shadow-sm">
                  ~5 Anos de Missão Crítica
                </span>
              </div>

              {/* Descrição */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300">
                Executei e geri a operação de uma propriedade rural voltada à pecuária leiteira, uma rotina que ensina, na prática, o que sistemas de missão crítica exigem na teoria: monitoramento constante, manutenção preventiva (um equipamento que falha não espera reunião) e tomadas de decisão sob limitação de recursos. É a exata mentalidade transferida para o desenvolvimento de software: <strong className="font-semibold text-bone">prevenir é mais eficiente do que remediar</strong>, seja em campo ou em uma arquitetura distribuída na nuvem.
              </p>

              {/* Destaques de Aprendizado Prático */}
              <div className="mt-8 border-t border-forge-700/60 pt-6">
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500/90 flex items-center gap-2">
                  <span>🛡️</span> APRENDIZADOS DE MISSÃO CRÍTICA TRANSFERIDOS PARA A ENGENHARIA
                </span>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {EXPERIENCE_HIGHLIGHTS.map((item) => (
                    <div
                      key={item.label}
                      className="group/item rounded-lg border border-forge-700/80 bg-forge-950/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_12px_rgba(245,158,11,0.2)]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg transition-transform duration-300 group-hover/item:scale-115" aria-hidden="true">
                          {item.icon}
                        </span>
                        <h4 className="font-mono text-xs sm:text-sm font-bold text-bone">
                          {item.label}
                        </h4>
                      </div>
                      <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-steel">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </motion.div>
      </section>
    </>
  );
}