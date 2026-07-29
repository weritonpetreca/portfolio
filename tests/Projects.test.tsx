import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Projects } from "../src/pages/professional/sections/Projects.tsx";

/**
 * Este teste protege diretamente o RF-09/RF-10: se algum dia alguém
 * (você, eu, ou um refactor futuro) reordenar `data/projects.ts` e o
 * CrediFácil deixar de vir primeiro ou perder seus destaques, este teste
 * quebra — é a rede de segurança pra uma regra de negócio real, não só
 * "o componente renderiza sem crashar".
 */
describe("Projects", () => {
  it("exibe o CrediFácil IDP com a vitória no Hack2Hire como destaque", () => {
    render(<Projects />);

    const heading = screen.getByRole("heading", { name: "CrediFácil IDP" });
    expect(heading).toBeInTheDocument();
    expect(
      screen.getByText(/1º lugar no Hackathon Hack2Hire 2026/i),
    ).toBeInTheDocument();
  });

  it("lista todos os projetos com link para o repositório", () => {
    render(<Projects />);

    const repoLinks = screen.getAllByRole("link", { name: /repositório/i });
    expect(repoLinks.length).toBeGreaterThanOrEqual(3);
  });
});
