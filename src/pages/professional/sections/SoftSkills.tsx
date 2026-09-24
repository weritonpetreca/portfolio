import { motion } from "motion/react";
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
      <Divider stage="ETAPA VI" />
      <section id="competencias" className="texture-forged relative px-6 py-20">
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
              <span>🛡️</span> TRAÇOS PROVADOS EM COMBATE · ETAPA VI
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-forged-gold">
              Competências Comportamentais
            </h2>
            <p className="font-mono text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
              Habilidades interpessoais e atitudes validadas por fatos concretos, histórico de resiliência e entregas reais.
            </p>
          </div>

          {/* Grid de Cards de Competências */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {evidence.map((item, index) => (
              <motion.div
                key={item.trait}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-xl border border-forge-700/80 border-l-4 border-l-ember bg-gradient-to-b from-forge-900/90 to-forge-950/95 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:border-l-amber-400 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(210,69,31,0.15)] flex flex-col justify-between"
              >
                {/* Título do Traço + Badge */}
                <div className="flex w-full items-center justify-between gap-2 border-b border-forge-700/60 pb-3">
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <span className="shrink-0 text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-115" aria-hidden="true">
                      {item.icon}
                    </span>
                    <h3 className="font-mono text-xs sm:text-sm md:text-base font-bold text-bone leading-tight group-hover:text-amber-300 transition-colors">
                      {item.trait}
                    </h3>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-2 py-1 sm:px-2.5 sm:py-1 rounded border border-amber-500/30">
                    Fato Comprovado
                  </span>
                </div>

                {/* Fato / História Probatória */}
                <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-300">
                  {item.story}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>
    </>
  );
}