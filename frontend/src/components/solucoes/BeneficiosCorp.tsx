import Image from "next/image";
import TrilhaBeneficiosCorp from "./TrilhaBeneficiosCorp";

export type BeneficiosCorpDict = {
  heading: string;
  description: string;
  aria: {
    logoAlt: string;
  };
  benefits: string[];
};

export default function SecaoBeneficiosCorp({ t }: { t: BeneficiosCorpDict }) {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* GRAFISMO (TOPO REAL, ABSOLUTO) */}
      <div className="absolute top-0 left-0 w-full h-[1000px] z-0 pointer-events-none -mt-50">
        <Image
          src="/solucoes/grafismo_corp.png"
          alt=""
          fill
          priority
          className="object-cover object-top opacity-40"
          aria-hidden="true"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full flex flex-col items-center space-y-8 px-8 pt-32 pb-16">
        <h2 className="p-8 bg-white/10 border border-white/10 backdrop-blur-md text-[#EBF0F2] text-center font-inter text-4xl font-bold rounded-lg max-w-4xl shadow-lg">
          {t.heading}
        </h2>

        <p className="max-w-6xl text-lg text-white/90 text-center">
          {t.description}
        </p>

        <div className="w-full flex flex-col lg:flex-row justify-between gap-6">
          <div className="lg:w-1/2 flex justify-center">
            <div className="backdrop-blur-md bg-white/10 p-8 border border-white/10 rounded-lg shadow-lg max-w-md">
              <ul className="list-disc list-outside pl-6 space-y-2 text-white text-base md:text-lg">
                {t.benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2 flex items-center justify-center">
            <Image
              src="/solucoes/logo_parcial.png"
              alt={t.aria.logoAlt}
              width={350}
              height={140}
              priority
            />
          </div>
        </div>

        {/* TRILHA SOLTA */}
        <TrilhaBeneficiosCorp t={t.trilha} />
      </div>
    </section>
  );
}
