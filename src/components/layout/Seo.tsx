import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  /** Caminho absoluto da rota, ex: "/" ou "/witcher-realm" — usado para montar a URL canônica. */
  path: string;
  /** Tipo de página, padrão 'website'. Para artigos/blog, use 'article'. */
  type?: "website" | "article";
  /** URL da imagem de compartilhamento Open Graph. Se omitida, usa "/og-image.png". */
  image?: string;
  /** Caminho do favicon específico da rota (ex: "/witcher-favicon.ico"). Se omitido, usa o padrão "/favicon.ico". */
  favicon?: string;
}

export function Seo({
  title,
  description,
  path,
  type = "website",
  image,
  favicon = "/favicon.ico",
}: SeoProps) {
  const baseUrl = "https://weriton.dev";
  const url = `${baseUrl}${path}`;

  // Imagem de compartilhamento padrão
  const defaultImage = `${baseUrl}/og-image.png`;
  const finalImage = image ?? defaultImage;

  // Dados Estruturados (Schema.org) para autoridade do perfil no Google
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Weriton Luis Petreca",
    url: baseUrl,
    jobTitle: "Back-End Engineer",
    sameAs: [
      "https://linkedin.com/in/weriton-petreca",
      "https://github.com/weritonpetreca",
      "https://www.credly.com/users/weriton-luis-petreca",
    ],
    description: description,
  };

  return (
    <Helmet>
      {/* Meta Tags Essenciais */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Favicons Dinâmicos */}
      <link rel="icon" type="image/x-icon" href={favicon} />
      <link rel="shortcut icon" href={favicon} />
      
      {/* Padrões adicionais quando estiver na rota principal */}
      {favicon === "/favicon.ico" && (
        <>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </>
      )}

      {/* Open Graph (Facebook, LinkedIn, Discord, Slack) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Weriton Petreca · Forja de Software" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* Dados Estruturados (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
}