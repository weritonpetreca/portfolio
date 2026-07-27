import { Divider } from "../../../components/ui/Divider.tsx";

export function Experience() {
  return (
    <>
      <Divider />
      <section id="experiencia" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-ember">TRILHAS ANTERIORES</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
            Experiência Anterior
          </h2>

          <div className="mt-6 text-steel">
            <h3 className="font-display text-lg text-bone">Gestão e Operação Rural</h3>
            <p className="mt-1 font-mono text-xs text-steel/70">~5 anos</p>
            <p className="mt-3">
              Geri e operei uma propriedade rural voltada à pecuária leiteira, uma
              rotina que ensina, na prática, o que sistemas de missão crítica exigem em
              teoria: monitoramento constante, manutenção preventiva (um equipamento que
              falha no meio da ordenha não espera reunião de sprint) e decisões sob
              recursos limitados. É a mesma mentalidade que aplico hoje: prevenir é mais
              barato que remediar, seja num pasto ou numa arquitetura distribuída.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
