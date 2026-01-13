// src/components/sections/Hero.tsx
import Image from "next/image";

export default function BlogHero() {
    return (
        <section
            className="relative min-h-screen text-white overflow-hidden bg-[url('/blog/hero_blog.jpg')] bg-cover bg-[length:100%_auto] bg-top bg-no-repeat -mt-16"
            aria-labelledby="hero-heading"
            role="region"
        >
            {/*background overlay */}
            <div
                className="absolute inset-0 bg-blur-sm bg-primary/60"
                aria-hidden="true"
            />

            <div className="relative px-4 sm:px-6 lg:px-8 lg:mx-20 pt-32 md:pt-40 pb-20">
                {/* Coluna da esquerda (texto e botão) */}
                <article className="text-left mt-20">
                    <h1
                        id="blog-hero-heading"
                        className="text-3xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight max-w-5xl"
                    >
                        Aprender é evoluir. Aqui, você encontra conhecimento para ir além.
                    </h1>
                </article>
            </div>

            {/* Faixa azul inferior + CTA */}
            <footer className="absolute bottom-0 left-0 right-0">
                {/* Faixa azul */}
                <div className="relative h-72 md:h-90 overflow-hidden">
                    {/* FUNDO EM SVG */}
                    <svg
                        viewBox="0 0 1440 329"
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M-1.36929 0C45.0498 -5.34058e-05 814.05 108.5 1438.63 93C2063.21 77.5 1438.63 329 1438.63 329H-1.36929C-1.36929 329 -47.7884 5.34058e-05 -1.36929 0Z"
                            fill="#05294F"
                        />
                    </svg>

                    {/* GRAFISMO */}
                    <Image
                        src="/blog/grafismo_blog.png"
                        alt=""
                        width={750}
                        height={750}
                        aria-hidden="true"
                        className="
                            hidden md:block
                            absolute
                            left-1/2
                            -translate-x-1/2
                            bottom-[-10px]
                            z-0
                            pointer-events-none
                            select-none
                        "
                    />

                    {/* CTA */}
                    <p
                        className="
                            absolute
                            bottom-20
                            left-1/2
                            -translate-x-1/2
                            z-10

                            w-[min(80vw,520px)] md:w-[min(80vw,550px)]
                            px-6 sm:px-8 md:px-12
                            py-5 sm:py-6 md:py-8

                            rounded-2xl
                            border border-white/20
                            bg-white/10
                            backdrop-blur-md
                            shadow-[0_4px_30px_2px_#0E55A5]

                            text-xl sm:text-2xl md:text-4xl
                            text-white
                            text-center
                            flex items-center justify-center
                            leading-snug
                        "
                    >
                        Conheça o nosso <span className="text-secondary ml-2">blog</span>
                    </p>
                </div>
            </footer>
        </section>
    );
}
