/**
 * Centraliza a leitura de Feature Flags e variáveis de ambiente do frontend.
 *
 * Por segurança (Fail-Closed Release Gate), recursos externos em desenvolvimento
 * como o Cloudwardens permanecem em modo teaser ("Em Breve") em Produção a menos
 * que `VITE_ENABLE_CLOUDWARDENS="true"` seja injetado explicitamente.
 */
export function isCloudwardensEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_CLOUDWARDENS === "true";
}

export function getCloudwardensUrl(): string {
  return (
    import.meta.env.VITE_CLOUDWARDENS_URL || "https://cloudwardens.weriton.dev"
  );
}
