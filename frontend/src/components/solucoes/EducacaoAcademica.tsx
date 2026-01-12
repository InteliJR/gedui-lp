"use client";

import Image from "next/image";

export default function SecaoEducacaoAcademica() {
  return (
    <section className="relative w-full bg-[#051D39] pt-40 pb-20 overflow-hidden -mt-8">
      {/* Azul escuro de fundo */}
      <div className="absolute inset-0 bg-[#051D39] z-0" />

      {/* FAIXA AZUL CLARA BEM PEQUENA E FIXA (SETa EM CIMA) */}
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
            alt="Pessoa digitando em notebook com GEDUI"
            width={500}
            height={250}
            className="rounded-xl object-cover"
          />
        </div>

        {/* TEXTO */}
        <div className="max-w-xl text-white pb-10">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Educação Acadêmica <br />
            <span className="text-[#8CBF3F]">digital com Gedui Edu</span>
          </h2>

          <p className="mt-6 text-base md:text-lg font-normal opacity-90 leading-relaxed">
            A GEDUI impulsiona a educação digital da sua instituição com
            ferramentas inteligentes que fortalecem o processo de ensino.
          </p>
        </div>
      </div>
    </section>
  );
}
