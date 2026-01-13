"use client";

import { useRef } from "react";
import Image from "next/image";
import { useIntersection } from "@/hooks/useIntersection";
import { TrilhaBeneficiosCorpSVG } from "./TrilhaBeneficiosCorpSVG";

export default function TrilhaBeneficiosCorp() {
    const sectionRef = useRef<HTMLElement>(null);
    const animate = useIntersection(sectionRef, 0.4);

    const cards = [
        "Gestão de suporte ao usuário",
        "Feed de notícias inteligente",
        "Mural adaptativo interativo",
        "Interação digital",
        "Certificação",
        "Admin de rede",
        "Admin de unidades",
        "Criação de múltiplas organizações",
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-primary overflow-hidden -mt-8"
        >
            {/* FUNDO: imagem beneficios (desktop) */}
            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-1/2">
                    <Image
                        src="/solucoes/beneficios_corp.png"
                        alt=""
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </div>

            {/* MOBILE / TABLET */}
            <div className="relative z-10 lg:hidden px-6 py-20 flex flex-col items-center">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 place-items-center max-w-[420px] md:max-w-[720px]">
                    {cards.map((text, index) => (
                        <Card key={index} text={text} />
                    ))}
                </div>

                <CallToAction className="mt-16" />
            </div>

            {/* DESKTOP */}
            <div className="relative max-w-7xl mx-auto px-6 z-10 hidden lg:block">
                <TrilhaBeneficiosCorpSVG
                    animate={animate}
                    strokeWidth={12}
                    glowWidth={12}
                    speedSec={15}
                    lightLen={60}
                />

                <div className="relative pt-[150px]">
                    <div className="flex justify-around mb-30">
                        <Card text="Gestão de suporte ao usuário" />
                        <Card text="Feed de notícias inteligente" />
                        <Card text="Mural adaptativo interativo" />
                    </div>

                    <div className="flex justify-center gap-32 mb-28">
                        <Card text="Interação digital" />
                        <Card text="Certificação" />
                    </div>

                    <div className="flex justify-around">
                        <Card text="Admin de rede" />
                        <Card text="Admin de unidades" />
                        <Card text="Criação de múltiplas organizações" />
                    </div>

                    <CallToAction className="mt-35 ml-95" />
                </div>
            </div>
        </section>
    );
}

/* =========================
   CARD (mobile-first)
========================= */
function Card({ text }: { text: string }) {
    return (
        <div
            className="
            relative z-10
            w-[150px] h-[110px]
            sm:w-[170px] sm:h-[115px]
            md:w-[200px] md:h-[120px]
            bg-blue-800
            rounded-xl
            flex items-center justify-center
            px-4
            text-center
            shadow-lg
        "
        >
            <span className="text-white font-semibold text-sm sm:text-base leading-snug">
                {text}
            </span>
        </div>
    );
}

/* =========================
   CTA (reutilizável)
========================= */
function CallToAction({ className = "" }: { className?: string }) {
    return (
        <div
            className={`
                mx-auto
                max-w-md
                w-full
                flex flex-col items-center
                rounded-[10px]
                border border-[rgba(162,162,162,0.5)]
                bg-[rgba(162,162,162,0.10)]
                backdrop-blur-[7px]
                shadow-[0_4px_10px_rgba(0,0,0,0.15)]
                p-10 space-y-6
                ${className}
            `}
        >
            <div className="text-center space-y-2">
                <span className="block text-white text-lg font-medium">
                    Quer a solução perfeita para ampliar conhecimento em sua empresa?
                </span>
                <p className="text-secondary text-md">
                    Fale com os nossos especialistas.
                </p>
            </div>

            <button className="px-8 py-3 rounded-full bg-secondary text-primary font-semibold hover:bg-white/90 transition">
                Agendar demonstração
            </button>
        </div>
    );
}
