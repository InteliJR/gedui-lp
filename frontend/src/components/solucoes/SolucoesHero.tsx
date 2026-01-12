"use client";

import Image from "next/image";

export default function HeroSolucoes() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden -mt-16 pt-16">
      {/* IMAGEM DE FUNDO */}
      <Image
        src="/solucoes/hero.png"
        alt="Pessoas estudando"
        fill
        priority
        className="object-cover z-0"
      />

      {/* OVERLAY ESCURO */}
      <div
        className="absolute inset-0 bg-primary/60 z-10"
        aria-hidden="true"
      />

      {/* GLOW */}
      <div
        className="absolute left-1/2 top-1/2 
                   -translate-x-1/2 -translate-y-1/2
                   w-[420px] h-[420px]
                   rounded-full
                   bg-sky-400/50
                   blur-[120px]
                   opacity-80
                   z-20
                   pointer-events-none"
        aria-hidden="true"
      />

      {/* CONTEÚDO CENTRALIZADO */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6 text-white pt-16">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
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

      {/*Degradê inferior */}
      <footer className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div
          className="
              h-52
              bg-gradient-to-b
              from-transparent
              via-[rgba(5,41,79,0.4)]
              to-primary
        "
          aria-hidden="true"
        />
      </footer>
    </section>
  );
}
