import type { CloudwardensTab } from "./CloudwardensHeader";
import type { PlayerGameState } from "../../../data/cloudwardens/types";

interface GameIntroductionProps {
  playerState: PlayerGameState;
  onNavigate: (tab: CloudwardensTab) => void;
  onOpenTutorial: () => void;
}

export function GameIntroduction({
  playerState,
  onNavigate,
  onOpenTutorial,
}: GameIntroductionProps) {
  const unlockedCount = playerState.unlockedCardIds.length;
  const unopenedPacksCount = playerState.unopenedPacks.length;

  return (
    <div className="space-y-12">
      {/* 1. HERO ÉPICO & PROPOSTA PEDAGÓGICA */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-6 sm:p-12 text-center shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.15)] font-mono">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.15),transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/40 bg-amber-950/70 px-4 py-1.5 text-xs text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold tracking-widest uppercase">
              UNIVERSO ORIGINAL · APRENDIZADO TÁTICO & GAMIFICADO
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-bone leading-tight">
            O Domínio de Âmbar: <br className="hidden sm:inline" />
            <span className="text-forged-gold">Cloudwardens</span>
          </h2>

          <p className="mx-auto max-w-2xl font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
            Aprenda engenharia e arquitetura de nuvem <strong>AWS</strong> de forma prática e memorável. 
            Transformamos os conceitos de data centers, alta disponibilidade e certificações oficiais em um 
            <strong> RPG tático com cartas</strong>, trilhas guiadas por serviço e simulados de exame.
          </p>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => onNavigate("career")}
              className="cursor-pointer rounded-lg border border-amber-400 bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3.5 text-black shadow-lg transition-all duration-200 hover:from-amber-500 hover:to-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-105"
            >
              Iniciar Modo Carreira ➔
            </button>

            <button
              type="button"
              onClick={onOpenTutorial}
              className="cursor-pointer rounded-lg border border-forge-700 bg-forge-900/90 px-5 py-3.5 text-amber-300 hover:border-amber-500/80 hover:bg-forge-800 transition-all hover:scale-105"
            >
              📜 Guia do Aprendiz (Tutorial)
            </button>
          </div>
        </div>
      </section>

      {/* 2. PAINEL DE STATUS RÁPIDO DO JOGADOR */}
      <section className="rounded-xl border border-forge-800 bg-black/60 p-5 sm:p-6 shadow-xl font-mono">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-amber-500/60 bg-amber-950/60 text-3xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              🛡️
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                SEU REGISTRO NA GUILDA
              </span>
              <h3 className="text-base sm:text-lg font-bold text-bone">
                {playerState.isTutorialCompleted ? "Cloudwarden Formado" : "Aprendiz de Nuvem"}
              </h3>
              <p className="text-xs text-steel">
                {unlockedCount} cartas ativas no grimório · Nível de Acesso AWS Fundamentos
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 rounded-lg border border-amber-600/40 bg-amber-950/40 px-3.5 py-2 text-amber-300">
              <span>⚡</span>
              <span>{playerState.etherCurrency} Éter</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-purple-600/40 bg-purple-950/40 px-3.5 py-2 text-purple-300">
              <span>📦</span>
              <span>{unopenedPacksCount} {unopenedPacksCount === 1 ? "Pacote" : "Pacotes"}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-emerald-600/40 bg-emerald-950/40 px-3.5 py-2 text-emerald-300">
              <span>🔥</span>
              <span>Streak: {playerState.dailyStreak.currentStreakDays}d</span>
            </div>

            {unopenedPacksCount > 0 && (
              <button
                type="button"
                onClick={() => onNavigate("boosters")}
                className="cursor-pointer rounded-lg border border-amber-400 bg-amber-500 px-4 py-2 text-black hover:bg-amber-400 transition-colors animate-pulse"
              >
                Abrir Pacotes ➔
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. OS 5 PILARES DO CLOUDWARDENS (PORTAIS ESPECÍFICOS) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
            ARQUITETURA DA PLATAFORMA
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-bone">
            O que você encontrará no Cloudwardens
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-300">
            Cada módulo foi arquitetado para unir entretenimento tático e aprendizado formal de engenharia de software na nuvem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Modo Carreira */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-forge-800 bg-gradient-to-b from-forge-900/90 to-forge-950/90 p-6 shadow-xl transition-all duration-300 hover:border-amber-500/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/50 bg-amber-950/60 text-xl">
                  🧭
                </span>
                <span className="font-mono text-[10px] rounded border border-forge-700 bg-forge-950 px-2 py-0.5 text-steel">
                  SKILL TREE
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-bone group-hover:text-amber-300 transition-colors">
                Modo Carreira & Trilhas
              </h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Navegue pela árvore de habilidades oficial: Fundamentos de Nuvem, Modelos de Responsabilidade Compartilhada, e Deep Dives de Compute (EC2), Storage (S3), Database (RDS) e Segurança (IAM).
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate("career")}
                className="w-full cursor-pointer rounded-lg border border-amber-600/50 bg-amber-950/40 py-2.5 font-mono text-xs font-bold text-amber-300 hover:border-amber-400 hover:bg-amber-500/20 transition-all"
              >
                Acessar Modo Carreira ➔
              </button>
            </div>
          </div>

          {/* Card 2: Deckbuilder */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-forge-800 bg-gradient-to-b from-forge-900/90 to-forge-950/90 p-6 shadow-xl transition-all duration-300 hover:border-amber-500/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/50 bg-amber-950/60 text-xl">
                  🛠️
                </span>
                <span className="font-mono text-[10px] rounded border border-forge-700 bg-forge-950 px-2 py-0.5 text-steel">
                  3 SLOTS SALVOS
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-bone group-hover:text-amber-300 transition-colors">
                Deckbuilder & Grimório
              </h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Construa e refine até 3 baralhos táticos de 4 a 10 cartas. Filtre por papéis arquiteturais (#compute, #storage, #security) e monte formações para eventos com restrições de custo de Éter.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate("deckbuilder")}
                className="w-full cursor-pointer rounded-lg border border-amber-600/50 bg-amber-950/40 py-2.5 font-mono text-xs font-bold text-amber-300 hover:border-amber-400 hover:bg-amber-500/20 transition-all"
              >
                Montar Baralhos ➔
              </button>
            </div>
          </div>

          {/* Card 3: Arena de Combate */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-forge-800 bg-gradient-to-b from-forge-900/90 to-forge-950/90 p-6 shadow-xl transition-all duration-300 hover:border-amber-500/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-ember/50 bg-ember/20 text-xl">
                  ⚔️
                </span>
                <span className="font-mono text-[10px] rounded border border-forge-700 bg-forge-950 px-2 py-0.5 text-steel">
                  INCIDENT RESPONSE
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-bone group-hover:text-amber-300 transition-colors">
                Arena de Anomalias
              </h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Incidentes de produção ganham forma como chefes ameaçadores (Quedas de AZ, DDoS massivo, Picos de Tráfego). Jogue cartas sinérgicas em turnos estratégicos para reverter a crise.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate("arena")}
                className="w-full cursor-pointer rounded-lg border border-ember/50 bg-ember/20 py-2.5 font-mono text-xs font-bold text-amber-200 hover:border-amber-400 hover:bg-ember/30 transition-all"
              >
                Entrar na Arena ➔
              </button>
            </div>
          </div>

          {/* Card 4: Simulados do Oráculo */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-forge-800 bg-gradient-to-b from-forge-900/90 to-forge-950/90 p-6 shadow-xl transition-all duration-300 hover:border-amber-500/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/50 bg-emerald-950/60 text-xl">
                  📜
                </span>
                <span className="font-mono text-[10px] rounded border border-forge-700 bg-forge-950 px-2 py-0.5 text-steel">
                  CLF-C02
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-bone group-hover:text-emerald-300 transition-colors">
                Oráculo de Certificação
              </h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Simulado completo com cenários reais de exame da AWS. Cada resposta traz justificativa arquitetural oficial demonstrando por que as outras opções violam boas práticas.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate("oracle")}
                className="w-full cursor-pointer rounded-lg border border-emerald-600/50 bg-emerald-950/40 py-2.5 font-mono text-xs font-bold text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                Treinar no Simulado ➔
              </button>
            </div>
          </div>

          {/* Card 5: Boosters & Economia */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-forge-800 bg-gradient-to-b from-forge-900/90 to-forge-950/90 p-6 shadow-xl transition-all duration-300 hover:border-amber-500/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/50 bg-purple-950/60 text-xl">
                  🎁
                </span>
                <span className="font-mono text-[10px] rounded border border-forge-700 bg-forge-950 px-2 py-0.5 text-steel">
                  COFRE & STREAK
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-bone group-hover:text-purple-300 transition-colors">
                Boosters & Recompensas
              </h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Conquiste Éter completando nós de carreira e simulados. Abra pacotes lacrados com animação 3D de revelação de cartas e faça check-in diário para bônus semanais.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate("boosters")}
                className="w-full cursor-pointer rounded-lg border border-purple-600/50 bg-purple-950/40 py-2.5 font-mono text-xs font-bold text-purple-300 hover:border-purple-400 hover:bg-purple-500/20 transition-all"
              >
                Ver Meus Pacotes ➔
              </button>
            </div>
          </div>

          {/* Card 6: A Filosofia do Projeto */}
          <div className="flex flex-col justify-between rounded-xl border border-amber-600/40 bg-gradient-to-b from-amber-950/30 to-forge-950 p-6 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/50 bg-amber-950/60 text-xl">
                  💡
                </span>
                <span className="font-mono text-[10px] rounded border border-amber-600/50 bg-amber-950 px-2 py-0.5 text-amber-300">
                  AUTORAL
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-bone">
                Por que criamos isso?
              </h4>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Projetado por <strong>Weriton Petreca</strong> para demonstrar arquitetura moderna em React, modelagem relacional escalável e demonstrar que a melhor maneira de dominar engenharia distribuída é praticando com propósito e imersão.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={onOpenTutorial}
                className="w-full cursor-pointer rounded-lg border border-amber-500 bg-amber-500/10 py-2.5 font-mono text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-black transition-all"
              >
                Abrir Tutorial do Jogo 📜
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GUIA RÁPIDO DO INICIANTE */}
      <section className="rounded-2xl border border-forge-700/80 bg-gradient-to-r from-forge-900 via-forge-950 to-forge-900 p-6 sm:p-8 font-mono">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              ROTA RECOMENDADA DE ESTUDOS
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-bone">
              Como começar sua jornada como Cloudwarden
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg border border-forge-800 bg-black/60 p-4 space-y-1.5">
              <span className="text-amber-400 font-bold">PASSO 1 · O BATISMO</span>
              <h5 className="font-bold text-bone">Conclua o Tutorial do Aprendiz</h5>
              <p className="text-slate-300 font-sans">
                Responda ao primeiro teste do oráculo para desbloquear seu deck base de 4 cartas (EC2, S3, RDS, IAM) e receba 150 Éter.
              </p>
            </div>

            <div className="rounded-lg border border-forge-800 bg-black/60 p-4 space-y-1.5">
              <span className="text-purple-400 font-bold">PASSO 2 · A FORJA</span>
              <h5 className="font-bold text-bone">Abra seu Primeiro Booster</h5>
              <p className="text-slate-300 font-sans">
                Acesse o Cofre de Boosters e descubra novas cartas raras, épicas ou lendárias para enriquecer sua estratégia.
              </p>
            </div>

            <div className="rounded-lg border border-forge-800 bg-black/60 p-4 space-y-1.5">
              <span className="text-sky-400 font-bold">PASSO 3 · O CONHECIMENTO</span>
              <h5 className="font-bold text-bone">Avance no Modo Carreira</h5>
              <p className="text-slate-300 font-sans">
                Percorra os nós da Skill Tree por domínio arquitetural. Cada nó forjado concede Éter e consolida conceitos de infraestrutura.
              </p>
            </div>

            <div className="rounded-lg border border-forge-800 bg-black/60 p-4 space-y-1.5">
              <span className="text-emerald-400 font-bold">PASSO 4 · O TESTE SUPREMO</span>
              <h5 className="font-bold text-bone">Treine no Simulado de Exame</h5>
              <p className="text-slate-300 font-sans">
                Avalie sua retenção nas questões oficiais do Oráculo para ter certeza de que você está pronto para a certificação AWS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
