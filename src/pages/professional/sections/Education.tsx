import { Divider } from "../../../components/ui/Divider.tsx";

interface TimelineItem {
  period: string;
  title: string;
  detail?: string;
  highlight?: boolean;
}

const timeline: TimelineItem[] = [
  {
    period: "2026",
    title: "1º lugar — Hackathon Hack2Hire (Escola da Nuvem + AWS)",
    detail:
      "102 participantes, 12 equipes. 1º lugar na avaliação interna (nota 4,77) e na etapa final com empresas parceiras (nota 4,85), com o projeto CrediFácil IDP.",
    highlight: true,
  },
  {
    period: "2025–2028",
    title: "Análise e Desenvolvimento de Sistemas — UniFatecie",
    detail: "Em andamento, previsão de conclusão em janeiro de 2028.",
  },
  {
    period: "2026",
    title: "AWS Developer Associate (DVA-C02)",
    detail: "Certificação AWS oficial em arquitetura e desenvolvimento serverless.",
  },
  {
    period: "2026",
    title: "MongoDB Associate Java Developer (C100-DEV)",
    detail: "Certificação oficial MongoDB em modelagem e persistência NoSQL com Java.",
  },
  {
    period: "2026",
    title: "Fundamentos de Redes (Cisco / SENAI GO)",
    detail: "Arquitetura TCP/IP, roteamento, sub-redes e infraestrutura física/lógica.",
  },
  {
    period: "2025",
    title: "AWS Cloud Practitioner (CLF-C02)",
    detail: "Certificação AWS em fundamentos de nuvem, segurança e precificação.",
  },
  {
    period: "Em andamento",
    title: "Hackers do Bem (SENAI / RNP)",
    detail: "Programa nacional de formação em cibersegurança e defesa cibernética.",
  },
  {
    period: "Em andamento",
    title: "Fundamentos de Cibersegurança (Cisco / SENAI GO)",
    detail: "Conceitos fundamentais de segurança da informação e prevenção a ameaças.",
  },
  {
    period: "Em andamento",
    title: "Especialista em IA | Boost (Alura)",
    detail: "Nivelamento e aprofundamento prático em soluções de Inteligência Artificial.",
  },
  {
    period: "2018",
    title: "Bacharelado em Engenharia Ambiental (UNIFAL)",
    detail: "Universidade Federal de Alfenas — Base sólida em ciências exatas, modelagem e análise rigorosa.",
  },
];

export function Education() {
  return (
    <>
      <Divider />
      <section id="formacao" className="texture-forged px-6 py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember">
              📜 FORJA ACADÊMICA & INSÍGNIAS
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              Formação & Certificações
            </h2>
            <p className="mt-1 text-sm text-steel">
              Graduações, certificações oficiais de mercado e programas de especialização técnica.
            </p>
          </div>

          {/* Timeline Vertical */}
          <ol className="relative ml-2 mt-8 space-y-6 border-l-2 border-forge-700/60 pl-6 sm:pl-8">
            {timeline.map((item) => (
              <li key={item.title} className="relative">
                
                {/* Marcador em Losango (Node) */}
                <span
                  className={`absolute -left-[31px] sm:-left-[39px] top-4 h-3.5 w-3.5 rotate-45 border-2 transition-colors ${
                    item.highlight
                      ? "border-ember bg-ember/20 shadow-md shadow-ember/50"
                      : "border-forge-700 bg-forge-950"
                  }`}
                  aria-hidden="true"
                />

                {/* Card do Item com .hover-lift */}
                <div
                  className={`hover-lift rounded-sm border p-4 shadow-md transition-all ${
                    item.highlight
                      ? "border-ember/70 bg-forge-900/90 shadow-ember/10"
                      : "border-forge-700 bg-forge-900/50"
                  }`}
                >
                  {/* Badge de Destaque para Prêmios/Hackathons */}
                  {item.highlight && (
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-xs border border-ember/60 bg-ember/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ember">
                      <span>🏆 CONQUISTA LENDÁRIA</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p
                      className={`font-display text-base font-bold ${
                        item.highlight ? "text-ember" : "text-bone"
                      }`}
                    >
                      {item.title}
                    </p>
                    <span
                      className={`font-mono text-xs ${
                        item.highlight ? "font-bold text-ember" : "text-steel"
                      }`}
                    >
                      {item.period}
                    </span>
                  </div>

                  {item.detail && (
                    <p className="mt-2 font-sans text-xs leading-relaxed text-steel">
                      {item.detail}
                    </p>
                  )}
                </div>

              </li>
            ))}
          </ol>

        </div>
      </section>
    </>
  );
}