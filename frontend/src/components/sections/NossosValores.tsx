"use client";
import { useState } from "react";
import Image from "next/image";

export type NossosValoresDict = {
  heading: string;
  aria: {
    prev: string;
    next: string;
    goToValue: string;
  };
  items: Array<{
    id: number;
    title: string;
    icon: string;
  }>;
};

export default function NossosValores({ t }: { t: NossosValoresDict }) {
  const valores = t.items;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel infinito
  const scrollNext = () => {
    setCurrentIndex((prev) => (prev + 1) % valores.length);
  };

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + valores.length) % valores.length);
  };

  // Função para obter os 3 cards visíveis
  const getVisibleCards = () => {
    const cards: Array<
      (typeof valores)[number] & { position: number }
    > = [];

    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + valores.length) % valores.length;
      cards.push({ ...valores[index], position: i });
    }
    return cards;
  };

  return (
    <section className="relative w-full bg-primary py-20 lg:py-28 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Grafismo de fundo */}
      <div className="absolute inset-0 opacity-100">
        <Image src="/valores/grafismo.svg" alt="" fill className="object-cover" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        {/* Título */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#95c743] mb-12 lg:mb-16 text-center">
          {t.heading}
        </h2>

        <div className="relative flex items-center justify-center w-full">
          {/* Botão anterior */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 z-20 flex items-center justify-center p-4 text-white cursor-pointer hover:opacity-80 transition"
            aria-label={t.aria.prev}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Container dos 3 cards */}
          <div className="flex items-center justify-center gap-8 w-full max-w-[1600px] mx-auto">
            {getVisibleCards().map((valor, idx) => {
              const isCenter = valor.position === 0;

              return (
                <div
                  key={`${valor.id}-${idx}`}
                  className={`transition-all duration-500 ${isCenter
                      ? "w-[340px] scale-100 opacity-100"
                      : "w-[260px] scale-90 opacity-50"
                    }`}
                >
                  <div
                    className={`rounded-2xl bg-gradient-to-br from-[#A2A2A2]/20 backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center shadow-xl transition-all duration-500 ${isCenter ? "h-[340px]" : "h-[260px]"
                      }`}
                  >
                    {/* Título acima */}
                    <h3
                      className={`font-medium text-white text-center mb-6 transition-all duration-500 ${isCenter ? "text-xl" : "text-lg"
                        }`}
                    >
                      {valor.title}
                    </h3>

                    {/* Imagem abaixo */}
                    <Image
                      src={valor.icon}
                      alt={valor.title}
                      width={isCenter ? 200 : 170}
                      height={isCenter ? 200 : 170}
                      className="transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão próximo */}
          <button
            onClick={scrollNext}
            className="absolute right-0 z-20 flex items-center justify-center p-4 text-white cursor-pointer hover:opacity-80 transition"
            aria-label={t.aria.next}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {valores.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex ? "bg-[#95c743] w-8" : "bg-white/30 w-2"
                }`}
              aria-label={t.aria.goToValue.replace("{n}", String(index + 1))}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
