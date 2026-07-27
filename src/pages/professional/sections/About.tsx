import { Divider } from "../../../components/ui/Divider.tsx";

export function About() {
  return (
    <>
      <Divider />
      <section id="sobre" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-ember">A ORIGEM</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
            Sobre
          </h2>

          <div className="mt-6 space-y-4 text-steel">
            <p>
              Antes de forjar sistemas, eu forjava rotina. Por cerca de cinco anos, operei e geri
              uma operação leiteira rural onde a margem para falha era zero, um
              equipamento parado, um horário perdido, e o prejuízo era imediato e real.
              Formado em Engenharia Ambiental, troquei o campo pelo código buscando resolver o
              mesmo tipo de problema, só que em outra escala: sistemas que não podem
              quebrar, arquiteturas que precisam sobreviver ao imprevisto.
            </p>
            <p>
              Hoje curso Análise e Desenvolvimento de Sistemas na UniFatecie (previsão de
              conclusão em janeiro de 2028), sou certificado{" "}
              <span className="text-bone">AWS Developer Associate (DVA-C02)</span>, {" "}
              <span className="text-bone">AWS Cloud Practitioner (CLF-C02)</span> e
              {" "}
              <span className="text-bone">MongoDB Associate Java Developer (C100-DEV)</span>, construí
              com a mesma disciplina operacional de antes, o CrediFácil IDP,
              projeto que venceu o Hack2Hire 2026 da Escola da Nuvem em parceria com a
              AWS. Meu próximo passo é um estágio Back-End/Cloud AWS. O objetivo de
              longo prazo é DevSecOps. Levar essa mesma exigência de confiabilidade para
              segurança, CI/CD e infraestrutura.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
