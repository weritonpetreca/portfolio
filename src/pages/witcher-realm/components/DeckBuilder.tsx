import { useState } from "react";
import { CLOUDWARDENS_CARDS } from "../../../data/cloudwardens/cards";
import { CLOUDWARDENS_WEEKLY_EVENTS } from "../../../data/cloudwardens/events";
import type {
  Card,
  CardFunctionalTag,
  PlayerGameState,
  SavedDeck,
  WeeklyEventChallenge,
} from "../../../data/cloudwardens/types";
import { Card3D } from "./Card3D";

interface DeckBuilderProps {
  playerState: PlayerGameState;
  onUpdatePlayerState: (updater: (prev: PlayerGameState) => PlayerGameState) => void;
}

export function DeckBuilder({
  playerState,
  onUpdatePlayerState,
}: DeckBuilderProps) {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<1 | 2 | 3>(1);
  const [selectedTagFilter, setSelectedTagFilter] = useState<CardFunctionalTag | "all">("all");
  const [selectedEventCheck, setSelectedEventCheck] = useState<WeeklyEventChallenge | null>(null);

  const activeDeck: SavedDeck =
    playerState.savedDecks.find((d) => d.slotIndex === selectedSlotIndex) ||
    playerState.savedDecks[0];

  const deckCards: Card[] = activeDeck.cardIds
    .map((id) => CLOUDWARDENS_CARDS.find((c) => c.id === id))
    .filter(Boolean) as Card[];

  const unlockedCards: Card[] = CLOUDWARDENS_CARDS.filter(
    (c) => c.type === "guardian" && playerState.unlockedCardIds.includes(c.id)
  );

  const filteredCollection = unlockedCards.filter((card) => {
    if (selectedTagFilter === "all") return true;
    return card.synergyTags?.includes(selectedTagFilter);
  });

  const totalDeckEtherCost = deckCards.reduce((acc, c) => acc + c.energyCost, 0);

  // Validação de regras de deck
  const isDeckSizeValid = deckCards.length >= 4 && deckCards.length <= 10;

  // Validação contra evento semanal selecionado
  const eventValidation = selectedEventCheck
    ? (() => {
        if (
          selectedEventCheck.maxTotalEtherCost &&
          totalDeckEtherCost > selectedEventCheck.maxTotalEtherCost
        ) {
          return {
            valid: false,
            reason: `Custo total de Éter (${totalDeckEtherCost}) excede o teto permitido de ${selectedEventCheck.maxTotalEtherCost}.`,
          };
        }
        if (selectedEventCheck.allowedTags && selectedEventCheck.allowedTags.length > 0) {
          const invalidCard = deckCards.find(
            (c) => !c.synergyTags?.some((t) => selectedEventCheck.allowedTags?.includes(t))
          );
          if (invalidCard) {
            return {
              valid: false,
              reason: `${invalidCard.name} não possui as tags permitidas (${selectedEventCheck.allowedTags.join(", ")}).`,
            };
          }
        }
        return { valid: true, reason: "Deck 100% elegível para este evento semanal!" };
      })()
    : null;

  const handleSetActiveDeck = () => {
    onUpdatePlayerState((prev) => ({
      ...prev,
      activeDeckId: activeDeck.id,
    }));
  };

  const handleAddCardToDeck = (card: Card) => {
    if (deckCards.length >= 10) return;
    if (activeDeck.cardIds.includes(card.id)) return;

    onUpdatePlayerState((prev) => ({
      ...prev,
      savedDecks: prev.savedDecks.map((d) =>
        d.id === activeDeck.id ? { ...d, cardIds: [...d.cardIds, card.id] } : d
      ),
    }));
  };

  const handleRemoveCardFromDeck = (cardId: string) => {
    onUpdatePlayerState((prev) => ({
      ...prev,
      savedDecks: prev.savedDecks.map((d) =>
        d.id === activeDeck.id
          ? { ...d, cardIds: d.cardIds.filter((id) => id !== cardId) }
          : d
      ),
    }));
  };

  const handleRenameDeck = (newName: string) => {
    onUpdatePlayerState((prev) => ({
      ...prev,
      savedDecks: prev.savedDecks.map((d) =>
        d.id === activeDeck.id ? { ...d, name: newName } : d
      ),
    }));
  };

  return (
    <div className="space-y-8">
      
      {/* Seletor de Slots de Decks Salvos */}
      <div className="rounded-xl border border-forge-700/80 bg-gradient-to-r from-forge-900/90 via-forge-950/90 to-black p-5 shadow-xl font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
              <span>🛠️</span> OFICINA DO ARQUITETO · DECKBUILDER
            </span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-bone">
              Construção & Gestão de Decks
            </h3>
            <p className="mt-1 text-xs text-steel">
              Monte baralhos táticos de 4 a 10 cartas com base em tags e sinergias de nuvem.
            </p>
          </div>

          {/* Slots de Decks (1, 2 e 3) */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((slot) => {
              const isSelected = selectedSlotIndex === slot;
              const slotDeck = playerState.savedDecks.find((d) => d.slotIndex === slot);
              const isActiveInBattle = playerState.activeDeckId === slotDeck?.id;

              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlotIndex(slot as 1 | 2 | 3)}
                  className={`cursor-pointer rounded-lg border px-3.5 py-2 text-xs transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                      : "border-forge-800 bg-forge-950 text-steel hover:text-bone hover:border-forge-700"
                  }`}
                >
                  <span>Slot {slot}</span>
                  {isActiveInBattle && (
                    <span className="ml-1.5 rounded-full bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 text-[9px] border border-emerald-500/40">
                      Ativo ⚔️
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Barra de Propriedades do Deck Selecionado */}
        <div className="mt-5 pt-4 border-t border-forge-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-steel">Nome do Deck:</span>
            <input
              type="text"
              value={activeDeck.name}
              onChange={(e) => handleRenameDeck(e.target.value)}
              className="rounded border border-forge-700 bg-forge-900 px-2.5 py-1 text-bone focus:border-amber-400 focus:outline-hidden text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded border border-forge-700 bg-forge-950 px-2.5 py-1">
              Cartas: <strong className={isDeckSizeValid ? "text-amber-400" : "text-red-400"}>{deckCards.length} / 10</strong>
            </span>
            <span className="rounded border border-forge-700 bg-forge-950 px-2.5 py-1">
              Custo Total de Éter: <strong className="text-amber-300">{totalDeckEtherCost}</strong>
            </span>
            {playerState.activeDeckId !== activeDeck.id ? (
              <button
                type="button"
                onClick={handleSetActiveDeck}
                disabled={!isDeckSizeValid}
                className="rounded bg-amber-500 px-3.5 py-1 text-xs font-bold text-black hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Definir como Deck de Batalha Ativo ⚔️
              </button>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span>✓</span> Deck Ativo na Arena
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Verificador de Eventos Semanais & Restrição de Tags */}
      <div className="rounded-xl border border-forge-800 bg-forge-950/80 p-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">🏆 Testar Restrições de Evento:</span>
            <select
              value={selectedEventCheck?.id || ""}
              onChange={(e) => {
                const found = CLOUDWARDENS_WEEKLY_EVENTS.find((ev) => ev.id === e.target.value);
                setSelectedEventCheck(found || null);
              }}
              className="rounded border border-forge-700 bg-forge-900 px-2.5 py-1 text-bone text-xs cursor-pointer focus:outline-hidden"
            >
              <option value="">Selecione um evento para validar o deck...</option>
              {CLOUDWARDENS_WEEKLY_EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.subtitle})
                </option>
              ))}
            </select>
          </div>

          {eventValidation && (
            <div
              className={`rounded px-3 py-1 font-bold text-xs ${
                eventValidation.valid
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50"
                  : "bg-red-950/80 text-red-300 border border-red-500/50"
              }`}
            >
              {eventValidation.valid ? "✓ " : "✕ "}
              {eventValidation.reason}
            </div>
          )}
        </div>
      </div>

      {/* ÁREA 1: CARTAS NO DECK ATUAL */}
      <div>
        <div className="flex items-center justify-between font-mono text-xs mb-3">
          <span className="font-bold text-bone flex items-center gap-1.5">
            <span>🛡️</span> Cartas Integradas no Deck ({deckCards.length}):
          </span>
          <span className="text-steel text-[11px]">
            Clique em "Remover" para retirar uma carta do baralho
          </span>
        </div>

        {deckCards.length === 0 ? (
          <div className="rounded-xl border border-dashed border-forge-800 p-8 text-center font-mono text-xs text-steel">
            Nenhuma carta neste deck. Escolha cartas da sua biblioteca abaixo para adicioná-las!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {deckCards.map((card) => (
              <div key={card.id} className="relative group">
                <Card3D card={card} compact />
                <button
                  type="button"
                  onClick={() => handleRemoveCardFromDeck(card.id)}
                  className="absolute top-3 left-3 z-30 rounded bg-red-600/90 hover:bg-red-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white transition-colors cursor-pointer shadow-md"
                >
                  Remover ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ÁREA 2: BIBLIOTECA DE CARTAS DO JOGADOR (INVENTÁRIO) */}
      <div className="pt-6 border-t border-forge-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs mb-4">
          <div>
            <h4 className="font-display text-lg font-bold text-bone">
              Sua Coleção de Guardiões ({unlockedCards.length} desbloqueados)
            </h4>
            <p className="text-steel text-[11px]">
              Cartas adquiridas no tutorial, simulados ou abertura de pacotes.
            </p>
          </div>

          {/* Filtros por Tags Funcionais */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: "all", label: "Todas" },
                { id: "compute", label: "#compute" },
                { id: "storage", label: "#storage" },
                { id: "database", label: "#database" },
                { id: "security", label: "#security" },
                { id: "serverless", label: "#serverless" },
              ] as const
            ).map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setSelectedTagFilter(t.id)}
                className={`cursor-pointer rounded px-2.5 py-1 text-[11px] transition-colors ${
                  selectedTagFilter === t.id
                    ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 font-bold"
                    : "border border-forge-800 bg-forge-950 text-steel hover:text-bone"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCollection.map((card) => {
            const isAlreadyInDeck = activeDeck.cardIds.includes(card.id);
            const isDeckFull = deckCards.length >= 10;

            return (
              <div key={card.id} className="relative group flex flex-col items-center">
                <Card3D card={card} compact />
                <div className="mt-2 w-full px-2">
                  {isAlreadyInDeck ? (
                    <button
                      type="button"
                      disabled
                      className="w-full rounded border border-forge-800 bg-forge-900/60 py-1 text-center font-mono text-[10px] text-steel/60 cursor-not-allowed"
                    >
                      Já está no deck ✓
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isDeckFull}
                      onClick={() => handleAddCardToDeck(card)}
                      className="w-full cursor-pointer rounded border border-amber-600/50 bg-amber-950/40 hover:bg-amber-950/80 py-1 text-center font-mono text-[10px] font-bold text-amber-300 hover:border-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      + Adicionar ao Deck
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
