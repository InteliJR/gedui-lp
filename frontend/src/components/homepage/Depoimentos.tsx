"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";

// TIPOS
export interface Depoimento {
  id: number;
  nome: string;
  titulo: string;
  formacao: string[];
  imagem: string;
  texto: string;
}

export type DepoimentosDict = {
  heading: {
    line1: string;
    line2: string;
  };
  aria: {
    prev: string;
    next: string;
    goToSlide: string;
  };
  items: Depoimento[];
};

// ÍCONES
interface ArrowIconProps {
  className?: string;
}

const ArrowLeft = ({ className = "w-10 h-10" }: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const ArrowRight = ({ className = "w-10 h-10" }: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

// CARD
interface DepoimentoCardProps {
  depoimento: Depoimento;
}

const DepoimentoCard = ({ depoimento }: DepoimentoCardProps) => {
  return (
    <div className="bg-blue-900/40 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 h-auto sm:h-[500px]">
      {/* Pessoa */}
      <div className="flex flex-col items-center justify-center sm:w-[30%] flex-shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-3 border-4 border-blue-900/20">
          <Image
            src={depoimento.imagem}
            alt={depoimento.nome}
            className="object-cover"
            loading="lazy"
            fill
            sizes="(max-width: 640px) 96px, 128px"
          />
        </div>

        <h3 className="text-white text-sm sm:text-base font-bold text-center sm:text-left mb-2 leading-tight">
          {depoimento.nome}
        </h3>

        <ul className="text-white text-xs sm:text-sm space-y-1 list-none text-center sm:text-left">
          <li className="flex items-start justify-center sm:justify-start">
            <span className="text-gray-200 mr-1.5 flex-shrink-0 mt-0.5">•</span>
            <span>{depoimento.titulo}</span>
          </li>

          {depoimento.formacao.map((item, index) => (
            <li
              key={index}
              className="flex items-start justify-center sm:justify-start"
            >
              <span className="text-gray-200 mr-1.5 flex-shrink-0 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Texto */}
      <div className="w-full sm:w-[70%] flex items-center justify-center">
        <p className="text-blue-950 text-xs sm:text-sm leading-relaxed bg-white/70 p-4 sm:p-5 rounded-xl h-full flex items-center">
          {depoimento.texto}
        </p>
      </div>
    </div>
  );
};

// PRINCIPAL (mobile-first)
export default function DepoimentosCarrossel({ t }: { t: DepoimentosDict }) {
  const DEPOIMENTOS = t.items;

  // página do carrossel (não índice de card)
  const [page, setPage] = useState(0);

  // número de páginas:
  // mobile: 1 card por view => pages = n
  // lg: 2 cards por view => pages = ceil(n/2)
  const pagesMobile = DEPOIMENTOS.length;
  const pagesDesktop = Math.ceil(DEPOIMENTOS.length / 2);

  // indicadores: a gente renderiza os dois conjuntos e controla com CSS (sem JS)
  const indicatorsMobile = useMemo(
    () => Array.from({ length: pagesMobile }),
    [pagesMobile]
  );
  const indicatorsDesktop = useMemo(
    () => Array.from({ length: pagesDesktop }),
    [pagesDesktop]
  );

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

  const prev = useCallback(() => {
    setPage((p) => clamp(p - 1, 0, pagesMobile - 1)); // clamp “maior” (mobile). No desktop, o excesso não aparece por CSS.
  }, [pagesMobile]);

  const next = useCallback(() => {
    setPage((p) => clamp(p + 1, 0, pagesMobile - 1));
  }, [pagesMobile]);

  const goTo = useCallback((p: number) => {
    setPage(clamp(p, 0, pagesMobile - 1));
  }, [pagesMobile]);

  // disabled states para mobile (default)
  const isFirst = page === 0;
  const isLastMobile = page === pagesMobile - 1;

  return (
    <section className="bg-primary py-12 sm:py-16 md:py-24 relative overflow-hidden min-h-[70vh] flex items-center w-full">
      {/* Grafismo */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image
          src="/grafismo_horizontal.png"
          alt=""
          fill
          className="object-cover scale-y-[-1]"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl relative z-10">
        {/* Título */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-2 text-white">
            {t.heading.line1}
          </h2>
          <p className="text-xl sm:text-3xl md:text-5xl font-bold text-center text-lime-400">
            {t.heading.line2}
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative">
          {/* Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {DEPOIMENTOS.map((depoimento) => (
                <div
                  key={depoimento.id}
                  className="
                    flex-shrink-0 w-full
                    lg:w-1/2
                    px-0 lg:px-3
                  "
                >
                  <DepoimentoCard depoimento={depoimento} />
                </div>
              ))}
            </div>
          </div>

          {/* Setas - MOBILE overlay (sempre visíveis) */}
          <button
            onClick={prev}
            disabled={isFirst}
            className={[
              "lg:hidden",
              "absolute left-2 top-1/2 -translate-y-1/2 z-20",
              "h-10 w-10 rounded-full bg-black/25 backdrop-blur",
              "flex items-center justify-center text-white transition",
              isFirst ? "opacity-30 cursor-not-allowed" : "hover:opacity-90",
            ].join(" ")}
            aria-label={t.aria.prev}
            type="button"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            disabled={isLastMobile}
            className={[
              "lg:hidden",
              "absolute right-2 top-1/2 -translate-y-1/2 z-20",
              "h-10 w-10 rounded-full bg-black/25 backdrop-blur",
              "flex items-center justify-center text-white transition",
              isLastMobile ? "opacity-30 cursor-not-allowed" : "hover:opacity-90",
            ].join(" ")}
            aria-label={t.aria.next}
            type="button"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Setas - DESKTOP (fora/maiores) */}
          <button
            onClick={prev}
            className="hidden lg:flex absolute top-1/2 -left-14 xl:-left-20 -translate-y-1/2 text-white p-2 rounded-xl hover:bg-white/10 transition"
            aria-label={t.aria.prev}
            type="button"
          >
            <ArrowLeft className="w-12 h-12" />
          </button>

          <button
            onClick={next}
            className="hidden lg:flex absolute top-1/2 -right-14 xl:-right-20 -translate-y-1/2 text-white p-2 rounded-xl hover:bg-white/10 transition"
            aria-label={t.aria.next}
            type="button"
          >
            <ArrowRight className="w-12 h-12" />
          </button>
        </div>

        {/* Indicadores */}
        {/* Mobile: 1 por depoimento */}
        <div className="lg:hidden flex justify-center gap-2 sm:gap-3 mt-8 flex-wrap">
          {indicatorsMobile.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={[
                "rounded-full transition-all duration-300",
                page === i ? "bg-white w-3 h-3 scale-125" : "bg-white/40 w-2.5 h-2.5 hover:bg-white/60",
              ].join(" ")}
              aria-label={t.aria.goToSlide.replace("{n}", String(i + 1))}
              aria-current={page === i ? "true" : "false"}
              type="button"
            />
          ))}
        </div>

        {/* Desktop: 1 por “página” (2 depoimentos) */}
        <div className="hidden lg:flex justify-center gap-3 mt-10 flex-wrap">
          {indicatorsDesktop.map((_, i) => {
            // no desktop, cada página = 2 cards => o "page real" é i
            const active = page === i; // se quiser, dá pra sincronizar melhor; já fica ok.
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={[
                  "rounded-full transition-all duration-300",
                  active ? "bg-white w-3 h-3 scale-125" : "bg-white/40 w-2.5 h-2.5 hover:bg-white/60",
                ].join(" ")}
                aria-label={t.aria.goToSlide.replace("{n}", String(i + 1))}
                aria-current={active ? "true" : "false"}
                type="button"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
