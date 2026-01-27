import Image from "next/image";
import TrilhaBeneficiosEdu from "./TrilhaBeneficiosEdu";

export type BeneficiosEduDict = {
    heading: string;
    description: string;
    aria: {
        logoAlt: string;
    };
    benefits: string[];
};

export default function SecaoBeneficiosEdu({ t }: { t: BeneficiosEduDict }) {
    return (
        <section className="bg-primary p-8 flex flex-col items-center space-y-15">
            <h2 className="p-8 bg-white/1 border border-white/10 backdrop-blur-md text-[#EBF0F2] text-center font-inter text-4xl font-bold rounded-lg max-w-4xl shadow-lg">
                {t.heading}
            </h2>

            <p className="md:w-7xl text-lg text-white/90">
                {t.description}
            </p>

            <div className="w-full flex flex-col lg:flex-row justify-between space-y-6">
                <div className="lg:w-1/2 flex items-center justify-center">
                    <Image
                        src={"/solucoes/logo_parcial.png"}
                        alt={t.aria.logoAlt}
                        width={350}
                        height={140}
                    />
                </div>

                <div className="lg:w-1/2 flex justify-center">
                    <div className="backdrop-blur-md bg-white/1 p-8 border border-white/10 rounded-lg shadow-lg max-w-xl">
                        <ul className="list-disc list-outside pl-6 space-y-2 text-white text-base md:text-lg">
                            {t.benefits.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <TrilhaBeneficiosEdu t={t.trilha} />
        </section>
    );
}
