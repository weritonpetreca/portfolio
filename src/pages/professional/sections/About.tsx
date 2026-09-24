import { motion } from "motion/react";
import { Divider } from "../../../components/ui/Divider.tsx";

/**
 * Mapeamento dos diferenciais operacionais do desenvolvedor (DRY).
 */
const CORE_PILLARS = [
  {
    icon: "⚙️",
    title: "Resiliência Operacional",
    desc: "Experiência prática em cenários críticos onde a tolerância a falha e indisponibilidade é zero.",
  },
  {
    icon: "☁️",
    title: "Arquitetura Cloud-Native",
    desc: "Desenvolvimento de APIs e ecossistemas serverless/microsserviços orientados a eventos na AWS.",
  },
  {
    icon: "🛡️",
    title: "Mindset DevSecOps",
    desc: "Qualidade, segurança e automação integradas desde a primeira linha de código (TDD, CI/CD, SAST).",
  },
] as const;

export function About() {
  return (
    <>
      <Divider stage="ETAPA I" />
      <section id="sobre" className="texture-forged relative px-6 py-20">
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
              <span>📜</span> LORE DO ENGENHEIRO · ETAPA I
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-forged-gold">
              A Origem & Trajetória
            </h2>
            <p className="font-mono text-xs sm:text-sm text-steel">
              Da gestão de missão crítica no campo para a engenharia de software resiliente na nuvem.
            </p>
          </div>

          {/* Card Principal da História */}
          <div className="mt-8 rounded-xl border border-forge-700/80 bg-gradient-to-b from-forge-900/90 to-forge-950/95 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_20px_50px_rgba(210,69,31,0.15)]">
            <div className="space-y-5 font-sans text-base sm:text-lg leading-relaxed text-slate-300">
              <p>
                Antes de forjar sistemas distribuídos, eu forjava rotina e resiliência em campo. Por cerca de cinco anos, executei e gerenciei operacionalmente e financeiramente uma operação leiteira rural onde a margem para erro era zero — um equipamento parado ou um horário perdido significava prejuízo imediato. Graduado em Engenharia Ambiental, troquei o campo pelo código buscando resolver o mesmo tipo de desafio em outra escala: <strong className="font-semibold text-bone">arquiteturas que precisam sobreviver ao imprevisto e rodar com altíssima disponibilidade</strong>.
              </p>
              
              <p>
                Atualmente curso Análise e Desenvolvimento de Sistemas na UniFatecie (previsão de conclusão em janeiro de 2028) e possuo as certificações{" "}
                <span className="inline-flex items-center font-mono text-xs sm:text-sm font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                  AWS Developer Associate (DVA-C02)
                </span>
                ,{" "}
                <span className="inline-flex items-center font-mono text-xs sm:text-sm font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                  AWS Cloud Practitioner (CLF-C02)
                </span>{" "}
                e{" "}
                <span className="inline-flex items-center font-mono text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  MongoDB Associate Java Developer (C100-DEV)
                </span>.
              </p>

              <p>
                Construí com essa mesma disciplina rigorosa o <strong className="font-semibold text-bone">CrediFácil IDP</strong>, projeto que conquistou o <strong className="font-bold text-ember">1º lugar no Hackathon Hack2Hire 2026</strong> (promovido pela Escola da Nuvem em parceria com a AWS), avaliado e premiado por bancadas técnicas de grandes empresas parceiras.
              </p>

              <p>
                Meu objetivo atual é atuar como <strong className="font-semibold text-bone">Desenvolvedor Back-End / Cloud AWS</strong>, evoluindo continuamente rumo à especialização em <strong className="font-semibold text-bone">DevSecOps</strong> — aplicando a mesma exigência de confiabilidade e segurança na construção de software e pipelines automatizados.
              </p>
            </div>

            {/* Painel de Pilares / Atributos Passivos */}
            <div className="mt-10 border-t border-forge-700/60 pt-8">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500/90 flex items-center gap-2">
                <span>⚔️</span> PILARES DE ENGENHARIA FORJADOS EM COMBATE
              </span>
              
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {CORE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="group rounded-lg border border-forge-700/80 bg-forge-950/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_8px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(245,158,11,0.2)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl transition-transform duration-300 group-hover:scale-115" aria-hidden="true">
                        {pillar.icon}
                      </span>
                      <h3 className="font-mono text-sm sm:text-base font-bold text-bone">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-steel">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </motion.div>
      </section>
    </>
  );
}