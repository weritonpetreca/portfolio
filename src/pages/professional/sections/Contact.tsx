import { Divider } from "../../../components/ui/Divider.tsx";
import { ContactForm } from "./ContactForm.tsx";

export function Contact() {
  return (
    <>
      <Divider />
      <section id="contato" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-ember">ENVIAR UMA MENSAGEM</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
            Vamos conversar
          </h2>
          <p className="mt-3 max-w-xl text-steel">
            Prefere preencher aqui mesmo? O formulário abaixo chega direto na minha
            caixa de entrada.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
