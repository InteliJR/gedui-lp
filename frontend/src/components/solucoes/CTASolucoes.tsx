export default function CTASolucoes() {
    return (
        <section
            className="
        relative w-full
        bg-primary
        py-24 md:py-32 min-h-screen
        flex items-center justify-center
        overflow-hidden
      "
            aria-labelledby="cta-solucoes-heading"
            role="region"
        >
            {/* Grafismo  */}
            <div
                className="
          absolute inset-0
          bg-[url('/solucoes/grafismo_solucoes.png')]
          bg-no-repeat bg-cover bg-center
          z-0
          opacity-70
        "
                aria-hidden="true"
            />

            {/* Conteúdo */}
            <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 lg:mx-20">
                <div className="space-y-8 flex flex-col w-full">

                    <div className="max-w-2xl lg:max-w-3xl">
                        <h2
                            id="cta-solucoes-heading"
                            className="font-semibold text-3xl md:text-5xl leading-tight text-white"
                        >
                            Com inovação e conhecimento{" "}
                            <span className="text-secondary">
                                impulsionamos o aprendizado dos indivíduos
                            </span>
                        </h2>
                    </div>

                    <div className="flex w-full justify-end">
                        <p className="text-md md:text-xl text-white/90 max-w-xl lg:max-w-3xl text-end italic">
                            Um ecossistema educacional, onde a gestão se consolida à informação,
                            capacitação e certificação para fortalecer o desenvolvimento do indivíduo.
                        </p>
                    </div>

                    <div className="w-full flex justify-center">
                        <button
                            className="
                mt-6
                rounded-full
                bg-gradient-to-r
                from-white to-secondary
                px-16 py-3
                text-lg font-semibold
                text-primary
                transition
                hover:opacity-95
                focus:outline-none focus:ring-2 focus:ring-secondary/60
                shadow-lg shadow-white/35
              "
                        >
                            Agendar demonstração
                        </button>
                    </div>

                </div>
            </div>

        </section>
    );
}
