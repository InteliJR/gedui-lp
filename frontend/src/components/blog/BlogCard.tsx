import Link from "next/link";
import Image from "next/image";

export type BlogCardDict = {
  readMoreLabel: string;
  readMoreAriaLabel: string; // pode usar com {title} se quiser
};

interface BlogCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  isImageLeft: boolean;
  t: BlogCardDict;
}

export default function BlogCard({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  link,
  isImageLeft,
  t,
}: BlogCardProps) {
  const aria = t.readMoreAriaLabel.replace("{title}", title);

  return (
    <section className="relative w-full h-[520px] md:h-[580px] overflow-hidden bg-[#05294F]">
      {/* Container com layout lado a lado */}
      <div className="absolute inset-0 flex">
        {/* Imagem - lado esquerdo OU direito, ocupando ~45% */}
        {isImageLeft && (
          <div className="relative w-0 md:w-[45%] hidden md:block py-4">
            <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />

            {/* Overlay com bordas transparentes */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 150% 150% at 50% 50%,
                    transparent 0%,
                    transparent 50%,
                    rgba(5, 41, 79, 0.05) 60%,
                    rgba(5, 41, 79, 0.1) 70%,
                    rgba(5, 41, 79, 0.2) 80%,
                    rgba(5, 41, 79, 0.35) 90%,
                    rgba(5, 41, 79, 0.5) 100%
                  ),
                  linear-gradient(to right, rgba(5, 41, 79, 0.2) 0%, transparent 25%, transparent 75%, rgba(5, 41, 79, 0.2) 100%),
                  linear-gradient(to bottom, rgba(5, 41, 79, 0.15) 0%, transparent 25%, transparent 75%, rgba(5, 41, 79, 0.15) 100%)
                `,
              }}
            />

            {/* Gradiente radial sobre a imagem */}
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_left,_#0E55A5_0%,_#05294F_65%,_#05294F_100%)]
                opacity-65
                mix-blend-multiply
              "
            />
          </div>
        )}

        {/* Gradiente de transição suave entre imagem e conteúdo */}
        {isImageLeft && (
          <div className="hidden md:block absolute right-[52%] top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-[#05294F] to-[#05294F] opacity-70 pointer-events-none" />
        )}

        {/* Conteúdo - lado direito OU esquerdo */}
        <div
          className={`w-full md:w-[55%] bg-[#05294F] flex items-center px-8 md:px-12 lg:px-16 ${!isImageLeft ? "order-first" : ""
            }`}
        >
          <div className="w-full">
            <h2 className="text-2xl md:text-[32px] font-semibold text-white opacity-80">
              {subtitle}
            </h2>

            <h1 className="text-3xl md:text-[40px] font-semibold leading-tight mt-2 text-white">
              {title}
            </h1>

            <p className="mt-6 text-base md:text-[20px] leading-relaxed opacity-90 text-white font-light">
              {description}
            </p>

            {/* Botão com SVG (chevron) */}
            <Link
              href={link}
              aria-label={aria}
              className="group mt-8 inline-flex items-center px-4 py-3 bg-[#A4FF39] text-[#05294F] font-medium rounded-full hover:bg-[#b8ff66] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#9fe12a] cursor-pointer"
            >
              <span className="select-none">{t.readMoreLabel}</span>

              <svg
                className="ml-3 w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M8 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Imagem - lado direito OU esquerdo, ocupando ~45% */}
        {!isImageLeft && (
          <div className="relative w-0 md:w-[45%] hidden md:block ml-auto py-4">
            <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />

            {/* Overlay com bordas transparentes */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 150% 150% at 50% 50%,
                    transparent 0%,
                    transparent 50%,
                    rgba(5, 41, 79, 0.05) 60%,
                    rgba(5, 41, 79, 0.1) 70%,
                    rgba(5, 41, 79, 0.2) 80%,
                    rgba(5, 41, 79, 0.35) 90%,
                    rgba(5, 41, 79, 0.5) 100%
                  ),
                  linear-gradient(to left, rgba(5, 41, 79, 0.2) 0%, transparent 25%, transparent 75%, rgba(5, 41, 79, 0.2) 100%),
                  linear-gradient(to bottom, rgba(5, 41, 79, 0.15) 0%, transparent 25%, transparent 75%, rgba(5, 41, 79, 0.15) 100%)
                `,
              }}
            />

            {/* Gradiente radial sobre a imagem */}
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_right,_#0E55A5_0%,_#05294F_65%,_#05294F_100%)]
                opacity-65
                mix-blend-multiply
              "
            />
          </div>
        )}

        {/* Gradiente de transição suave entre conteúdo e imagem (lado direito) */}
        {!isImageLeft && (
          <div className="hidden md:block absolute left-[52%] top-0 bottom-0 w-28 bg-gradient-to-l from-transparent via-[#05294F] to-[#05294F] opacity-70 pointer-events-none" />
        )}
      </div>

      {/* Mobile: Imagem como fundo */}
      <div className="md:hidden absolute inset-0">
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_left,_#0E55A5_0%,_#05294F_65%,_#05294F_100%)]
            opacity-65
            mix-blend-multiply
          "
        />

        <div className="absolute inset-0 bg-[#05294F] opacity-40" />
      </div>

      {/* Conteúdo mobile */}
      <div className="md:hidden relative z-10 h-full flex items-center px-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-white opacity-80">
            {subtitle}
          </h2>

          <h1 className="text-2xl font-semibold leading-tight mt-2 text-white">
            {title}
          </h1>

          <p className="mt-4 text-base leading-relaxed opacity-90 text-white font-light">
            {description}
          </p>

          <Link
            href={link}
            aria-label={aria}
            className="group mt-4 inline-flex items-center px-6 py-3 bg-[#A4FF39] text-[#05294F] font-medium rounded-full hover:bg-[#b8ff66] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#9fe12a] cursor-pointer"
          >
            <span className="select-none">{t.readMoreLabel}</span>
            <svg
              className="ml-3 w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M8 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
