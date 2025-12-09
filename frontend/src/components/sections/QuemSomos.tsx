export default function QuemSomos() {
    return (
        <section
            className="min-h-screen w-full bg-primary bg-[url('/grafismo_horizontal.png')] bg-no-repeat bg-cover bg-center"
            aria-labelledby="quem-somos-heading"
            role="region"
        >

            {/* content */}
            <div className="relative mx-auto px-4 sm:px-6 lg:px-8 lg:mx-20 min-h-screen flex items-center justify-center">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* COLUNA ESQUERDA */}
                    <div className="space-y-10 flex flex-col items-center lg:items-start h-full">

                        {/* Quem somos */}
                        <article
                            className="max-w-2xl text-center lg:text-left rounded-xl bg-white/1 backdrop-blur-sm border border-white/20 shadow-lg space-y-5 p-10"
                            aria-labelledby="quem-somos-heading"
                        >
                            <h2
                                id="quem-somos-heading"
                                className="font-semibold text-2xl text-center"
                            >
                                Quem somos
                            </h2>

                            <p className="text-lg leading-relaxed text-center">
                                Uma equipe formada por pessoas apaixonadas pela educação e inovação, que valoriza o poder da tecnologia para quebrar as barreiras tradicionais de aprendizado e impactar positivamente o desenvolvimento pessoal, acadêmico e profissional.
                            </p>
                        </article>

                        {/* O que fazemos */}
                        <article
                            className="max-w-2xl text-center lg:text-left rounded-xl bg-white/1 backdrop-blur-sm border border-white/20 shadow-lg space-y-5 p-10"
                            aria-labelledby="o-que-fazemos-heading"
                        >
                            <h2
                                id="o-que-fazemos-heading"
                                className="font-semibold text-2xl text-center"
                            >
                                O que fazemos
                            </h2>

                            <p className="text-lg leading-relaxed text-center">
                                Contribuímos para a transformação social por meio da educação, preparando os indivíduos para os desafios e oportunidades do futuro. Capacitamos indivíduos com soluções que tornam o aprendizado mais dinâmico, eficiente e inclusivo.
                            </p>
                        </article>

                    </div>

                    {/* COLUNA DIREITA */}
                    <div className="flex items-center justify-center lg:justify-end">
                        <aside
                            className="max-w-2xl w-full rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg p-10"
                            aria-label="Vídeo institucional"
                        >
                            {/* vídeo futuramente */}
                        </aside>
                    </div>

                </div>
            </div>
        </section>
    );
}
