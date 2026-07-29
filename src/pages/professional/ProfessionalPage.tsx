import { Seo } from "../../components/layout/Seo.tsx";
import { Header } from "../../components/layout/Header.tsx";
import { Footer } from "../../components/layout/Footer.tsx";
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
        title="Weriton Petreca — Back-End Java & AWS Developer"
        description="Portfólio de Weriton Petreca, desenvolvedor Back-End Java/AWS. Vencedor do Hack2Hire 2026 com o projeto CrediFácil IDP."
        path="/"
      />
      <Header />
      <main>
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
