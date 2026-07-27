import { Divider } from "../../../components/ui/Divider.tsx";

interface Evidence {
  trait: string;
  story: string;
}

// Evidência substitui adjetivo (ver seção 12 do SRS) — cada linha prova uma
// competência através de um fato real, sem precisar nomeá-la.
const evidence: Evidence[] = [
  {
    trait: "Resiliência",
    story:
      "Geri uma operação 24/7 onde falha não era opção, por cerca de cinco anos, antes de trazer essa mesma exigência de disponibilidade para arquiteturas de software.",
  },
  {
    trait: "Trabalho em equipe",
    story:
      "Parte da equipe vencedora (Grupo 12) do Hack2Hire 2026 com o CrediFácil IDP, um pipeline serverless construído sob pressão real de hackathon.",
  },
  {
    trait: "Aprendizado contínuo",
    story:
      "Enquanto curso Análise e Desenvolvimento de Sistemas, conclui as certificações AWS Developer Associate, AWS Cloud Practitioner e MongoDB Associate Java Developer (mais por vir).",
  },
  {
    trait: "Comunicação técnica",
    story:
      "Crio conteúdo técnico-didático no LinkedIn, traduzindo conceitos de arquitetura de software para uma audiência mais ampla.",
  },
];

export function SoftSkills() {
  return (
    <>
      <Divider />
      <section id="competencias" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-ember">TRAÇOS PROVADOS EM COMBATE</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
            Competências Comportamentais
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {evidence.map((item) => (
              <div key={item.trait} className="border-l-2 border-ember pl-4">
                <p className="font-mono text-xs tracking-widest text-steel uppercase">
                  {item.trait}
                </p>
                <p className="mt-2 text-bone">{item.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
