import type { ExamQuestion } from "../../../data/cloudwardens/types";

interface ExamExplanationViewProps {
  question: ExamQuestion;
  selectedOptionId: string | null;
  isCorrect: boolean;
  onTryAgain?: () => void;
}

export function ExamExplanationView({
  question,
  selectedOptionId,
  isCorrect,
  onTryAgain,
}: ExamExplanationViewProps) {
  return (
    <div
      className={`space-y-4 rounded-xl border p-4 sm:p-5 font-mono text-xs shadow-xl transition-all animate-fadeIn ${
        isCorrect
          ? "border-emerald-500/60 bg-emerald-950/30 text-emerald-100"
          : "border-red-500/60 bg-red-950/30 text-red-100"
      }`}
    >
      
      {/* 1. STATUS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold ${
              isCorrect ? "bg-emerald-500 text-black" : "bg-red-500 text-white"
            }`}
          >
            {isCorrect ? "✓" : "✕"}
          </span>
          <div>
            <h4 className="font-display text-sm sm:text-base font-bold text-bone">
              {isCorrect ? "Excelente! Resposta Correta" : "Resposta Incorreta — Momento de Aprendizado"}
            </h4>
            <p className="text-[11px] text-slate-300">
              {isCorrect
                ? `Você selecionou a opção ${selectedOptionId?.toUpperCase()} e dominou este cenário da AWS.`
                : `Você selecionou a opção ${selectedOptionId?.toUpperCase()}, mas a correta é a ${question.correctOptionId.toUpperCase()}.`}
            </p>
          </div>
        </div>

        {!isCorrect && onTryAgain && (
          <button
            type="button"
            onClick={onTryAgain}
            className="self-start sm:self-center cursor-pointer rounded border border-amber-500 bg-amber-500/20 px-3 py-1.5 text-amber-300 hover:bg-amber-500 hover:text-black transition-all font-bold text-xs"
          >
            Tentar Novamente ↺
          </button>
        )}
      </div>

      {/* 2. VISÃO GERAL DO CONCEITO ARQUITETURAL (CORE SUMMARY) */}
      <div className="rounded-lg border border-forge-700/60 bg-black/60 p-3.5 space-y-1">
        <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
          💡 JUSTIFICATIVA OFICIAL DA AWS & CONCEITO CENTRAL:
        </span>
        <p className="font-sans text-xs sm:text-[13px] text-slate-200 leading-relaxed">
          {question.explanation}
        </p>
      </div>

      {/* 3. ANÁLISE ALTERNATIVA POR ALTERNATIVA (STÉPHANE MAAREK / UDEMY STYLE) */}
      <div className="space-y-2.5">
        <span className="text-[10px] uppercase tracking-wider text-steel font-bold block">
          🔍 ANÁLISE DETALHADA DAS ALTERNATIVAS:
        </span>

        {question.options.map((opt) => {
          const isThisCorrect = opt.id === question.correctOptionId;
          const isThisSelected = opt.id === selectedOptionId;

          return (
            <div
              key={opt.id}
              className={`rounded-lg border p-3 text-xs transition-all ${
                isThisCorrect
                  ? "border-emerald-500/70 bg-emerald-950/40 text-emerald-100"
                  : isThisSelected
                  ? "border-red-500/70 bg-red-950/40 text-red-200"
                  : "border-forge-800 bg-forge-950/60 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-bold text-[10px] ${
                    isThisCorrect
                      ? "bg-emerald-500 text-black"
                      : isThisSelected
                      ? "bg-red-500 text-white"
                      : "bg-forge-800 text-steel"
                  }`}
                >
                  {isThisCorrect ? "✓" : opt.id.toUpperCase()}
                </span>
                <span className="font-bold">
                  Opção {opt.id.toUpperCase()}: {opt.text}
                </span>
                {isThisCorrect && (
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-300 border border-emerald-500/40">
                    CORRETA
                  </span>
                )}
                {!isThisCorrect && isThisSelected && (
                  <span className="rounded bg-red-500/20 px-1.5 py-0.2 text-[9px] font-bold text-red-300 border border-red-500/40">
                    SUA ESCOLHA (INCORRETA)
                  </span>
                )}
              </div>

              {opt.explanation ? (
                <p className="font-sans text-[11.5px] text-slate-300 pl-7 leading-relaxed">
                  {opt.explanation}
                </p>
              ) : isThisCorrect ? (
                <p className="font-sans text-[11.5px] text-emerald-300/90 pl-7 leading-relaxed">
                  Esta é a recomendação oficial da AWS para o cenário descrito. Atende aos requisitos funcionais e não-funcionais pelo menor custo e maior resiliência.
                </p>
              ) : (
                <p className="font-sans text-[11.5px] text-slate-400 pl-7 leading-relaxed">
                  Esta alternativa está incorreta porque não resolve o problema apresentado no enunciado ou se refere a um serviço com propósito arquitetural distinto.
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. LINK PARA DOCUMENTAÇÃO OFICIAL DA AWS & DOMÍNIO DO EXAME */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 text-[11px]">
        <div className="flex items-center gap-1.5 text-steel">
          <span>📜</span>
          <span>{question.examReference}</span>
        </div>

        {question.docsUrl && (
          <a
            href={question.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-500/50 hover:decoration-amber-300"
          >
            <span>📖 Documentação Técnica AWS ↗</span>
          </a>
        )}
      </div>

    </div>
  );
}
