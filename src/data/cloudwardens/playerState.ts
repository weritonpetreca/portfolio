import { CLOUDWARDENS_CARDS } from "./cards";
import type { BoosterPack, Card, CardRarity, CloudwardenUser, PlayerGameState } from "./types";

const STORAGE_KEY = "cloudwardens_player_save_v1";
const ACCOUNTS_STORAGE_KEY = "cloudwardens_registered_accounts_v1";

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
  user: null,
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
    currentStreakDays: 0,
    lastClaimedDate: null,
    canClaimToday: true,
  },
  isTutorialCompleted: false,
  anomalyMastery: {},
};

export function getRegisteredAccounts(): CloudwardenUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function registerAccount(user: Omit<CloudwardenUser, "id" | "createdAt">): CloudwardenUser {
  const accounts = getRegisteredAccounts();
  const existing = accounts.find((a) => a.email.toLowerCase() === user.email.toLowerCase());
  if (existing) {
    throw new Error("Este e-mail já está registrado na guilda. Faça login ou utilize outro endereço.");
  }
  const newUser: CloudwardenUser = {
    ...user,
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  accounts.push(newUser);
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  return newUser;
}

export function authenticateAccount(email: string): CloudwardenUser {
  const accounts = getRegisteredAccounts();
  const found = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!found) {
    throw new Error("Guardião não encontrado com este e-mail. Verifique a digitação ou forje seu registro.");
  }
  return found;
}

export function loadPlayerState(): PlayerGameState {
  if (typeof window === "undefined") return DEFAULT_PLAYER_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PLAYER_STATE;
    const parsed = JSON.parse(raw) as Partial<PlayerGameState>;
    return {
      ...DEFAULT_PLAYER_STATE,
      ...parsed,
      user: parsed.user ?? null,
      unlockedCardIds: parsed.unlockedCardIds || DEFAULT_PLAYER_STATE.unlockedCardIds,
      savedDecks: parsed.savedDecks || DEFAULT_PLAYER_STATE.savedDecks,
      anomalyMastery: parsed.anomalyMastery || {},
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
