import { motion } from "motion/react";
import { Divider } from "../../../components/ui/Divider.tsx";
import { projects } from "../../../data/projects.ts";

export function Projects() {
  return (
    <>
      <Divider stage="ETAPA III" />
      <section id="projetos" className="relative px-6 py-20 overflow-hidden">
        {/* Fundo Parallax (scroll normal no mobile para evitar bug do iOS Safari) */}
        <div className="absolute inset-0 z-0 bg-[url('/images/portfolio/portfolio_projects_bg.jpg')] bg-scroll md:bg-fixed bg-cover bg-center opacity-25 pointer-events-none" />
        <div className="absolute inset-0 z-0 texture-forged opacity-30 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-linear-to-b from-forge-950 via-forge-950/50 to-forge-950 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>📜</span> ARQUITETURA & PROJETOS REAIS · ETAPA III
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-forged-gold">
              Projetos em Destaque
            </h2>
            <p className="font-mono text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
              Sistemas reais construídos com foco em resiliência, microsserviços, inteligência artificial e nuvem AWS.
            </p>
          </div>

          {/* Lista de Projetos */}
          <div className="mt-10 flex flex-col gap-10">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  project.featured
                    ? "border-amber-500/70 bg-linear-to-b from-forge-900/95 via-forge-950/95 to-amber-950/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.18)] hover:border-amber-400 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.3)]"
                    : "border-forge-700/80 bg-linear-to-b from-forge-900/80 to-forge-950/90 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-amber-500/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.15)]"
                }`}
              >
                {/* Aura luminosa superior para o projeto campeão */}
                {project.featured && (
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl transition-all duration-500 group-hover:bg-amber-500/20"
                    aria-hidden="true"
                  />
                )}

                {/* Badge Especial para Projeto Destaque / Campeão */}
                {project.featured ? (
                  <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-amber-400/70 bg-linear-to-r from-amber-500/25 via-ember/20 to-amber-500/15 px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    <span>🏆 1º LUGAR HACK2HIRE 2026 · PROJETO EM DESTAQUE</span>
                  </div>
                ) : (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-forge-700/80 bg-forge-950/90 px-3 py-1 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400/90 shadow-sm">
                    <span>⚙️ PROJETO DE ENGENHARIA & ARQUITETURA</span>
                  </div>
                )}

                {/* Cabeçalho do Card (Título + Link do Repositório) */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forge-700/60 pb-4">
                  <h3 className="font-display text-2xl font-bold sm:text-3xl text-bone group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-forge-700 bg-forge-950/90 px-3.5 py-1.5 font-mono text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  >
                    <span>Repositório</span>
                    <span className="text-ember font-bold">↗</span>
                  </a>
                </div>

                {/* Painel de Métricas de Impacto (Exclusivo para Projeto Campeão) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-lg border border-amber-500/30 bg-forge-950/90 px-3.5 py-2.5 shadow-inner"
                      >
                        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-steel">
                          {metric.label}
                        </span>
                        <span className="mt-1 block font-mono text-xs sm:text-sm font-bold text-amber-300">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bloco de Missão e Estratégia */}
                <div className="mt-6 space-y-5">
                  <div>
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ember flex items-center gap-2">
                      <span>🎯</span> Missão
                    </span>
                    <p className="mt-1.5 text-base sm:text-lg leading-relaxed font-semibold text-bone">
                      {project.mission}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500/90 flex items-center gap-2">
                      <span>⚔️</span> Estratégia & Arquitetura
                    </span>
                    <p className="mt-1.5 text-base sm:text-lg leading-relaxed text-slate-300">
                      {project.strategy}
                    </p>
                  </div>
                </div>

                {/* Pipeline Visual do Fluxo de Arquitetura */}
                {project.architectureFlow && project.architectureFlow.length > 0 && (
                  <div className="mt-6 rounded-lg border border-forge-700/70 bg-forge-950/80 p-4">
                    <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-2">
                      <span>🔗</span> Pipeline de Execução da Arquitetura
                    </span>
                    <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs">
                      {project.architectureFlow.map((step, stepIdx) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="rounded border border-forge-700 bg-forge-900/90 px-2.5 py-1 text-slate-200 shadow-xs">
                            {step}
                          </span>
                          {stepIdx < project.architectureFlow!.length - 1 && (
                            <span className="text-ember font-bold select-none" aria-hidden="true">
                              ➔
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Destaques de Engenharia (Highlights) */}
                {project.highlights.length > 0 && (
                  <div className="mt-6 border-t border-forge-700/50 pt-5">
                    <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500/90 flex items-center gap-2">
                      <span>🛡️</span> Destaques de Engenharia
                    </span>
                    <ul className="mt-3 space-y-3 text-sm sm:text-base leading-relaxed text-slate-200">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-ember shadow-[0_0_8px_rgba(234,88,12,0.8)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack (Tags) */}
                <div className="mt-8 border-t border-forge-700/50 pt-5">
                  <ul className="flex flex-wrap gap-2.5">
                    {project.techTags.map((tag) => (
                      <li
                        key={tag}
                        className="cursor-default rounded-md border border-forge-700/80 bg-forge-950/90 px-3 py-1.5 font-mono text-xs sm:text-sm font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

        </motion.div>
      </section>
    </>
  );
}
