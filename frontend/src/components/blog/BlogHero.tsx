// src/components/sections/Hero.tsx

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
                    className="relative h-56 bg-primary flex items-center justify-center"
                    style={{clipPath: "polygon(0 25%, 100% 0, 100% 100%, 0 100%)"}}
                >
                    <div className="relative flex justify-center">
                        {/* GRAFISMO ATRÁS */}
                        <div
                            className="absolute inset-0 -z-10 bg-[url('/blog/grafismo_blog.png')] bg-no-repeat bg-center bg-cover opacity-40 pointer-events-none"
                            aria-hidden="true"
                        />

                        {/* CTA (botão visual) */}
                        <div className="px-10 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_4px_30px_2px_#0E55A5] text-lg font-semibold text-white flex items-center justify-center">
                            Conheça o nosso <span className="text-secondary ml-1">blog</span>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
}
