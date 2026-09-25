import { useState } from "react";
import { Link } from "react-router";
import { Seo } from "../../components/layout/Seo.tsx";
import {
  CloudwardensHeader,
  type CloudwardensTab,
} from "./components/CloudwardensHeader";
import { GameIntroduction } from "./components/GameIntroduction";
import { CareerMode } from "./components/CareerMode";
import { DeckBuilder } from "./components/DeckBuilder";
import { DeckShowcase } from "./components/DeckShowcase";
import { DuelArena } from "./components/DuelArena";
import { OracleSimulado } from "./components/OracleSimulado";
import { BoosterOpeningModal } from "./components/BoosterOpeningModal";
import { TutorialModal } from "./components/TutorialModal";
import { AuthModal } from "./components/AuthModal";
import { EtherShop } from "./components/EtherShop";
import { UserProfileView } from "./components/UserProfileView";
import {
  loadPlayerState,
  savePlayerState,
  STARTER_CARD_IDS,
} from "../../data/cloudwardens/playerState";
import type { PlayerGameState } from "../../data/cloudwardens/types";

export function WitcherRealmPage() {
  const [activeTab, setActiveTab] = useState<CloudwardensTab>("intro");
  const [playerState, setPlayerStateInternal] = useState<PlayerGameState>(loadPlayerState);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sincroniza e persiste alterações no localStorage
  const handleUpdatePlayerState = (updater: (prev: PlayerGameState) => PlayerGameState) => {
    setPlayerStateInternal((prev) => {
      const next = updater(prev);
      savePlayerState(next);
      return next;
    });
  };

  const handleCompleteTutorial = () => {
    if (playerState.isTutorialCompleted) {
      setActiveTab("intro");
      return;
    }
    handleUpdatePlayerState((prev) => {
      if (prev.isTutorialCompleted) return prev;
      return {
        ...prev,
        isTutorialCompleted: true,
        etherCurrency: prev.etherCurrency + 150,
        unopenedPacks: [
          ...prev.unopenedPacks,
          {
            id: `pack-welcome-guild-${Date.now()}`,
            name: "Booster de Boas-Vindas da Guilda",
            description: "Contém 3 cartas de guardiões ou anomalias com chances de itens raros.",
            cardsCount: 3,
            guaranteedRarity: "rare",
          },
        ],
        unlockedCardIds: Array.from(new Set([...prev.unlockedCardIds, ...STARTER_CARD_IDS])),
      };
    });
    setActiveTab(playerState.user ? "profile" : "intro");
  };

  return (
    <div className="min-h-screen bg-forge-950 text-bone selection:bg-amber-500/30 selection:text-amber-200">
      <Seo
        title="Cloudwardens — Jogo Tático e Simulador de Nuvem AWS"
        description="Aprenda arquitetura de nuvem AWS e estude para certificações com trilhas de carreira, deckbuilder tático, abertura de boosters e simulados interativos no universo Cloudwardens."
        path="/witcher-realm"
        favicon="/witcher-favicon.ico"
      />

      {/* Header com Navegação e Recursos Despoluídos */}
      <CloudwardensHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTutorial={() => {
          if (!playerState.isTutorialCompleted) {
            setActiveTab("tutorial");
          }
        }}
        user={playerState.user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          handleUpdatePlayerState((prev) => ({ ...prev, user: null }));
          if (activeTab === "profile") setActiveTab("intro");
        }}
        etherBalance={playerState.etherCurrency}
        unopenedPacksCount={playerState.unopenedPacks.length}
        isTutorialCompleted={playerState.isTutorialCompleted}
      />

      {/* Conteúdo Principal Dinâmico por Página Dedicada */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {activeTab === "intro" && (
          <GameIntroduction
            playerState={playerState}
            onNavigate={setActiveTab}
            onOpenTutorial={() => {
              if (!playerState.isTutorialCompleted) {
                setActiveTab("tutorial");
              }
            }}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
        {activeTab === "profile" && (
          <UserProfileView
            playerState={playerState}
            onNavigate={setActiveTab}
            onLogout={() => {
              handleUpdatePlayerState((prev) => ({ ...prev, user: null }));
              setActiveTab("intro");
            }}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
        {activeTab === "shop" && (
          <EtherShop
            playerState={playerState}
            onUpdatePlayerState={handleUpdatePlayerState}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === "tutorial" && !playerState.isTutorialCompleted && (
          <TutorialModal
            isOpen={true}
            onClose={() => setActiveTab("intro")}
            onCompleteTutorial={handleCompleteTutorial}
            playerState={playerState}
          />
        )}
        {activeTab === "career" && (
          <CareerMode
            playerState={playerState}
            onSelectBattleAnomaly={(_id) => setActiveTab("arena")}
            onOpenDeckBuilder={() => setActiveTab("deckbuilder")}
            onRequestAuth={() => setIsAuthModalOpen(true)}
          />
        )}
        {activeTab === "deckbuilder" && (
          <DeckBuilder
            playerState={playerState}
            onUpdatePlayerState={handleUpdatePlayerState}
          />
        )}
        {activeTab === "arena" && (
          <DuelArena
            playerState={playerState}
            onUpdatePlayerState={handleUpdatePlayerState}
          />
        )}
        {activeTab === "boosters" && (
          <BoosterOpeningModal
            playerState={playerState}
            onUpdatePlayerState={handleUpdatePlayerState}
          />
        )}
        {activeTab === "deck" && <DeckShowcase />}
        {activeTab === "oracle" && <OracleSimulado />}
      </main>

      {/* Modal de Autenticação / Cadastro de Guardião */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          handleUpdatePlayerState((prev) => ({
            ...prev,
            user,
          }));
          setActiveTab("profile");
        }}
      />

      {/* Rodapé do Universo & Conformidade */}
      <footer className="mt-20 border-t border-forge-800 bg-black/80 py-10 px-4 sm:px-6 font-mono text-xs text-steel">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-bone">
              CLOUDWARDENS · Criado por Weriton Petreca
            </p>
            <p className="mt-1 max-w-xl text-[11px] text-steel/80">
              Projeto autoral e independente que combina design dark fantasy, mecânicas táticas de cartas e pedagogia imersiva para formação e certificação de engenheiros de nuvem.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("career")}
              className="hover:text-amber-400 cursor-pointer"
            >
              Carreira
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab("deckbuilder")}
              className="hover:text-amber-400 cursor-pointer"
            >
              Decks
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab("arena")}
              className="hover:text-amber-400 cursor-pointer"
            >
              Arena
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab("boosters")}
              className="hover:text-amber-400 cursor-pointer"
            >
              Boosters
            </button>
            <span>•</span>
            <Link
              to="/"
              className="text-amber-500 hover:text-amber-400 font-bold"
            >
              Voltar ao Portfólio Profissional →
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-6xl mt-6 pt-6 border-t border-forge-800/60 text-[10px] text-steel/60 text-center leading-relaxed">
          <p>
            <strong>Aviso de Propriedade Intelectual & Fair Use:</strong> Cloudwardens é uma criação original e independente. Amazon Web Services, AWS, Amazon S3, AWS Lambda, Amazon EC2, Amazon DynamoDB, Amazon CloudFront e AWS IAM são marcas registradas da Amazon.com, Inc. ou de suas afiliadas. O uso desses termos ocorre sob uso nominativo estritamente para fins educacionais de preparação para exames.
          </p>
        </div>
      </footer>
    </div>
  );
}
