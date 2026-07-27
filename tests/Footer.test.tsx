import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Footer } from "../src/components/layout/Footer.tsx";

/**
 * Footer usa <Link> do react-router, que precisa de um Router por perto
 * para funcionar — por isso o <MemoryRouter> envolvendo o componente aqui.
 * Em produção quem cumpre esse papel é o <BrowserRouter> lá no App.tsx.
 *
 * Repare que as consultas (getByRole) buscam pelo que um USUÁRIO enxerga
 * (o texto do link, o papel de acessibilidade) — não por detalhes de
 * implementação como nome de classe CSS. É a mesma filosofia de testar
 * comportamento, não implementação, que você já aplica com Mockito.
 */
describe("Footer", () => {
  it("renderiza um link de e-mail com assunto pré-preenchido", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const emailLink = screen.getByRole("link", { name: "E-mail" });
    expect(emailLink).toHaveAttribute(
      "href",
      expect.stringContaining("subject=Oportunidade"),
    );
  });

  it("linka para o portal da Witcher Realm", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const portalLink = screen.getByRole("link", { name: /outros reinos/i });
    expect(portalLink).toHaveAttribute("href", "/witcher-realm");
  });
});
