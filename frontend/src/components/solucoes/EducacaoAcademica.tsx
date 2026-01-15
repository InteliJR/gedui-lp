"use client";

import Image from "next/image";

export type EducacaoAcademicaDict = {
  aria: {
    imageAlt: string;
  };
  heading: {
    line1: string;
    highlight: string;
  };
  description: string;
};

export default function SecaoEducacaoAcademica({
  t,
}: {
  t: EducacaoAcademicaDict;
}) {
  return (
    <section className="relative w-full bg-[#051D39] pt-40 pb-20 overflow-hidden -mt-8">
      {/* Azul escuro de fundo */}
      <div className="absolute inset-0 bg-[#051D39] z-0" />

      {/* FAIXA AZUL CLARA BEM PEQUENA E FIXA (SETA EM CIMA) */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <div className="bg-primary w-full h-10 relative">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-full bg-[#051D39]"
            style={{
              clipPath: "polygon(50% 0%, 0 100%, 100% 100%)",
            }}
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* IMAGEM */}
        <div className="w-full md:w-1/2">
          <Image
            src="/digitando.jpg"
            alt={t.aria.imageAlt}
            width={500}
            height={250}
            className="rounded-xl object-cover"
          />
        </div>

        {/* TEXTO */}
        <div className="max-w-xl text-white pb-10">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            {t.heading.line1} <br />
            <span className="text-[#8CBF3F]">{t.heading.highlight}</span>
          </h2>

          <p className="mt-6 text-base md:text-lg font-normal opacity-90 leading-relaxed">
            {t.description}
          </p>
        </div>
      </div>
    </section>
  );
}
