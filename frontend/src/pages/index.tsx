// src/pages/index.tsx
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";

import Hero from "@/components/sections/Hero";
import QuemSomos from "@/components/sections/QuemSomos";
import ParaQuemSomos from "@/components/sections/ParaQuemSomos";
import NossosValores from "@/components/sections/NossosValores";
import VantagensGestao from "@/components/sections/Vantagens";
import Depoimentos from "@/components/sections/Depoimentos";
import BlogPreview from "@/components/sections/BlogPreview";

import loadHomeDictionary from "@/i18n/loadHomeDictionary";

export default function HomePage({
  t,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO
        title={t?.seo?.title ?? "Gedui | Plataforma Educacional Completa"}
        description={
          t?.seo?.description ??
          "Transforme a gestão educacional com Gedui. Soluções inovadoras..."
        }
        keywords={t?.seo?.keywords ?? "plataforma educacional, LMS, Gedui"}
        image={t?.seo?.image ?? "/og-image-home.png"}
      />

      <Layout>
        <Hero t={t.hero} />
        <QuemSomos t={t.quemSomos} />
        <ParaQuemSomos t={t.paraQuemSomos} />
        <NossosValores t={t.nossosValores} />
        <VantagensGestao t={t.vantagensGestao} />
        <Depoimentos t={t.depoimentos} />
        <BlogPreview t={t.blogPreview} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await loadHomeDictionary(locale);
  return { props: { t } };
};
