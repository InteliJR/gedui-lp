"use client";

import Image from "next/image";

export default function HeroSolucoes() {
  return (
    <section className="relative w-full h-[520px] md:h-[620px] overflow-hidden -mt-16 pt-16">
      {/* IMAGEM DE FUNDO */}
      <Image
        src="/solucoes/hero.png"
        alt="Pessoas estudando"
        fill
        priority
        className="object-cover"
      />

      {/* RADIAL GRADIENT DO FIGMA */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0E55A5_20%,_#05294F_50%)] opacity-90 mix-blend-multiply"></div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 text-white">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Soluções que transformam
          <br />
          o aprendizado em sua
          <br />
          instituição ou empresa.
        </h1>

        <p className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed opacity-90">
          A GEDUI é a plataforma para ajudar na transformação dos métodos
          tradicionais, adaptando-os com inovação e tornando o aprendizado mais
          dinâmico, eficiente e inclusivo.
        </p>
      </div>
    </section>
  );
}
