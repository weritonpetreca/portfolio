import { motion } from "motion/react";
import { Divider } from "../../../components/ui/Divider.tsx";
import { ContactForm } from "./ContactForm.tsx";

export function Contact() {
  return (
    <>
      <Divider stage="ETAPA VII" />
      <section id="contact" className="texture-forged relative px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>✉️</span> TRANSMISSÃO DIRETA & CONTATO · ETAPA VII
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-forged-gold">
              Vamos Conversar
            </h2>
            <p className="font-mono text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
              Tem uma oportunidade para Back-End Java / AWS, proposta de projeto ou dúvida sobre arquitetura? Envie uma mensagem diretamente.
            </p>
          </div>

          {/* Card do Formulário */}
          <div className="mt-10 rounded-xl border border-forge-700/80 bg-gradient-to-b from-forge-900/95 to-forge-950/95 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_20px_50px_rgba(210,69,31,0.15)]">
            <ContactForm />
          </div>

        </motion.div>
      </section>
    </>
  );
}