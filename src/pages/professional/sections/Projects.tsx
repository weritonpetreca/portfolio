import { Divider } from "../../../components/ui/Divider.tsx";
import { projects } from "../../../data/projects.ts";

export function Projects() {
  return (
    <>
      <Divider />
      <section id="projetos" className="texture-forged px-6 py-20">
        <div className="mx-auto max-w-4xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>📜</span> CONTRATOS & ARQUITETURAS
            </p>
            <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">
              Projetos em Destaque
            </h2>
            <p className="mt-1 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Sistemas reais forjados com foco em resiliência, microsserviços, inteligência artificial e nuvem AWS.
            </p>
          </div>

          {/* Lista de Projetos */}
          <div className="mt-10 flex flex-col gap-10">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`group relative rounded-lg border p-6 sm:p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                  project.featured
                    ? "border-ember/80 bg-forge-900/90 shadow-[0_10px_35px_rgba(234,88,12,0.15)] hover:border-ember hover:shadow-[0_15px_40px_rgba(234,88,12,0.25)]"
                    : "border-forge-700/80 bg-forge-900/60 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                }`}
              >
                {/* Badge Especial para Projeto Destaque / Campeão */}
                {project.featured && (
                  <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-amber-500/50 bg-amber-500/10 px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 shadow-md">
                    <span>🏆 1º LUGAR HACK2HIRE 2026 · CONTRATO LENDÁRIO</span>
                  </div>
                )}

                {/* Cabeçalho do Card (Título + Link do Repositório) */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forge-700/60 pb-4">
                  <h3 className="font-display text-2xl font-bold text-bone sm:text-3xl">
                    {project.title}
                  </h3>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-forge-700 bg-forge-950/90 px-3.5 py-1.5 font-mono text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  >
                    <span>Repositório</span>
                    <span className="text-ember font-bold">↗</span>
                  </a>
                </div>

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
                        className="cursor-default rounded-md border border-forge-700/80 bg-forge-950/90 px-3 py-1.5 font-mono text-xs sm:text-sm font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}