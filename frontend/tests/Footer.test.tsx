import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "../src/components/layout/Footer.tsx";

describe("Footer", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

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

  it("exibe selo 'Em Desenvolvimento' e oculta links para /cloudwardens quando a feature flag está desativada (Produção)", () => {
    vi.stubEnv("VITE_ENABLE_CLOUDWARDENS", "false");

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/Em Desenvolvimento · Em Breve/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /acessar cloudwardens/i }),
    ).not.toBeInTheDocument();
  });

  it("linka para o universo Cloudwardens quando a feature flag está ativada (Staging/Dev)", () => {
    vi.stubEnv("VITE_ENABLE_CLOUDWARDENS", "true");

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const portalLinks = screen.getAllByRole("link", { name: /cloudwardens/i });
    expect(portalLinks.length).toBeGreaterThanOrEqual(1);
    expect(portalLinks[0]).toHaveAttribute(
      "href",
      "https://cloudwardens.weriton.dev",
    );
  });
});
