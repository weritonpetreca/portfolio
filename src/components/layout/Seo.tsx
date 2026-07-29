import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
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

  // Versão global de cache-busting para forçar atualização no Cloudflare/Navegadores
  const CACHE_VERSION = "?v=2";
  
  // Trata dinamicamente qualquer favicon passado por parâmetro (ex: /witcher-favicon.ico)
  const activeFavicon = `${favicon}${CACHE_VERSION}`;
  const defaultImage = `${baseUrl}/og-image.png`;
  const finalImage = image ?? defaultImage;

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

      {/* Favicon Dinâmico Roteável (Funciona para /favicon.ico ou /witcher-favicon.ico) */}
      <link rel="icon" type="image/x-icon" href={activeFavicon} />
      <link rel="shortcut icon" href={activeFavicon} />

      {/* Metadados Estáticos Padrão da Aplicação */}
      {favicon === "/favicon.ico" && (
        <>
          <link rel="icon" type="image/png" sizes="96x96" href={`/favicon-96x96.png${CACHE_VERSION}`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`/apple-touch-icon.png${CACHE_VERSION}`} />
          <link rel="manifest" href={`/site.webmanifest${CACHE_VERSION}`} />
        </>
      )}

      {/* Open Graph */}
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

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
}