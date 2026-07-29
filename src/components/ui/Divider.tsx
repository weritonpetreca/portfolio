/**
 * Assinatura visual da persona profissional (substitui as linhas de
 * contorno topográfico do conceito anterior): um divisor ornamental
 * simples entre seções, no espírito de uma quebra de capítulo num
 * grimório ou de uma marca gravada em metal — deliberadamente geométrico
 * e original, sem reaproveitar nenhum símbolo de obra licenciada.
 */
export function Divider() {
  return (
    <div className="mx-auto flex max-w-3xl items-center gap-4 px-6" aria-hidden="true">
      <span className="h-px flex-1 bg-forge-700" />
      <span className="h-2 w-2 rotate-45 border border-ember" />
      <span className="h-px flex-1 bg-forge-700" />
    </div>
  );
}
