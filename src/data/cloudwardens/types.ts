export type CardType = "guardian" | "anomaly" | "sigil";

export type CloudDomain =
  | "cloud-concepts"  // Domínio 1: Conceitos de Nuvem
  | "security"        // Domínio 2: Segurança e Conformidade
  | "technology"      // Domínio 3: Tecnologia e Serviços Principais
  | "billing";        // Domínio 4: Faturamento, Custos e Suporte

export type CardRarity = "common" | "rare" | "epic" | "legendary";

export type CardFunctionalTag =
  | "compute"
  | "storage"
  | "database"
  | "security"
  | "networking"
  | "edge"
  | "serverless"
  | "messaging"
  | "finops";

export interface Card {
  id: string;
  name: string; // Nome autoral da fantasia medieval
  awsService: string; // Serviço técnico oficial da AWS (texto puro nominativo)
  serviceCategory: string; // ex: Armazenamento, Computação, Mensageria
  domain: CloudDomain;
  type: CardType;
  rarity: CardRarity;
  power: number; // Poder de ação / mitigação
  defense: number; // Resiliência / durabilidade
  energyCost: number; // Custo de Unidades de Éter (1 a 5)
  flavorText: string; // Narrativa imersiva no universo Cloudwardens
  technicalExplanation: string; // Conceito real de engenharia
  examTip: string; // Dica quente para a certificação AWS Cloud Practitioner (CLF-C02)
  weakness?: string; // Para anomalias: qual arquitetura a neutraliza
  counters?: string[]; // IDs de anomalias que esta carta derrota com dano crítico
  runeSymbol: string; // Glifo rúnico
  level?: number; // Nível da carta: 1 (base), 2 (forjada), 3 (mestre holográfica)
  synergyTags?: CardFunctionalTag[]; // Tags de sinergia
  artPrompt?: string; // Prompt refinado em inglês para geração de arte em IA
  imageUrl?: string; // URL da ilustração oficial
}

export interface CardSynergy {
  id: string;
  name: string;
  requiredTags: CardFunctionalTag[];
  description: string;
  bonusPower: number;
  bonusDefense: number;
  bonusEther?: number;
  healFortress?: number;
}

export interface SavedDeck {
  id: string;
  slotIndex: 1 | 2 | 3;
  name: string;
  cardIds: string[]; // 8 a 10 cartas
}

export interface BoosterPack {
  id: string;
  name: string;
  description: string;
  cardsCount: number;
  guaranteedRarity?: CardRarity;
  isFoilBooster?: boolean;
}

export interface DailyStreakState {
  currentStreakDays: number;
  lastClaimedDate: string | null;
  canClaimToday: boolean;
}

export interface CloudwardenUser {
  id: string;
  name: string;
  email: string;
  faction: "amber" | "silicon" | "vortex";
  cloudFocus: "aws" | "azure" | "gcp" | "multicloud";
  guardianTitle: string;
  createdAt: string;
}

export interface PlayerGameState {
  user: CloudwardenUser | null;
  unlockedCardIds: string[];
  savedDecks: SavedDeck[];
  activeDeckId: string;
  unopenedPacks: BoosterPack[];
  etherCurrency: number;
  dailyStreak: DailyStreakState;
  isTutorialCompleted: boolean;
}

export interface WeeklyEventChallenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  allowedTags?: CardFunctionalTag[];
  forbiddenTags?: CardFunctionalTag[];
  maxTotalEtherCost?: number;
  rewardPack: BoosterPack;
  rewardEther: number;
  targetAnomalyId: string;
  activeUntil: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  explanation?: string; // Explicação no estilo Stéphane Maarek de por que esta opção está certa ou errada
}

export interface ExamQuestion {
  id: string;
  domain: CloudDomain;
  relatedCardId?: string; // Carta concedida como recompensa ao acertar
  difficulty: "intro" | "standard" | "advanced";
  questionText: string; // Cenário real no formato da prova da AWS
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string; // Justificativa geral do conceito
  examReference: string; // Referência ao domínio da prova CLF-C02
  docsUrl?: string; // Link direto para a documentação técnica oficial da AWS
}

export interface QuestTrial {
  id: string;
  title: string;
  chapter: string;
  description: string;
  targetAnomalyId: string;
  rewardCardId: string;
  questionIds: string[];
}

export interface CareerTrackNode {
  id: string;
  order: number;
  title: string;
  category: CardFunctionalTag;
  awsService: string;
  storyLore: string;
  technicalConcept: string;
  examQuestionIds: string[];
  rewardCardId: string;
  targetAnomalyId: string;
}

export interface CareerTrack {
  id: string;
  provider: "aws" | "azure" | "gcp" | "multicloud";
  examCode: string;
  title: string;
  level: "foundational" | "associate" | "deep-dive";
  description: string;
  nodes: CareerTrackNode[];
}
