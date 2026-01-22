"use client";
import { useMemo, useState } from "react";
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

  const scrollNext = () => setCurrentIndex((prev) => (prev + 1) % valores.length);
  const scrollPrev = () => setCurrentIndex((prev) => (prev - 1 + valores.length) % valores.length);

  const visibleCards = useMemo(() => {
    const cards: Array<(typeof valores)[number] & { position: number }> = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + valores.length) % valores.length;
      cards.push({ ...valores[index], position: i });
    }
    return cards;
  }, [currentIndex, valores]);

  return (
    <section className="relative w-full bg-primary overflow-hidden py-16 md:py-20 lg:py-28 min-h-[70vh] flex items-center justify-center">
      {/* Grafismo de fundo */}
      <div className="absolute inset-0">
        <Image
          src="/grafismo_horizontal.png"
          alt=""
          fill
          className="object-cover scale-y-[-1]"
          priority={false}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Título */}
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#95c743] mb-8 md:mb-12 text-center">
          {t.heading}
        </h2>

        <div className="relative w-full max-w-[1200px] mx-auto">
          {/* Setas de Navegação */}
          <button
            onClick={scrollPrev}
            className="
              absolute left-0 sm:left-3 top-1/2 -translate-y-1/2 z-20
              h-10 w-10 sm:h-12 sm:w-12
              rounded-full bg-black/20 backdrop-blur
              flex items-center justify-center
              text-white hover:opacity-90 transition
              md:left-0 md:bg-transparent md:backdrop-blur-0
            "
            aria-label={t.aria.prev}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={scrollNext}
            className="
              absolute right-0 sm:right-3 top-1/2 -translate-y-1/2 z-20
              h-10 w-10 sm:h-12 sm:w-12
              rounded-full bg-black/20 backdrop-blur
              flex items-center justify-center
              text-white hover:opacity-90 transition
              md:right-0 md:bg-transparent md:backdrop-blur-0
            "
            aria-label={t.aria.next}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* =======================
             MOBILE
             ======================= */}
          <div className="md:hidden flex justify-center">
            {/* Janela de visualização com overflow hidden */}
            <div className="w-full max-w-[260px] overflow-hidden">
              {/* Trilho que se move (Track) */}
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {valores.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <div className="
                      rounded-2xl 
                      bg-white-10 backdrop-blur-sm 
                      border border-white/10 
                      p-4
                      flex flex-col items-center justify-center 
                      shadow-xl 
                      min-h-[220px]
                      mx-auto
                    ">
                      <h3 className="font-medium text-white text-center mb-4 text-base leading-tight">
                        {item.title}
                      </h3>

                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={130}
                        height={130}
                        className="transition-all duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =======================
             DESKTOP/TABLET: 3 cards
             ======================= */}
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 w-full">
            {visibleCards.map((valor, idx) => {
              const isCenter = valor.position === 0;

              return (
                <div
                  key={`${valor.id}-${idx}`}
                  className={[
                    "transition-all duration-500",
                    isCenter ? "w-full max-w-sm opacity-100 scale-100" : "w-full max-w-xs opacity-50 scale-95",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "rounded-2xl bg-white-10 backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center shadow-xl transition-all duration-500",
                      isCenter ? "min-h-[340px]" : "min-h-[280px]",
                    ].join(" ")}
                  >
                    <h3
                      className={[
                        "font-medium text-white text-center mb-6 transition-all duration-500",
                        isCenter ? "text-xl" : "text-lg",
                      ].join(" ")}
                    >
                      {valor.title}
                    </h3>

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
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {valores.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={[
                "h-2 rounded-full transition-all",
                index === currentIndex ? "bg-[#95c743] w-8" : "bg-white/30 w-2",
              ].join(" ")}
              aria-label={t.aria.goToValue.replace("{n}", String(index + 1))}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}