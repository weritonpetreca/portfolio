import { Link } from "react-router";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-forge-700 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-sm text-steel">
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono">
          <a
            href="https://linkedin.com/in/weriton-petreca"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-400"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/weritonpetreca"
            target="_blank"
            rel="noreferrer"
            className="hover:text-bone"
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
          <a
            href="https://wa.me/5535997231989?text=Ol%C3%A1%20Weriton,%20vi%20seu%20portf%C3%B3lio!"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400"
          >
            WhatsApp
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
