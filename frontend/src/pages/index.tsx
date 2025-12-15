// src/pages/index.tsx
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import Hero from "@/components/sections/Hero";
import Recursos from "@/components/sections/Recursos";
import Depoimentos from "@/components/sections/Depoimentos";
import BlogPreview from "@/components/sections/BlogPreview";
import CTA from "@/components/sections/CTA";
import QuemSomos from "@/components/sections/QuemSomos";
import NossosValores from "@/components/sections/NossosValores";
import VantagensGestao from "@/components/sections/Vantagens";
import ParaQuemSomos from "@/components/sections/ParaQuemSomos";

export default function Home() {
  return (
    <>
      <SEO
        title="Gedui | Plataforma Educacional Completa"
        description="Transforme a gestão educacional com Gedui. Soluções inovadoras para instituições de ensino corporativo e acadêmico. Agende uma demonstração gratuita."
        keywords="plataforma educacional, gestão escolar, EAD, educação corporativa, LMS, Gedui"
        image="/og-image-home.png"
      />

      <Layout>
        <Hero />
        <QuemSomos />
        <ParaQuemSomos />
        <NossosValores />
        <VantagensGestao />

        <Depoimentos />
        <BlogPreview />
        {/* <CTA /> */}
      </Layout>
    </>
  );
}
