import { Divider } from "../../../components/ui/Divider.tsx";
import { projects } from "../../../data/projects.ts";

export function Projects() {
  return (
    <>
      <Divider />
      <section id="projetos" className="texture-forged px-6 py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember">
              📜 CONTRATOS & ARQUITETURAS
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              Projetos em Destaque
            </h2>
            <p className="mt-1 text-sm text-steel">
              Sistemas reais forjados com foco em resiliência, microsserviços e nuvem AWS.
            </p>
          </div>

          {/* Lista de Projetos */}
          <div className="mt-8 flex flex-col gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`hover-lift relative rounded-sm border p-6 shadow-lg transition-all ${
                  project.featured
                    ? "border-ember/70 bg-forge-900/90 shadow-ember/10"
                    : "border-forge-700 bg-forge-900/40"
                }`}
              >
                {/* Badge Especial para Projeto Destaque / Campeão */}
                {project.featured && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-xs border border-ember/60 bg-ember/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ember">
                    <span>🏆 1º LUGAR HACK2HIRE 2026 · CONTRATO LENDÁRIO</span>
                  </div>
                )}

                {/* Cabeçalho do Card (Título + Link do Repositório) */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-forge-700/50 pb-3">
                  <h3 className="font-display text-xl font-bold text-bone">
                    {project.title}
                  </h3>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-forge-700 bg-forge-950/80 px-3 py-1 font-mono text-xs text-steel transition-colors hover:border-ember hover:text-ember"
                  >
                    <span>repositório</span>
                    <span className="text-ember">↗</span>
                  </a>
                </div>

                {/* Bloco de Missão e Estratégia */}
                <div className="mt-4 space-y-3">
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ember">
                      🎯 Missão
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-bone">
                      {project.mission}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-steel">
                      ⚔️ Estratégia & Arquitetura
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-steel">
                      {project.strategy}
                    </p>
                  </div>
                </div>

                {/* Destaques de Engenharia (Highlights) */}
                {project.highlights.length > 0 && (
                  <div className="mt-5 border-t border-forge-700/30 pt-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-steel">
                      🛡️ Destaques de Engenharia
                    </span>
                    <ul className="mt-2 space-y-2 text-xs leading-relaxed text-bone/90">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-ember" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack (Tags) */}
                <div className="mt-6 border-t border-forge-700/30 pt-4">
                  <ul className="flex flex-wrap gap-2">
                    {project.techTags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-sm border border-forge-700/80 bg-forge-950/80 px-2.5 py-1 font-mono text-[11px] text-steel transition-colors hover:border-ember/60 hover:text-bone"
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