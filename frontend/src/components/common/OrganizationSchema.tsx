export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gedui",
    url: "https://gedui.com.br",
    logo: "https://gedui.com.br/logo.png",
    description: "Plataforma educacional completa para instituições de ensino",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
      addressLocality: "São Paulo",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-XXXX-XXXX",
      contactType: "Customer Service",
      availableLanguage: ["Portuguese", "English", "Spanish"],
    },
    sameAs: [
      "https://www.linkedin.com/company/gedui",
      "https://twitter.com/gedui",
      "https://www.instagram.com/gedui",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
