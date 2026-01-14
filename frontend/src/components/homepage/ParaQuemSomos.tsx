"use client";
import Image from "next/image";

export type ParaQuemSomosDict = {
  notebook: {
    eyebrow: string;
    title: string;
  };
  cards: Array<{
    text: string;
    cta?: string;
    icon: string;
    iconSize: number;
    iconTop: string;
    iconHorizontal: string;
  }>;
  aria: {
    notebookAlt: string;
    logoAlt: string;
  };
};

// --- COMPONENTE DO ÍCONE DE SETA ---
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 transition-transform group-hover:translate-x-1"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default function ParaQuemSomos({ t }: { t: ParaQuemSomosDict }) {
  const targets = t.cards;

  return (
    <section className="w-full bg-[#05294F] py-20 lg:py-28 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        {/* COLUNA ESQUERDA - NOTEBOOK */}
        <div className="relative lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-1/2 flex items-center">
          <div className="relative w-full max-w-[700px] -ml-6 sm:-ml-8 md:-ml-12 lg:-ml-9">
            {/* WRAPPER DO NOTEBOOK COM ASPECT RATIO */}
            <div className="relative w-full aspect-[1000/700]">
              {/* Notebook */}
              <Image
                src="/quem-somos/notebook.png"
                alt={t.aria.notebookAlt}
                fill
                className="object-contain"
                priority
              />

              {/* Logo dentro do notebook */}
              <div
                className="absolute z-20"
                style={{ top: "15%", right: "35%", width: "13%" }}
              >
                <Image
                  src="/quem-somos/logo.svg"
                  alt={t.aria.logoAlt}
                  width={200}
                  height={200}
                  className="w-full h-auto opacity-90"
                />
              </div>

              {/* Texto dentro do notebook */}
              <div
                className="absolute z-20 text-white"
                style={{ top: "28%", left: "8%", width: "60%" }}
              >
                <p className="ttext-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-[#95c743] mb-3">
                  {t.notebook.eyebrow}
                </p>
                <h2 className="mx-1 text-[0.6rem] sm:text-xs md:text-sm lg:text-base font-light leading-snug">
                  {t.notebook.title}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA - CARDS CUSTOMIZÁVEIS */}
        <div className="hidden lg:block"></div>

        <div className="relative flex flex-col gap-6 px-6 lg:pl-0 lg:pr-6 xl:pl-2 xl:pr-8 mt-14 lg:mt-0">
          {targets.map((item, index) => (
            <div key={index} className="relative">
              {/* Ícone flutuante com configurações individuais */}
              <div className={`absolute z-20 ${item.iconTop} ${item.iconHorizontal}`}>
                <Image
                  src={item.icon}
                  alt=""
                  width={item.iconSize}
                  height={item.iconSize}
                  className="drop-shadow-2xl opacity-95"
                />
              </div>

              {/* CARD */}
              <div className="relative rounded-2xl bg-gradient-to-r from-[#0d3c7c] to-[#0a2f63] p-5 sm:p-6 shadow-lg transition-transform hover:scale-[1.02] hover:shadow-2xl">
                <div className="flex flex-col">
                  <p className="text-sm sm:text-base text-white leading-relaxed mb-4">
                    {item.text}
                  </p>

                  <div className="flex justify-end">
                    {item.cta ? (
                      <button className="group inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#0d3c7c] hover:scale-105 hover:shadow-lg cursor-pointer">
                        <span>{item.cta}</span>
                        <ArrowIcon />
                      </button>
                    ) : (
                      <button className="group flex h-10 w-10 items-center justify-center rounded-full border border-white text-white transition-all duration-300 hover:bg-white hover:text-[#0d3c7c] hover:scale-110 hover:shadow-lg cursor-pointer">
                        <ArrowIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
