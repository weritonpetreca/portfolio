import { Divider } from "../../../components/ui/Divider.tsx";

interface SkillGroup {
  label: string;
  icon: string;
  items: string[];
  fullWidth?: boolean;
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
    label: "Frontend (Em expansão)", 
    icon: "🎨",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS"] 
  },
  { 
    label: "Segurança & DevSecOps", 
    icon: "🛡️",
    fullWidth: true,
    items: [
      "AWS IAM", 
      "OAuth2 / JWT", 
      "SonarQube (SAST)", 
      "OWASP Dependency-Check", 
      "AWS Secrets Manager", 
      "OWASP Top 10",
      "Princípio do Menor Privilégio"
    ] 
  },
];

export function Skills() {
  return (
    <>
      <Divider />
      <section id="habilidades" className="texture-forged px-6 py-20">
        <div className="mx-auto max-w-4xl">
          
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>⚡</span> ARSENAL & ÁRVORE DE HABILIDADES
            </p>
            <h2 className="font-display text-3xl font-bold text-bone sm:text-4xl">
              Habilidades Técnicas
            </h2>
            <p className="mt-1 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Linguagens, frameworks, nuvem e práticas de segurança que compõem meu ecossistema de engenharia.
            </p>
          </div>

          {/* Grid de Cards por Categoria */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className={`group rounded-lg border border-forge-700/80 bg-forge-900/80 p-5 sm:p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
                  group.fullWidth ? "sm:col-span-2" : ""
                }`}
              >
                {/* Título da Categoria com Ícone */}
                <div className="flex items-center gap-3 border-b border-forge-700/60 pb-3">
                  <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    {group.icon}
                  </span>
                  <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-amber-500/90">
                    {group.label}
                  </h3>
                </div>

                {/* Lista de Runas / Tecnologias */}
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="cursor-default rounded-md border border-forge-700/80 bg-forge-950/90 px-3 py-1.5 font-mono text-xs sm:text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-300 hover:bg-forge-900 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
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