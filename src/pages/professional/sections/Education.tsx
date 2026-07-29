import { useState } from "react";
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
    period: "2025",
    title: "AWS Cloud Practitioner (CLF-C02)",
    detail: "Certificação AWS em fundamentos de nuvem, segurança e precificação.",
  },
  {
    period: "2026",
    title: "Fundamentos de Redes (Cisco / SENAI GO)",
    detail: "Arquitetura TCP/IP, roteamento, sub-redes e infraestrutura física/lógica.",
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

// Quantidade de itens visíveis por padrão
const INITIAL_VISIBLE_COUNT = 4;

export function Education() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = isExpanded
    ? timeline
    : timeline.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount = timeline.length - INITIAL_VISIBLE_COUNT;

  return (
    <>
      <Divider />
      <section id="formacao" className="texture-forged px-6 py-20">
        <div className="mx-auto max-w-4xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>📜</span> FORJA ACADÊMICA & INSÍGNIAS
            </p>
            <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">
              Formação & Certificações
            </h2>
            <p className="mt-1 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Graduações, certificações oficiais de mercado e programas de especialização técnica.
            </p>
          </div>

          {/* Timeline Vertical */}
          <ol className="relative ml-2 mt-10 space-y-6 border-l-2 border-forge-700/80 pl-6 sm:pl-10">
            {visibleItems.map((item) => (
              <li key={item.title} className="relative">
                
                {/* Marcador em Losango (Node de Conquista) */}
                <span
                  className={`absolute -left-[31px] sm:-left-[47px] top-4 h-4 w-4 rotate-45 border-2 transition-all duration-300 ${
                    item.highlight
                      ? "border-ember bg-forge-950 shadow-[0_0_12px_rgba(234,88,12,0.8)]"
                      : "border-forge-700 bg-forge-950"
                  }`}
                  aria-hidden="true"
                />

                {/* Card do Item */}
                <div
                  className={`group rounded-lg border p-5 sm:p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                    item.highlight
                      ? "border-ember/80 bg-forge-900/90 shadow-[0_10px_35px_rgba(234,88,12,0.15)] hover:border-ember"
                      : "border-forge-700/80 bg-forge-900/60 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {/* Badge de Destaque para Prêmios/Hackathons */}
                  {item.highlight && (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-500/50 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                      <span>🏆 CONQUISTA LENDÁRIA</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-forge-700/60 pb-3">
                    <h3
                      className={`font-display text-lg sm:text-xl font-bold ${
                        item.highlight ? "text-ember" : "text-bone"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded border ${
                        item.highlight
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          : "border-forge-700 bg-forge-950/80 text-steel"
                      }`}
                    >
                      {item.period}
                    </span>
                  </div>

                  {item.detail && (
                    <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-slate-300">
                      {item.detail}
                    </p>
                  )}
                </div>

              </li>
            ))}
          </ol>

          {/* Botão de Expansão (RPG Theme / Grimoire Action) */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center gap-3 rounded-md border border-forge-700 bg-forge-950/90 px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] active:translate-y-0"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "🔼" : "📜"}</span>
              <span>
                {isExpanded
                  ? "Recolher Histórico"
                  : `Ver Histórico Completo (+${hiddenCount} formações)`}
              </span>
            </button>
          </div>

        </div>
      </section>
    </>
  );
}