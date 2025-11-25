import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEO({
  title,
  description,
  image = "/og-image.png",
  type = "website",
  noindex = false,
  keywords,
  author = "Gedui",
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gedui.com.br";
  const fullUrl = `${siteUrl}${router.asPath}`;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Head>
      {/* Título */}
      <title>{title}</title>

      {/* Meta Tags Essenciais */}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />

      {/* Canonical URL (evita conteúdo duplicado) */}
      <link rel="canonical" href={fullUrl} />

      {/* Noindex (para páginas que não devem ser indexadas) */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Gedui" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@gedui" />
      <meta name="twitter:creator" content="@gedui" />

      {/* Datas (para artigos de blog) */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Dados Estruturados (Schema.org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "article" ? "Article" : "WebPage",
            headline: title,
            description: description,
            image: fullImage,
            url: fullUrl,
            author: {
              "@type": "Organization",
              name: author,
            },
            publisher: {
              "@type": "Organization",
              name: "Gedui",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
              },
            },
            ...(publishedTime && { datePublished: publishedTime }),
            ...(modifiedTime && { dateModified: modifiedTime }),
          }),
        }}
      />
    </Head>
  );
}
