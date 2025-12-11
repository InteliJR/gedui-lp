"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroEducacao() {
  return (
    <section className="relative w-full h-[520px] md:h-[580px] overflow-hidden bg-[#05294F]">
      {/* Container com layout lado a lado */}
      <div className="absolute inset-0 flex">
        {/* Imagem - lado esquerdo, ocupando ~45% */}
        <div className="relative w-0 md:w-[45%] hidden md:block">
          <Image
            src="/blog/educacaocorporativa.png"
            alt="Gráficos e documentos"
            fill
            className="object-cover"
          />

          {/* Gradiente radial sobre a imagem */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_left,_#0E55A5_0%,_#05294F_65%,_#05294F_100%)]
              opacity-65
              mix-blend-multiply
            "
          ></div>
        </div>

        {/* Gradiente de transição suave entre imagem e conteúdo */}
        <div className="hidden md:block absolute right-[52%] top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-[#05294F] to-[#05294F] opacity-70 pointer-events-none"></div>

        {/* Conteúdo - lado direito */}
        <div className="w-full md:w-[55%] bg-[#05294F] flex items-center px-8 md:px-12 lg:px-16">
          <div className="w-full">
            <h2 className="text-2xl md:text-[32px] font-semibold text-white opacity-80">
              Educação Corporativa E Tecnologia:
            </h2>

            <h1 className="text-3xl md:text-[40px] font-semibold leading-tight mt-2 text-white">
              Tendências E Desafios Para{" "}
              <span className="text-white">2025</span>
            </h1>

            <p className="mt-6 text-base md:text-[20px] leading-relaxed opacity-90 text-white font-light">
              A educação corporativa, essencial para o sucesso e crescimento das
              organizações, está passando por uma revolução impulsionada pelos
              avanços tecnológicos e pelas mudanças nas dinâmicas de trabalho.
            </p>

            {/* Botão com SVG (chevron) */}
            <Link
              href="/blog/tendencias-educacao-2025"
              aria-label="Saiba mais sobre educação corporativa"
              className="group mt-8 inline-flex items-center px-4 py-3 bg-[#A4FF39] text-[#05294F] font-medium rounded-full hover:bg-[#b8ff66] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#9fe12a] cursor-pointer"
            >
              <span className="select-none">Saiba mais</span>

              {/* Chevron SVG — usa currentColor para herdar a cor do texto */}
              <svg
                className="ml-3 w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M8 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile: Imagem como fundo */}
      <div className="md:hidden absolute inset-0">
        <Image
          src="/blog/educacaocorporativa.png"
          alt="Gráficos e documentos"
          fill
          className="object-cover"
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_left,_#0E55A5_0%,_#05294F_65%,_#05294F_100%)]
            opacity-65
            mix-blend-multiply
          "
        ></div>

        <div className="absolute inset-0 bg-[#05294F] opacity-40"></div>
      </div>

      {/* Conteúdo mobile */}
      <div className="md:hidden relative z-10 h-full flex items-center px-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-white opacity-80">
            Educação Corporativa E Tecnologia:
          </h2>

          <h1 className="text-2xl font-semibold leading-tight mt-2 text-white">
            Tendências E Desafios Para 2025
          </h1>

          <p className="mt-4 text-base leading-relaxed opacity-90 text-white font-light">
            A educação corporativa, essencial para o sucesso e crescimento das
            organizações, está passando por uma revolução impulsionada pelos
            avanços tecnológicos e pelas mudanças nas dinâmicas de trabalho.
          </p>

          <Link
            href="/blog/tendencias-educacao-2025"
            aria-label="Saiba mais sobre educação corporativa"
            className="group mt-4 inline-flex items-center px-6 py-3 bg-[#A4FF39] text-[#05294F] font-medium rounded-full hover:bg-[#b8ff66] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#9fe12a] cursor-pointer"
          >
            <span className="select-none">Saiba mais</span>
            <svg
              className="ml-3 w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M8 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
