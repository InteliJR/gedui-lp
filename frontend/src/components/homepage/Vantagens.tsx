"use client";

import { useRef } from "react";
import Image from "next/image";
import { TrilhaSVG } from "@/components/common/TrilhaSVG";
import { useIntersection } from "@/hooks/useIntersection";

/* =======================
   TIPOS (i18n)
======================= */
export type VantagensGestaoDict = {
  heading: {
    line1: string;
    line2: string;
    highlight: string;
  };
  lists: {
    blue: string[];  // lista azul
    green: string[]; // lista verde
  };
  cards: string[]; // 8 cards (ordem importa)
};

/* =======================
   CARD
======================= */
const Card = ({
  titulo,
  className = "",
}: {
  titulo: string;
  className?: string;
}) => (
  <div
    className={`
      bg-[#0B4C95] text-white 
      rounded-xl shadow-lg backdrop-blur-sm
      flex items-center justify-center text-center
      aspect-square 
      w-full
      max-w-[130px] sm:max-w-[150px] md:max-w-[160px]
      p-3 md:p-4
      ${className}
    `}
  >
    <h3 className="text-xs sm:text-sm md:text-base font-medium leading-snug">
      {titulo}
    </h3>
  </div>
);

/* =======================
   COMPONENTE PRINCIPAL
======================= */
export default function VantagensGestao({ t }: { t: VantagensGestaoDict }) {
  const cardTitles = t.cards;

  const cardPositions = [
    // Linha inferior
    { title: cardTitles[0], x: "left-[10%]", y: "top-[80%]" },
    { title: cardTitles[1], x: "left-[37%]", y: "top-[80%]" },
    { title: cardTitles[2], x: "left-[63%]", y: "top-[80%]" },
    { title: cardTitles[3], x: "left-[90%]", y: "top-[80%]" },

    // Linha superior
    { title: cardTitles[4], x: "left-[10%]", y: "top-[20%]" },
    { title: cardTitles[5], x: "left-[37%]", y: "top-[20%]" },
    { title: cardTitles[6], x: "left-[63%]", y: "top-[20%]" },
    { title: cardTitles[7], x: "left-[90%]", y: "top-[20%]" },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const trilhaVisivel = useIntersection(sectionRef, 0.4);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-primary py-14 md:pt-14 overflow-visible"
    >
      {/* Fundo infinito */}
      <div className="absolute top-0 left-0 w-full h-[200%] z-0 pointer-events-none">
        <Image
          src="/grafismo_vertical.png"
          alt=""
          fill
          className="w-full -mt-150"
          priority
        />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-16 xl:px-28 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16">
        {/* Título */}
        <div className="w-full lg:w-[45%] flex justify-center items-center order-1 lg:order-2">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-xl max-w-md text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {t.heading.line1} <br />
              {t.heading.line2} <br />
              <span className="text-[#95c743] font-bold">
                {t.heading.highlight}
              </span>
            </h2>
          </div>
        </div>

        {/* Listas */}
        <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-[45%] order-2 lg:order-1">
          <div className="bg-[#042E60]/90 p-4 md:p-6 rounded-xl">
            <ul className="list-disc list-inside space-y-2 text-white">
              {t.lists.blue.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#9FE23A]/50 p-4 md:p-6 rounded-xl">
            <ul className="list-disc list-inside space-y-2 text-white">
              {t.lists.green.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* =======================
        GRID — MOBILE & TABLET
      ======================= */}
      <div className="relative z-10 w-full mt-16 lg:hidden flex justify-center">
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            gap-5 md:gap-6
            place-items-center
            max-w-[420px] md:max-w-[720px]
            px-4
          "
        >
          {cardTitles.map((title, index) => (
            <Card key={index} titulo={title} />
          ))}
        </div>
      </div>

      {/* =======================
         TRILHA — DESKTOP
      ======================= */}
      <div className="relative max-w-5xl mx-auto mt-24 hidden lg:block">
        <TrilhaSVG
          animate={trilhaVisivel}
          strokeWidth={12}
          glowWidth={12}
          speedSec={20}
          lightLen={50}
        />


        <div className="absolute inset-0 z-10">
          {cardPositions.map((pos, index) => (
            <Card
              key={index}
              titulo={pos.title}
              className={`
                absolute
                transform -translate-x-1/2 -translate-y-1/2
                ${pos.x} ${pos.y}
                w-[160px] h-[160px]
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
