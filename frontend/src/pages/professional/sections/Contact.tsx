import { motion } from "motion/react";
import { Divider } from "../../../components/ui/Divider.tsx";
import { ContactForm } from "./ContactForm.tsx";

const QUICK_CHANNELS = [
  {
    label: "LinkedIn",
    sublabel: "/in/weriton-petreca",
    href: "https://linkedin.com/in/weriton-petreca",
    external: true,
    accentClass:
      "hover:border-sky-500/70 hover:text-sky-300 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)]",
  },
  {
    label: "WhatsApp Direto",
    sublabel: "Resposta Rápida",
    href: "https://wa.me/5535997231989?text=Ol%C3%A1%20Weriton,%20vi%20seu%20portf%C3%B3lio!",
    external: true,
    accentClass:
      "hover:border-emerald-500/70 hover:text-emerald-300 hover:shadow-[0_0_18px_rgba(16,185,129,0.25)]",
  },
  {
    label: "Baixar Currículo",
    sublabel: "PDF Atualizado",
    href: "/cv-weriton-petreca.pdf",
    external: false,
    download: true,
    accentClass:
      "hover:border-amber-400/70 hover:text-amber-300 hover:shadow-[0_0_18px_rgba(245,158,11,0.25)]",
  },
] as const;

export function Contact() {
  return (
    <>
      <Divider stage="ETAPA VII" />
      <section id="contact" className="relative px-6 py-20 overflow-hidden">
        {/* Fundo Parallax (scroll normal no mobile para evitar bug do iOS Safari) */}
        <div className="absolute inset-0 z-0 bg-[url('/images/portfolio/portfolio_contact_bg.jpg')] bg-scroll md:bg-fixed bg-cover bg-center opacity-25 pointer-events-none" />
        <div className="absolute inset-0 z-0 texture-forged opacity-30 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-linear-to-b from-forge-950 via-forge-950/50 to-forge-950 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>✉️</span> CANAL DIRETO & CONTATO · ETAPA VII
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-forged-gold">
              Vamos Conversar
            </h2>
            <p className="font-mono text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
              Tem uma oportunidade em Engenharia Back-End & Cloud (AWS, Java, C#/.NET, Python), proposta de projeto ou dúvida sobre arquitetura? Escolha um canal rápido ou envie uma mensagem diretamente pelo formulário.
            </p>
          </div>

          {/* Barra de Ação Rápida para Recrutadores */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {QUICK_CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                download={"download" in channel ? channel.download : undefined}
                className={`group flex items-center justify-between rounded-xl border border-forge-700/80 bg-forge-950/90 px-4 py-3.5 font-mono transition-all duration-200 hover:-translate-y-0.5 ${channel.accentClass}`}
              >
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-bone group-hover:text-current transition-colors">
                    {channel.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-steel">
                    {channel.sublabel}
                  </span>
                </div>
                <span className="text-ember font-bold transition-transform duration-200 group-hover:translate-x-0.5">
                  {"download" in channel ? "⬇" : "↗"}
                </span>
              </a>
            ))}
          </div>

          {/* Card do Formulário */}
          <div className="mt-6 rounded-xl border border-forge-700/80 bg-linear-to-b from-forge-900/95 to-forge-950/95 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(210,69,31,0.15)]">
            <ContactForm />
          </div>

        </motion.div>
      </section>
    </>
  );
}
