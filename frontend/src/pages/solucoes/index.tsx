// src/pages/solucoes/index.tsx
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import SolucoesHero from "@/components/solucoes/SolucoesHero";
import SecaoEducacaoCorporativa from "@/components/solucoes/EducacaoCorporativa";
import { SiEducative } from "react-icons/si";

export default function SolucoesPage() {
  return (
    <>
      <SEO
        title="Soluções | Gedui"
        description="Conheça as soluções da Gedui para gestão educacional."
        image="/og-image-solucoes.png"
      />

      <Layout>
        <SolucoesHero />
        <SecaoEducacaoCorporativa />
      </Layout>
    </>
  );
}
