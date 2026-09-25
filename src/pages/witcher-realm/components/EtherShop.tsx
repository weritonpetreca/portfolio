import { useState } from "react";
import type { BoosterPack, PlayerGameState } from "../../../data/cloudwardens/types";
import type { CloudwardensTab } from "./CloudwardensHeader";

interface EtherShopProps {
  playerState: PlayerGameState;
  onUpdatePlayerState: (updater: (prev: PlayerGameState) => PlayerGameState) => void;
  onNavigate: (tab: CloudwardensTab) => void;
}

interface ShopItem {
  id: string;
  type: "booster" | "pass" | "cosmetic";
  title: string;
  category: string;
  icon: string;
  cost: number;
  description: string;
  benefits: string[];
  packData?: {
    cardsCount: number;
    guaranteedRarity: "rare" | "epic";
  };
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "shop-pack-standard",
    type: "booster",
    title: "Booster de Recrutamento",
    category: "Pacote de Cartas",
    icon: "📦",
    cost: 100,
    description: "Pacote padrão forjado pelo conselho com 3 cartas de infraestrutura fundamental com chances de cartas raras.",
    benefits: ["3 cartas aleatórias", "Chances de cartas Raras e Épicas", "Expande seu deck tático"],
    packData: {
      cardsCount: 3,
      guaranteedRarity: "rare",
    },
  },
  {
    id: "shop-pack-guild-rare",
    type: "booster",
    title: "Booster de Resiliência da Guilda",
    category: "Pacote de Cartas",
    icon: "💎",
    cost: 200,
    description: "Concentrado de éter com serviços de alta disponibilidade (VPC, RDS Multi-AZ, CloudFront) garantindo ao menos 1 carta Rara.",
    benefits: ["3 cartas de alto impacto", "1x RARA garantida", "Excelente contra picos de tráfego"],
    packData: {
      cardsCount: 3,
      guaranteedRarity: "rare",
    },
  },
  {
    id: "shop-pack-epic-vault",
    type: "booster",
    title: "Cofre de Arquitetura Épico",
    category: "Cofre Mítico",
    icon: "👑",
    cost: 450,
    description: "O suprassumo da engenharia. Forjado com conhecimento avançado da AWS, contendo 4 cartas e 1 Épica garantida.",
    benefits: ["4 cartas de elite", "1x ÉPICA garantida", "Chances de Guardiões Lendários"],
    packData: {
      cardsCount: 4,
      guaranteedRarity: "epic",
    },
  },
  {
    id: "shop-pass-saa",
    type: "pass",
    title: "Passe de Simulado SAA-C03",
    category: "Certificação Avançada",
    icon: "📜",
    cost: 150,
    description: "Desbloqueia cenários táticos aprofundados de Solutions Architect Associate com justificativas estilo Stéphane Maarek.",
    benefits: ["Acesso a questões SAA-C03", "Explicações técnicas aprofundadas", "Maior ganho de Éter por acerto"],
  },
  {
    id: "shop-cosmetic-holofoil",
    type: "cosmetic",
    title: "Encantamento Holofoil Cósmico",
    category: "Cosmético Visual",
    icon: "✨",
    cost: 300,
    description: "Aura visual reflexiva para as cartas da sua coleção e destaque holográfico ao mobilizar guardiões no combate.",
    benefits: ["Efeito de brilho prisma nas cartas 3D", "Insígnia dourada na arena", "Item puramente estético"],
  },
];

