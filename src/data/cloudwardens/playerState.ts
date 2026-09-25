import { CLOUDWARDENS_CARDS } from "./cards";
import type { BoosterPack, Card, CardRarity, PlayerGameState } from "./types";

const STORAGE_KEY = "cloudwardens_player_save_v1";

export const STARTER_CARD_IDS = [
  "guardian-ec2",
  "guardian-s3",
  "guardian-iam",
  "guardian-cloudfront",
];

export const INITIAL_BOOTER_PACKS: BoosterPack[] = [
  {
    id: "pack-welcome-guild",
    name: "Booster de Boas-Vindas da Guilda",
    description: "Contém 3 cartas de guardiões ou anomalias com chances de itens raros.",
    cardsCount: 3,
    guaranteedRarity: "rare",
  },
];

export const DEFAULT_PLAYER_STATE: PlayerGameState = {
  unlockedCardIds: STARTER_CARD_IDS,
  savedDecks: [
    {
      id: "deck-slot-1",
      slotIndex: 1,
      name: "Bastião Geral da Nuvem",
      cardIds: STARTER_CARD_IDS,
    },
    {
      id: "deck-slot-2",
      slotIndex: 2,
      name: "Protocolo Serverless & FaaS",
      cardIds: ["guardian-lambda", "guardian-dynamodb", "guardian-sqs"],
    },
    {
      id: "deck-slot-3",
      slotIndex: 3,
      name: "Segurança & Alta Borda",
      cardIds: ["guardian-iam", "guardian-cloudfront", "guardian-s3"],
    },
  ],
  activeDeckId: "deck-slot-1",
  unopenedPacks: INITIAL_BOOTER_PACKS,
  etherCurrency: 150,
  dailyStreak: {
    currentStreakDays: 1,
    lastClaimedDate: null,
    canClaimToday: true,
  },
  isTutorialCompleted: false,
};

export function loadPlayerState(): PlayerGameState {
  if (typeof window === "undefined") return DEFAULT_PLAYER_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PLAYER_STATE;
    const parsed = JSON.parse(raw) as Partial<PlayerGameState>;
    return {
      ...DEFAULT_PLAYER_STATE,
      ...parsed,
      unlockedCardIds: parsed.unlockedCardIds || DEFAULT_PLAYER_STATE.unlockedCardIds,
      savedDecks: parsed.savedDecks || DEFAULT_PLAYER_STATE.savedDecks,
    };
  } catch {
    return DEFAULT_PLAYER_STATE;
  }
}

export function savePlayerState(state: PlayerGameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Falha ao salvar estado do jogador:", err);
  }
}

/**
 * Sorteia cartas para a abertura de um Booster Pack baseado em probabilidades de raridade
 */
export function openBoosterPack(pack: BoosterPack): Card[] {
  const allCards = CLOUDWARDENS_CARDS.filter((c) => c.type === "guardian");
  const drawnCards: Card[] = [];

  for (let i = 0; i < pack.cardsCount; i++) {
    // Se for a última carta e o pacote tiver garantia de raridade
    const isGuaranteed = i === pack.cardsCount - 1 && pack.guaranteedRarity;
    
    let targetRarity: CardRarity = "common";
    if (isGuaranteed) {
      targetRarity = pack.guaranteedRarity || "rare";
    } else {
      const roll = Math.random() * 100;
      if (roll <= 4) targetRarity = "legendary";
      else if (roll <= 16) targetRarity = "epic";
      else if (roll <= 42) targetRarity = "rare";
      else targetRarity = "common";
    }

    const pool = allCards.filter((c) => c.rarity === targetRarity);
    const candidate = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : allCards[0];
    drawnCards.push(candidate);
  }

  return drawnCards;
}
