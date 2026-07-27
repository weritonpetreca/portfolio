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
  { period: "2025–2028", title: "Análise e Desenvolvimento de Sistemas — UniFatecie", detail: "Em andamento, previsão de conclusão em janeiro de 2028." },
  { period: "2026", title: "AWS Developer Associate(DVA-C02)", detail: "Certificação AWS." },
  { period: "2026", title: "MongoDB Associate Java Developer (C100-DEV)", detail: "Certificação MongoDB." },
  { period: "2026", title: "Fundamentos de Redes (Cisco/SENAI GO)", detail: "Curso de fundamentos de redes." }, 
  { period: "2025", title: "AWS Cloud Practitioner (CLF-C02)", detail: "Certificação AWS." },
  { period: "Em andamento", title: "Hackers do Bem (SENAI/RNP)", detail: "Programa de formação em cibersegurança." },
  { period: "Em andamento", title: "Fundamentos de Cibersegurança (Cisco/SENAI GO)", detail: "Curso de fundamentos de cibersegurança." },
  { period: "Em andamento", title: "Especialista em IA | Boost (Alura)", detail: "Complemento da formação Especialista em IA (Nivelamento)." },
  { period: "2018", title: "Bacharelado em Engenharia Ambiental (UNIFAL)" },
];

export function Education() {
  return (
    <>
      <Divider />
      <section id="formacao" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-ember">FORJA ACADÊMICA</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
            Formação & Certificações
          </h2>

          <ol className="mt-8 space-y-6 border-l border-forge-700 pl-6">
            {timeline.map((item) => (
              <li key={item.title} className="relative">
                <span
                  className={`absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full ${
                    item.highlight ? "bg-ember" : "bg-forge-700"
                  }`}
                  aria-hidden="true"
                />
                <p className="font-mono text-xs text-steel">{item.period}</p>
                <p className={`mt-1 ${item.highlight ? "text-ember" : "text-bone"}`}>
                  {item.title}
                </p>
                {item.detail && <p className="mt-1 text-sm text-steel">{item.detail}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
