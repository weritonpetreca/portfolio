import { Link } from "react-router";

const currentYear = new Date().getFullYear();

// Assunto e corpo pré-preenchidos: RF-14 revisado — em vez de só copiar o
// e-mail, o link "mailto:" já abre o cliente de e-mail do visitante com
// o assunto (e uma saudação) prontos. O formulário embutido na seção de
// Contato é o caminho principal agora; isto aqui é o fallback sempre
// disponível, em qualquer página do site.
const contactMailto =
  "mailto:eulcfr@gmail.com" +
  "?subject=" +
  encodeURIComponent("Oportunidade via Portfólio") +
  "&body=" +
  encodeURIComponent("Olá, Weriton! Encontrei seu portfólio e ");

export function Footer() {
  return (
    <footer className="border-t border-forge-700 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-sm text-steel">
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono">
          <a href={contactMailto} className="hover:text-ember">
            E-mail
          </a>
          <a
            href="https://linkedin.com/in/weriton-petreca"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ember"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/weritonpetreca"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ember"
          >
            GitHub
          </a>
          <a
            href="https://www.credly.com/users/weriton-luis-petreca"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ember"
          >
            Credly
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-forge-900 pt-6">
          <span>© {currentYear} Weriton Petreca</span>

          {/* RF-03: ponto de entrada único e discreto para a segunda persona */}
          <Link to="/witcher-realm" className="italic hover:text-ember">
            Nas horas vagas, também exploro outros reinos →
          </Link>
        </div>
      </div>
    </footer>
  );
}
