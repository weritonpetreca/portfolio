import { Divider } from "../../../components/ui/Divider.tsx";
import { ContactForm } from "./ContactForm.tsx";

export function Contact() {
  return (
    <>
      <Divider />
      <section id="contact" className="texture-forged px-6 py-20">
        <div className="mx-auto max-w-4xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>✉️</span> TRANSMISSÃO DIRETA
            </p>
            <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">
              Vamos Conversar
            </h2>
            <p className="mt-1 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Tem uma oportunidade, proposta de projeto ou dúvida técnica? Envie uma mensagem diretamente para minha caixa de entrada.
            </p>
          </div>

          {/* Card do Formulário */}
          <div className="mt-10 rounded-lg border border-forge-700/80 bg-forge-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  );
}