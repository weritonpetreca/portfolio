import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Seo } from "../../components/layout/Seo.tsx";
import {
  CloudwardensHeader,
  type CloudwardensTab,
} from "./components/CloudwardensHeader";
import { CareerMode } from "./components/CareerMode";
import { DeckBuilder } from "./components/DeckBuilder";
import { DeckShowcase } from "./components/DeckShowcase";
import { DuelArena } from "./components/DuelArena";
import { OracleSimulado } from "./components/OracleSimulado";
import { BoosterOpeningModal } from "./components/BoosterOpeningModal";
import { TutorialModal } from "./components/TutorialModal";
import {
  loadPlayerState,
  savePlayerState,
  STARTER_CARD_IDS,
} from "../../data/cloudwardens/playerState";
import type { PlayerGameState } from "../../data/cloudwardens/types";

export function WitcherRealmPage() {
  const [activeTab, setActiveTab] = useState<CloudwardensTab>("career");
  const [playerState, setPlayerStateInternal] = useState<PlayerGameState>(loadPlayerState);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Sincroniza e persiste alterações no localStorage
  const handleUpdatePlayerState = (updater: (prev: PlayerGameState) => PlayerGameState) => {
    setPlayerStateInternal((prev) => {
      const next = updater(prev);
      savePlayerState(next);
      return next;
    });
  };

  // Abre tutorial na primeira vez se não tiver sido concluído
  useEffect(() => {
    if (!playerState.isTutorialCompleted && playerState.unlockedCardIds.length <= STARTER_CARD_IDS.length) {
      const timer = setTimeout(() => setIsTutorialOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [playerState.isTutorialCompleted, playerState.unlockedCardIds.length]);

  const handleCompleteTutorial = () => {
    handleUpdatePlayerState((prev) => ({
      ...prev,
      isTutorialCompleted: true,
      etherCurrency: prev.etherCurrency + 150,
      unlockedCardIds: Array.from(new Set([...prev.unlockedCardIds, ...STARTER_CARD_IDS])),
    }));
    setIsTutorialOpen(false);
  };

  return (
    <div className="min-h-screen bg-forge-950 text-bone selection:bg-amber-500/30 selection:text-amber-200">
      <Seo
        title="Cloudwardens — Skill Builder & Jogo de Cartas de Nuvem AWS"
        description="Aprenda arquitetura de nuvem AWS e estude para certificações com trilhas de carreira, deckbuilder tático, abertura de boosters e simulados interativos no universo Cloudwardens."
        path="/witcher-realm"
        favicon="/witcher-favicon.ico"
      />

      {/* Header com Navegação e Recursos */}
      <CloudwardensHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        etherBalance={playerState.etherCurrency}
        unopenedPacksCount={playerState.unopenedPacks.length}
      />

      {/* Hero Banner Imersivo */}
      <section className="relative overflow-hidden border-b border-forge-700/60 bg-gradient-to-b from-forge-900 via-forge-950 to-forge-950 py-10 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/40 bg-amber-950/60 px-3.5 py-1 text-xs font-mono text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>UNIVERSO ORIGINAL · APRENDIZADO GAMIFICADO DE CLOUD</span>
          </div>

          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight text-bone">
            O Domínio de Âmbar: <span className="text-forged-gold">Cloudwardens</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
            Evolua no <strong>Modo Carreira</strong> através de trilhas profundas por serviço, monte seu baralho no <strong>Deckbuilder</strong>, abra <strong>Boosters</strong> com cartas raras e domine as certificações da AWS com simulados comentados.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs text-steel">
            <span className="rounded border border-forge-700 bg-forge-900/80 px-2.5 py-1">
              🧭 Modo Carreira & Skill Tree
            </span>
            <span className="rounded border border-forge-700 bg-forge-900/80 px-2.5 py-1">
              🛠️ Deckbuilder com 3 Slots
            </span>
            <span className="rounded border border-forge-700 bg-forge-900/80 px-2.5 py-1">
              🎁 Boosters & Recompensas Diárias
            </span>
            <span className="rounded border border-forge-700 bg-forge-900/80 px-2.5 py-1">
              ⚔️ Arena de Resolução de Incidentes
            </span>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal Dinâmico por Aba */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {activeTab === "career" && (
          <CareerMode
            playerState={playerState}
            onSelectBattleAnomaly={(_id) => setActiveTab("arena")}
            onOpenDeckBuilder={() => setActiveTab("deckbuilder")}
          />
        )}
        {activeTab === "deckbuilder" && (
          <DeckBuilder
            playerState={playerState}
            onUpdatePlayerState={handleUpdatePlayerState}
          />
        )}
        {activeTab === "arena" && <DuelArena />}
        {activeTab === "boosters" && (
          <BoosterOpeningModal
            playerState={playerState}
            onUpdatePlayerState={handleUpdatePlayerState}
          />
        )}
        {activeTab === "deck" && <DeckShowcase />}
        {activeTab === "oracle" && <OracleSimulado />}
      </main>

      {/* Modal de Tutorial Interativo do Aprendiz */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onCompleteTutorial={handleCompleteTutorial}
        playerState={playerState}
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
