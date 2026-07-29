import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Footer } from "../src/components/layout/Footer.tsx";

describe("Footer", () => {
  it("renderiza os links das redes sociais e profissionais com URLs corretas", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const linkedinLink = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/weriton-petreca",
    );

    const githubLink = screen.getByRole("link", { name: "GitHub" });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/weritonpetreca",
    );

    const credlyLink = screen.getByRole("link", { name: "Credly" });
    expect(credlyLink).toHaveAttribute(
      "href",
      "https://www.credly.com/users/weriton-luis-petreca",
    );

    const whatsappLink = screen.getByRole("link", { name: "WhatsApp" });
    expect(whatsappLink).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/5535997231989"),
    );
  });

  it("renderiza o copyright com o ano atual e o nome", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Weriton Petreca`)),
    ).toBeInTheDocument();
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