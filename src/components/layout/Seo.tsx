import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  /** Caminho absoluto da rota, ex: "/" ou "/witcher-realm" — usado para montar a URL canônica. */
  path: string;
}

/**
 * Resolve RF-05 e RF-21: cada página chama <Seo /> com seus próprios
 * title/description/path, e o react-helmet-async atualiza o <head>
 * dinamicamente conforme a rota muda — sem isso, uma SPA inteira
 * compartilharia o mesmo <title> do index.html em todas as rotas.
 */
export function Seo({ title, description, path }: SeoProps) {
  const url = `https://weriton.dev${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
