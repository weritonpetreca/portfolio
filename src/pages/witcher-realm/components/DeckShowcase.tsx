import { useState } from "react";
import { CLOUDWARDENS_CARDS } from "../../../data/cloudwardens/cards";
import type { Card, CardType, CloudDomain } from "../../../data/cloudwardens/types";
import { Card3D } from "./Card3D";

export function DeckShowcase() {
  const [filterType, setFilterType] = useState<CardType | "all">("all");
  const [filterDomain, setFilterDomain] = useState<CloudDomain | "all">("all");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const filteredCards = CLOUDWARDENS_CARDS.filter((card) => {
    if (filterType !== "all" && card.type !== filterType) return false;
    if (filterDomain !== "all" && card.domain !== filterDomain) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Introdução & Lore da Coleção */}
      <div className="rounded-xl border border-forge-700/80 bg-gradient-to-r from-forge-900/90 via-forge-950/90 to-black p-6 shadow-xl text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1.5 justify-center sm:justify-start">
              <span>🏛️</span> DOMÍNIO DE ÂMBAR · BASE DE CARTAS
            </span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-bone">
              O Grimório do Guardião da Nuvem
            </h3>
            <p className="mt-2 font-sans text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore o arsenal de cartas de <strong>Guardiões</strong> (serviços gerenciados e arquiteturas resilientes da AWS) e o catálogo de <strong>Anomalias</strong> (gargalos e falhas de produção). Clique em <strong>"Explicar"</strong> em qualquer carta para revelar seu conceito arquitetural e a dica oficial para a prova de certificação <strong>AWS Cloud Practitioner (CLF-C02)</strong>.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 rounded-lg border border-forge-800 bg-black/60 px-4 py-3 font-mono text-center">
            <div>
              <span className="block text-2xl font-bold text-amber-400">
                {CLOUDWARDENS_CARDS.length}
              </span>
              <span className="text-[10px] text-steel uppercase tracking-wider">
                Cartas Base
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-forge-800 bg-forge-950/80 p-3 font-mono text-xs">
        
        {/* Filtro por Tipo */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-steel mr-1 font-bold">Tipo:</span>
          {(
            [
              { id: "all", label: "Todas" },
              { id: "guardian", label: "Guardiões (AWS)" },
              { id: "anomaly", label: "Anomalias (Falhas)" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilterType(t.id)}
              className={`cursor-pointer rounded px-2.5 py-1 transition-all ${
                filterType === t.id
                  ? "border border-amber-500/70 bg-amber-500/20 text-amber-300 font-bold"
                  : "text-steel hover:text-bone hover:bg-forge-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filtro por Domínio CLF-C02 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-steel mr-1 font-bold">Domínio:</span>
          {(
            [
              { id: "all", label: "Todos" },
              { id: "cloud-concepts", label: "Conceitos" },
              { id: "security", label: "Segurança" },
              { id: "technology", label: "Tecnologia" },
              { id: "billing", label: "Custos" },
            ] as const
          ).map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setFilterDomain(d.id)}
              className={`cursor-pointer rounded px-2 py-1 text-[11px] transition-all ${
                filterDomain === d.id
                  ? "border border-sky-500/70 bg-sky-500/20 text-sky-300 font-bold"
                  : "text-steel hover:text-bone hover:bg-forge-900"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid de Cartas 3D */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {filteredCards.map((card) => (
          <Card3D
            key={card.id}
            card={card}
            onSelect={(c) => setSelectedCard(c)}
          />
        ))}
      </div>

      {/* Modal de Inspeção Completa da Carta */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative z-10 max-w-lg w-full rounded-xl border-2 border-amber-600/70 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-6 text-bone shadow-2xl">
            <div className="flex items-start justify-between border-b border-forge-700/60 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest">
                  {selectedCard.awsService}
                </span>
                <h3 className="font-display text-xl font-bold text-bone">
                  {selectedCard.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="rounded border border-forge-700 bg-forge-900 px-2 py-1 font-mono text-xs text-steel hover:text-amber-400"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 font-sans text-xs sm:text-sm text-slate-300">
              <p className="font-serif italic text-amber-200/90 border-l-2 border-amber-500/60 pl-3">
                "{selectedCard.flavorText}"
              </p>

              <div>
                <h4 className="font-mono text-xs font-bold text-bone uppercase tracking-wider mb-1">
                  Arquitetura Real na Nuvem:
                </h4>
                <p className="leading-relaxed">
                  {selectedCard.technicalExplanation}
                </p>
              </div>

              <div className="rounded-lg border border-amber-600/50 bg-amber-950/40 p-3 text-amber-200">
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  🎯 Dica Chave para a Certificação (CLF-C02):
                </span>
                <p className="leading-relaxed text-xs">
                  {selectedCard.examTip}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-forge-700/60 pt-3 font-mono text-xs">
                <span>Poder de Ação: <strong className="text-ember">{selectedCard.power}</strong></span>
                <span>Resiliência: <strong className="text-sky-400">{selectedCard.defense}</strong></span>
                <span>Custo de Éter: <strong className="text-amber-400">{selectedCard.energyCost}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer de Marcas Registradas da AWS (Conformidade Legal) */}
      <div className="rounded-lg border border-forge-800 bg-black/40 p-4 text-center font-mono text-[11px] text-steel/70 leading-relaxed">
        <p>
          ⚖️ <strong>Aviso Legal & Propriedade Intelectual:</strong> <em>Cloudwardens</em> é um projeto educacional e independente de jogos táticos. Amazon Web Services, AWS, Amazon EC2, Amazon S3, AWS Lambda, Amazon DynamoDB, Amazon CloudFront e termos associados são marcas registradas da Amazon.com, Inc. ou de suas afiliadas nos EUA e/ou em outros países. Este projeto não é afiliado, patrocinado ou endossado pela Amazon Web Services, Inc.
        </p>
      </div>

    </div>
  );
}