export function EtherShop({
  playerState,
  onUpdatePlayerState,
  onNavigate,
}: EtherShopProps) {
  const [purchaseFeedback, setPurchaseFeedback] = useState<string | null>(null);

  const handlePurchase = (item: ShopItem) => {
    if (playerState.etherCurrency < item.cost) return;

    if (item.type === "booster" && item.packData) {
      const newPack: BoosterPack = {
        id: `pack-shop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: item.title,
        description: item.description,
        cardsCount: item.packData.cardsCount,
        guaranteedRarity: item.packData.guaranteedRarity,
      };

      onUpdatePlayerState((prev) => ({
        ...prev,
        etherCurrency: prev.etherCurrency - item.cost,
        unopenedPacks: [...prev.unopenedPacks, newPack],
      }));

      setPurchaseFeedback(
        `🎉 ${item.title} adquirido com sucesso! O pacote já está disponível no seu Cofre de Boosters.`
      );
    } else {
      onUpdatePlayerState((prev) => ({
        ...prev,
        etherCurrency: prev.etherCurrency - item.cost,
      }));

      setPurchaseFeedback(
        `✨ ${item.title} desbloqueado e ativado no seu perfil com sucesso!`
      );
    }

    setTimeout(() => {
      setPurchaseFeedback(null);
    }, 6000);
  };

  return (
    <div className="space-y-8 font-mono animate-fadeIn">
      {/* Banner Principal do Mercado */}
      <div className="rounded-2xl border-2 border-amber-500/70 bg-gradient-to-r from-forge-900 via-forge-950 to-black p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/50 bg-amber-950/60 px-3 py-0.5 text-xs text-amber-300 font-bold mb-2">
              <span>🛒</span>
              <span>MERCADO DA GUILDA · ECONOMIA DO REINO</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone">
              O Mercado de Éter
            </h2>
            <p className="mt-1 text-xs text-steel max-w-xl leading-relaxed">
              Utilize o Éter acumulado em seus estudos diários, provações de simulados e vitórias contra as Anomalias da Arena para forjar novos pacotes e aprimoramentos.
            </p>
          </div>

          {/* Saldo de Éter em Destaque */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="rounded-xl border-2 border-amber-500 bg-amber-950/60 p-4 text-center shadow-[0_0_20px_rgba(245,158,11,0.25)] min-w-[180px]">
              <span className="block text-[10px] uppercase tracking-wider text-amber-400 font-bold">
                Seu Saldo Disponível
              </span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-3xl font-bold text-amber-300">⚡ {playerState.etherCurrency}</span>
              </div>
              <span className="text-[10px] text-steel">Unidades de Éter</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("boosters")}
              className="cursor-pointer rounded-xl border border-purple-500/60 bg-purple-950/40 hover:bg-purple-900/50 p-4 text-center transition-all min-w-[150px]"
            >
              <span className="block text-[10px] uppercase tracking-wider text-purple-300 font-bold">
                Cofre de Boosters
              </span>
              <div className="text-2xl font-bold text-purple-200 mt-1">
                📦 {playerState.unopenedPacks.length}
              </div>
              <span className="text-[10px] text-purple-400 underline block mt-0.5">
                Abrir Pacotes ➔
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerta de Feedback de Compra */}
      {purchaseFeedback && (
        <div className="p-4 rounded-xl border border-emerald-500/80 bg-emerald-950/80 text-emerald-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-fadeIn">
          <span>{purchaseFeedback}</span>
          <button
            type="button"
            onClick={() => onNavigate("boosters")}
            className="cursor-pointer rounded-md bg-emerald-500 px-4 py-1.5 text-black font-bold uppercase text-[11px] hover:bg-emerald-400 transition-colors shrink-0"
          >
            Ir ao Cofre Abrir ➔
          </button>
        </div>
      )}

      {/* Grade de Itens do Mercado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SHOP_ITEMS.map((item) => {
          const canAfford = playerState.etherCurrency >= item.cost;

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                canAfford
                  ? "border-forge-700 bg-forge-950/80 hover:border-amber-500/60 hover:shadow-xl"
                  : "border-forge-800/80 bg-black/40 opacity-75"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-500 block">
                        {item.category}
                      </span>
                      <h3 className="font-display text-base font-bold text-bone">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="rounded-md border border-amber-600/60 bg-amber-950/60 px-2.5 py-1 text-xs font-bold text-amber-300 shrink-0">
                    ⚡ {item.cost}
                  </span>
                </div>

                <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-1.5 mb-5 border-t border-forge-800/80 pt-3 text-[11px] text-steel">
                  {item.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-1.5">
                      <span className="text-emerald-400 text-xs">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!canAfford}
                onClick={() => handlePurchase(item)}
                className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow ${
                  canAfford
                    ? "bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    : "bg-forge-900 border border-forge-800 text-steel cursor-not-allowed"
                }`}
              >
                {canAfford ? `Adquirir por ${item.cost} Éter ➔` : `Éter Insuficiente (Falta ${item.cost - playerState.etherCurrency})`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
