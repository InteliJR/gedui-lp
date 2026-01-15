// src/pages/solucoes/index.tsx
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";

import SolucoesHero from "@/components/solucoes/SolucoesHero";
import CTASolucoes from "@/components/solucoes/CTASolucoes";
import SecaoEducacaoAcademica from "@/components/solucoes/EducacaoAcademica";
import SecaoBeneficiosEdu from "@/components/solucoes/BeneficiosEdu";
import SecaoEducacaoCorporativa from "@/components/solucoes/EducacaoCorporativa";
import SecaoBeneficiosCorp from "@/components/solucoes/BeneficiosCorp";

import loadSolutionsDictionary from "@/i18n/loadSolutionsDictionary";

export default function SolucoesPage({
  t,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEO
        title="Soluções | Gedui"
        description="Conheça as soluções da Gedui para gestão educacional."
        image="/og-image-solucoes.png"
      />

      <Layout>
        <SolucoesHero t={t.hero} />
        <CTASolucoes t={t.cta} />
        <SecaoEducacaoAcademica t={t.educacaoAcademica} />
        <SecaoBeneficiosEdu t={t.beneficiosEdu} />
        <SecaoEducacaoCorporativa t={t.educacaoCorporativa} />
        <SecaoBeneficiosCorp t={t.beneficiosCorp} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await loadSolutionsDictionary(locale);
  return { props: { t } };
};
