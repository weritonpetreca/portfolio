import { Divider } from "../../../components/ui/Divider.tsx";
import { projects } from "../../../data/projects.ts";

export function Projects() {
  return (
    <>
      <Divider />
      <section id="projetos" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-ember">CONTRATOS CONCLUÍDOS</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
            Projetos em Destaque
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`border p-6 ${
                  project.featured
                    ? "border-ember/60 bg-forge-900"
                    : "border-forge-700 bg-forge-900/40"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl text-bone">{project.title}</h3>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-steel hover:text-ember"
                  >
                    repositório ↗
                  </a>
                </div>

                <p className="mt-3 text-steel">{project.mission}</p>
                <p className="mt-2 text-sm text-steel/80">{project.strategy}</p>

                {project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-bone">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.techTags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-forge-700 px-2 py-0.5 font-mono text-xs text-steel"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
