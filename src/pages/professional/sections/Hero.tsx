import { Button } from "../../../components/ui/Button.tsx";

/**
 * Substituiu o conceito de "title block de engenharia" por uma ficha de
 * personagem — mais fiel à personalidade real por trás do portfólio
 * (dark/medieval/RPG) sem depender de nenhuma licença específica.
 * Cada rótulo carrega informação real (nome, papel, status), não é
 * decoração — mesmo princípio de antes, com outra roupagem.
 */
export function Hero() {
  return (
    <section className="texture-forged relative overflow-hidden px-6 py-24">
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-10 border border-forge-700 bg-forge-900/60 p-5 font-mono text-xs">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-steel sm:grid-cols-[110px_1fr]">
            <dt>NOME</dt>
            <dd className="text-bone">Weriton Luis Petreca</dd>
            <dt>CLASSE</dt>
            <dd className="text-bone">Back-End Engineer · Java · Python · AWS</dd>
            <dt>STATUS</dt>
            <dd className="text-ember">Disponível para oportunidades</dd>
            <dt>ORIGEM</dt>
            <dd className="text-bone">Poços de Caldas, MG</dd>
          </dl>
        </div>

        <h1 className="font-display text-4xl leading-tight font-bold text-bone sm:text-5xl">
          Construo sistemas resilientes e escaláveis para a nuvem
          <span className="text-ember">
            {" "}
            — porque falhar não é uma opção.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-steel">
          Desenvolvedor Back-End (Java/Python), 2x AWS certificado (Developer Associate, Cloud Practitioner), em
          transição de carreira da Engenharia Ambiental para arquitetura de software,
          trazendo a mesma disciplina operacional para sistemas distribuídos e nuvem.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#projetos" variant="primary">
            Ver projetos
          </Button>
          <Button href="/cv-weriton-petreca.pdf" variant="secondary" download>
            Baixar CV
          </Button>
        </div>
      </div>
    </section>
  );
}
