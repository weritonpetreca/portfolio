import { Divider } from "../../../components/ui/Divider.tsx";

interface SkillGroup {
  label: string;
  items: string[];
}

// Categorias e itens vêm do conteúdo já validado no site atual — só a
// nomenclatura muda (de termos Witcher-específicos para algo temático mas
// genérico). Ajuste a lista livremente, é só dado.
const skillGroups: SkillGroup[] = [
  { label: "Back-End", items: ["Java 21", "Spring Boot", "Gradle", "Python"] },
  {
    label: "Cloud & DevOps",
    items: ["AWS Lambda", "DynamoDB", "S3", "IAM", "CDK", "Terraform", "GitHub Actions", "Docker"],
  },
  { label: "Dados", items: ["PostgreSQL", "DynamoDB", "MongoDB"] },
  { label: "Arquitetura", items: ["Hexagonal", "Microsserviços", "Circuit Breaker"] },
  { label: "Testes", items: ["JUnit 5", "Mockito", "TDD", "JaCoCo"] },
  { label: "Segurança", items: ["Hackers do Bem (SENAI/RNP)", "Fundamentos Cibersegurança (Cisco/SENAI GO)"] },
  { label: "Frontend (em expansão)", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
];

export function Skills() {
  return (
    <>
      <Divider />
      <section id="habilidades" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-widest text-ember">O ARSENAL</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
            Habilidades Técnicas
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-xs tracking-widest text-steel uppercase">
                  {group.label}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-forge-700 bg-forge-900 px-3 py-1 text-sm text-bone"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
