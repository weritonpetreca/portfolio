import { Seo } from "../../components/layout/Seo.tsx";
import { Header } from "../../components/layout/Header.tsx";
import { Footer } from "../../components/layout/Footer.tsx";
import { EmbersCanvas } from "../../components/ui/EmbersCanvas.tsx";
import { Hero } from "./sections/Hero.tsx";
import { About } from "./sections/About.tsx";
import { Skills } from "./sections/Skills.tsx";
import { Projects } from "./sections/Projects.tsx";
import { Experience } from "./sections/Experience.tsx";
import { Education } from "./sections/Education.tsx";
import { SoftSkills } from "./sections/SoftSkills.tsx";
import { Contact } from "./sections/Contact.tsx";

export function ProfessionalPage() {
  return (
    <>
      <Seo
        title="Weriton Petreca — Back-End & Cloud Engineer"
        description="Portfólio de Weriton Petreca, Engenheiro de Software Back-End & Cloud (AWS, Java, C#/.NET, Python). Vencedor do Hack2Hire 2026 com o projeto CrediFácil IDP."
        path="/"
      />

      {/* Partículas de Brasa Atmosférica Contínuas (Fundo Fixo Global da Forja) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <EmbersCanvas count={45} />
      </div>

      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <SoftSkills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
