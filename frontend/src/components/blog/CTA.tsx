import Link from "next/link"

export default function CTA_Blog() {
    return (
        <div className="bg-primary">
            <div
                className="
                    mx-auto
                    w-full
                    max-w-[90%] sm:max-w-lg lg:max-w-4xl
                    px-6 pt-8 sm:px-10 py-10
                    rounded-3xl
                    border border-[rgba(162,162,162,0.3)]
                    bg-[rgba(162,162,162,0.10)]
                    shadow-[0_4px_10px_rgba(0,0,0,0.15)]
                    backdrop-blur-sm
                    flex flex-col items-center gap-4
                "
            >
                <h2 className="text-base sm:text-lg lg:text-3xl font-bold text-center text-white leading-snug">
                    Inove, conecte áreas e{" "}
                    <span className="text-secondary">aprenda!</span>
                </h2>


                <Link
                    href="/agendar"
                    className="
                        px-8 py-3
                        rounded-full
                        bg-gradient-to-r from-white to-[#0E55A5]/78
                        text-primary
                        font-semibold
                        text-sm sm:text-base
                        hover:bg-white
                        transition
                        -mb-15
                        shadow-[0_4px_30px_2px_#0E55A5]
                    "
                    role="menuitem"
                >
                    Agendar Demonstração
                </Link>
            </div>
        </div>
    )
}
