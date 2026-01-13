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
                        className="text-2xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight max-w-5xl"
                    >
                        Aprender é evoluir. Aqui, você encontra conhecimento para ir além.
                    </h1>
                </article>
            </div>

            {/* Faixa azul inferior + CTA */}
            <footer className="absolute bottom-0 left-0 right-0">
                {/* Faixa azul */}
                <div
                    className="relative h-56 bg-primary flex items-center justify-center overflow-hidden"
                    style={{ clipPath: "polygon(0 25%, 100% 0, 100% 100%, 0 100%)" }}
                >
                    {/* GRAFISMO */}
                    <Image
                        src="/blog/grafismo_blog.png"
                        alt=""
                        width={750}
                        height={750}
                        aria-hidden="true"
                        className="absolute z-0 pointer-events-none select-none"
                    />

                    {/* CTA */}
                    <p
                        className="
                        relative
                        z-10
                        px-12
                        py-8
                        rounded-2xl
                        border border-white/20 w-xl
                        bg-white/10
                        backdrop-blur-md
                        shadow-[0_4px_30px_2px_#0E55A5]
                        text-4xl
                        text-white
                        flex items-center justify-center
                        "
                    >
                        Conheça o nosso <span className="text-secondary ml-2">blog</span>
                    </p>
                </div>

            </footer>
        </section>
    );
}
