"use client";

import Image from "next/image";

export type EducacaoCorporativaDict = {
  aria: {
    phoneAlt: string;
  };
  heading: {
    line1: string;
    highlight: string;
  };
  description: string;
};

export default function SecaoEducacaoCorporativa({
  t,
}: {
  t: EducacaoCorporativaDict;
}) {
  return (
    <section className="relative w-full bg-[#051D39] pt-20 pb-40 overflow-hidden">
      {/* Azul escuro de fundo */}
      <div className="absolute inset-0 bg-[#051D39] z-0" />

      {/* FAIXA AZUL CLARA BEM PEQUENA E FIXA */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
        <div className="bg-primary w-full h-10 relative">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-full bg-[#051D39]"
            style={{
              clipPath: "polygon(50% 100%, 0 0, 100% 0)",
            }}
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
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

      {/* CELULAR */}
      <div className="absolute bottom-16 right-6 md:right-16 z-[25] translate-y-6 pointer-events-none">
        <Image
          src="/solucoes/celular.png"
          alt={t.aria.phoneAlt}
          width={800}
          height={1300}
          className="object-contain w-[18rem] md:w-[28rem] lg:w-[36rem]"
        />
      </div>
    </section>
  );
}
