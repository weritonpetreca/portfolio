import { Divider } from "../../../components/ui/Divider.tsx";

interface SkillGroup {
  label: string;
  icon: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  { 
    label: "Back-End", 
    icon: "⚔️",
    items: ["Java 21", "Spring Boot", "Gradle", "Python"] 
  },
  {
    label: "Cloud & DevOps",
    icon: "☁️",
    items: ["AWS Lambda", "DynamoDB", "S3", "IAM", "CDK", "Terraform", "GitHub Actions", "Docker"],
  },
  { 
    label: "Dados & Bancos", 
    icon: "🗄️",
    items: ["PostgreSQL", "DynamoDB", "MongoDB"] 
  },
  { 
    label: "Arquitetura & Design", 
    icon: "🏛️",
    items: ["Hexagonal", "Microsserviços", "Circuit Breaker"] 
  },
  { 
    label: "Testes & Qualidade", 
    icon: "🧪",
    items: ["JUnit 5", "Mockito", "TDD", "JaCoCo", "Pytest", "SonarQube"] 
  },
  { 
    label: "Segurança & Defesa", 
    icon: "🛡️",
    items: ["Hackers do Bem (SENAI/RNP)", "Fundamentos Cibersegurança (Cisco/SENAI GO)"] 
  },
  { 
    label: "Frontend (Em expansão)", 
    icon: "🎨",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS"] 
  },
];

export function Skills() {
  return (
    <>
      <Divider />
      <section id="habilidades" className="texture-forged px-6 py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember">
              ⚡ ARSENAL & ÁRVORE DE HABILIDADES
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              Habilidades Técnicas
            </h2>
            <p className="mt-1 text-sm text-steel">
              Ferramentas, linguagens e padrões que compõem meu stack de desenvolvimento diário.
            </p>
          </div>

          {/* Grid de Cards por Categoria */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="hover-lift rounded-sm border border-forge-700 bg-forge-900/60 p-5 shadow-md"
              >
                {/* Título da Categoria com Ícone */}
                <div className="flex items-center gap-2 border-b border-forge-700/40 pb-2.5">
                  <span className="text-base" aria-hidden="true">
                    {group.icon}
                  </span>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-steel">
                    {group.label}
                  </h3>
                </div>

                {/* Lista de Runas / Tecnologias */}
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-forge-700/80 bg-forge-950/80 px-2.5 py-1 font-mono text-xs text-bone transition-colors hover:border-ember hover:text-ember"
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