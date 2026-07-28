import { Divider } from "../../../components/ui/Divider.tsx";
import { ContactForm } from "./ContactForm.tsx";

export function Contact() {
  return (
    <>
      <Divider />
      <section id="contact" className="texture-forged px-6 py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember">
              ✉️ TRANSMISSÃO DIRETA
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              Vamos Conversar
            </h2>
            <p className="mt-1 text-sm text-steel">
              Tem uma oportunidade, proposta de projeto ou dúvida técnica? Envie uma mensagem diretamente para minha caixa de entrada.
            </p>
          </div>

          {/* Card do Formulário */}
          <div className="hover-lift mt-8 rounded-sm border border-forge-700 bg-forge-900/60 p-6 shadow-xl">
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  );
}