import Image from "next/image";

export default function TrilhaBeneficiosEdu() {
    return (
        <section className="relative w-full bg-primary overflow-hidden -mt-8">
            {/* FUNDO: imagem beneficios (direita) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/2">
                    <Image
                        src="/solucoes/beneficios.png"
                        alt=""
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
            </div>

            {/* FUNDO: grafismo por cima */}
            <div className="absolute inset-0 pointer-events-none z-[1] mt-[200px]">
                <Image
                    src="/grafismo_solucoes.png"
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-40"
                />
            </div>

            {/* CONTEÚDO */}
            <div className="relative max-w-7xl mx-auto px-6 z-10">
                {/* SVG da trilha */}
                <TrilhaSVG />

                {/* CARDS */}
                <div className="relative pt-[150px]">
                    {/* Linha 1 */}
                    <div className="flex justify-around mb-30">
                        <Card text="Relatórios" />
                        <Card text="Gestão de atividades e avaliações" />
                        <Card text="Gestão de turmas customizadas" />
                    </div>

                    {/* Linha 2 */}
                    <div className="flex justify-center gap-32 mb-28">
                        <Card text="Grade de aulas" />
                        <Card text="Gestão de notas" />
                    </div>

                    {/* Linha 3 */}
                    <div className="flex justify-around">
                        <Card text="Compromissos e alertas" />
                        <Card text="Banco de questões" />
                        <Card text="Diário de classe digital" />
                    </div>

                    {/* quadro Call to action */}
                    <div
                        className="
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
                        mt-35 ml-103
                        "
                    >
                        <div className="text-center space-y-2">
                            <span className="block text-white text-lg font-medium">
                                Quer a solução perfeita para ampliar conhecimento em sua empresa?
                            </span>
                            <p className="text-secondary text-md">
                                Fale com os nossos especialistas.
                            </p>
                        </div>

                        <button
                            className="
                            mt-6
                            px-8 py-3
                            rounded-full
                            bg-secondary text-primary
                            font-semibold
                            hover:bg-white/90
                            transition
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



function TrilhaSVG() {
    return (
        <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1007px] h-[1201px] pointer-events-none"
            viewBox="0 86 1007 1201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                filter="url(#filter0_d_1_231)"
                transform="translate(503.5, 0) scale(1.12, 1) translate(-503.5, 0)"
            >
                <path
                    d="M106 289H90C90 280.163 97.1635 273 106 273V289ZM106 523.101V539.101C97.1635 539.101 90 531.938 90 523.101H106ZM901 523.101V507.101C909.837 507.101 917 514.265 917 523.101H901ZM901 289H917C917 297.837 909.837 305 901 305V289ZM901 755H917C917 763.837 909.837 771 901 771V755ZM107 755H91C91 746.163 98.1635 739 107 739V755ZM107 1090.5V1106.5C98.1635 1106.5 91 1099.34 91 1090.5H107ZM310.5 1074.5H326.5V1106.5H310.5V1090.5V1074.5ZM106 289H122V523.101H106H90V289H106ZM622.004 523.101V507.101H861.834V523.101V539.101H622.004V523.101ZM861.834 523.101V507.101H901V523.101V539.101H861.834V523.101ZM622.004 289V305H382.174V289V273H622.004V289ZM382.174 289V305H106V289V273H382.174V289ZM901 289V305H622.004V289V273H901V289ZM106 523.101V507.101H382.174V523.101V539.101H106V523.101ZM382.174 523.101V507.101H622.004V523.101V539.101H382.174V523.101ZM622.004 755V771H382.174V755V739H622.004V755ZM901 755V771H841.47V755V739H901V755ZM841.47 755V771H622.004V755V739H841.47V755ZM382.174 755V771H107V755V739H382.174V755ZM901 86H917V289H901H885V86H901ZM901 523.101H917V663.5H901H885V523.101H901ZM901 663.5H917V755H901H885V663.5H901ZM107 755H123V1090.5H107H91V755H107ZM107 1090.5V1074.5H310.5V1090.5V1106.5H107V1090.5Z"
                    fill="#91AF51"
                />
            </g>

            <defs>
                <filter
                    id="filter0_d_1_231"
                    x="0"
                    y="0"
                    width="1007"
                    height="1200.5"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="18" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.85 0"
                    />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_231" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_231" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}

function Card({ text }: { text: string }) {
    return (
        <div className="relative z-10 w-50 h-30 bg-blue-800 rounded-xl flex items-center justify-center px-6 text-center shadow-lg">
            <span className="text-white font-semibold text-lg leading-snug">
                {text}
            </span>
        </div>
    );
}
