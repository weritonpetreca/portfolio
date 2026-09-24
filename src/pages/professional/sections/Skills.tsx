import { motion } from "motion/react";
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
      <Divider stage="ETAPA II" />
      <section id="habilidades" className="texture-forged relative px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          {/* Cabeçalho da Seção */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-ember flex items-center gap-2">
              <span>⚡</span> ARSENAL & ÁRVORE DE HABILIDADES · ETAPA II
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-forged-gold">
              Habilidades Técnicas
            </h2>
            <p className="font-mono text-xs sm:text-sm text-steel max-w-2xl leading-relaxed">
              Linguagens, frameworks, nuvem e práticas de segurança forjadas para resistir sob alta demanda.
            </p>
          </div>

          {/* Grid de Cards por Categoria */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group rounded-xl border border-forge-700/80 bg-gradient-to-b from-forge-900/90 to-forge-950/95 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(210,69,31,0.15)] ${
                  group.fullWidth ? "sm:col-span-2" : ""
                }`}
              >
                {/* Título da Categoria com Ícone */}
                <div className="flex items-center gap-3 border-b border-forge-700/60 pb-3">
                  <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-115" aria-hidden="true">
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
                      className="cursor-default rounded-md border border-forge-700/80 bg-forge-950/90 px-3 py-1.5 font-mono text-xs sm:text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-300 hover:bg-forge-900 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>
    </>
  );
}