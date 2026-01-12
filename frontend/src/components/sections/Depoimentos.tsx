"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";


// TIPOS E DADOS
interface Depoimento {
  id: number;
  nome: string;
  titulo: string;
  formacao: string[];
  imagem: string;
  texto: string;
}

const DEPOIMENTOS: Depoimento[] = [
  {
    id: 1,
    nome: "Rosemary Aparecida Ribeiro",
    titulo: "Auxiliar de Secretaria",
    formacao: ["Cursando Pedagogia"],
    imagem: "/depoimentos/Rosemary-Aparecida-Ribeiro.png",
    texto:
      "A GEDUI é uma excelente plataforma para os alunos, proporcionando suporte para estudos e atividades. Durante a pandemia, tornou-se de utilidade prioritária para o acesso dos alunos e comunicação com os pais. A plataforma me auxilia a economizar tempo com os diários dos professores, boletins, atas e verificação dos trabalhos, contribuindo para uma gestão eficiente de tempo e recursos.",
  },
  {
    id: 2,
    nome: "Soraia Véras",
    titulo: "Professora",
    formacao: [
      "Licenciatura em Letras e Pedagogia",
      "Pós-Graduação - Psicopedagogia",
    ],
    imagem: "/depoimentos/Soraia_Veras.png",
    texto:
      "A Gedui é um facilitador incrível para meu trabalho como professora. Acesso fácil às ferramentas, diário disponível, eficácia na duplicação de conteúdos. Durante a pandemia, proporcionou aos alunos acesso total às atividades e aos pais, controle em tempo real das aulas. Agradeço à equipe Gedui pelo apoio constante e por facilitar nossa prática educacional.",
  },
  {
    id: 3,
    nome: "Rev. Heitor Beranger Junior",
    titulo: "Docente em Letras",
    formacao: [
      "Colégios Tableau - Sorocaba",
      "Colégio Objetivo - Salto de Pirapora",
    ],
    imagem: "/depoimentos/Heitor_Beranger.png",
    texto:
      "Após anos buscando a solução ideal em softwares de gestão escolar, encontrei na GEDUI um sistema surpreendente. Sua desenvoltura, praticidade e alcance são notáveis. A plataforma é leve, acessível em rede, e responde eficientemente às necessidades diárias do profissional da educação. Encontrar essa solução foi um marco para otimizar minha prática educacional e gestão escolar de forma eficaz.",
  },
  {
    id: 4,
    nome: "Claudio Rodrigues de Proença",
    titulo: "Professor de Geografia",
    formacao: [
      "Colégio Tableau Sorocaba",
      "Seminário João Paulo II",
      "Curso Direto, Universidade Aberta do Brasil",
    ],
    imagem: "/depoimentos/Claudio-Rodrigues-de-Proenca.png",
    texto:
      "O ecossistema tem ferramentas incríveis, proporcionando uma conexão direta e eficiente entre alunos, professores, famílias e a escola. Com fácil manuseio, otimiza tarefas diárias, como o lançamento de notas, de forma clara e confiável. A segurança e tranquilidade que oferece fazem toda a diferença, tornando-o sempre a minha escolha pelos benefícios proporcionados.",
  },
  {
    id: 5,
    nome: "Silvia Graciete Oliveira De Almeida",
    titulo: "Secretária",
    formacao: ["Objetivo Salto de Pirapora"],
    imagem: "/depoimentos/Silvia_Objetivo.png",
    texto:
      "A interface da Gedui é muito fácil e intuitiva de ser utilizada, ajudando muito na secretaria tornando a parte de gestão muito mais fácil e objetiva.",
  },
];

// CONSTANTES
const CARDS_PER_VIEW = {
  mobile: 1,
  tablet: 1,
  desktop: 2,
} as const;

// COMPONENTES DE ÍCONES
interface ArrowIconProps {
  className?: string;
}

const ArrowLeft = ({ className = "w-12 h-12" }: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const ArrowRight = ({ className = "w-12 h-12" }: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

// COMPONENTE DO CARD
interface DepoimentoCardProps {
  depoimento: Depoimento;
}

const DepoimentoCard = ({ depoimento }: DepoimentoCardProps) => {
  return (
    <div className="bg-blue-900/40 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 h-auto sm:h-[500px]">
      {/* Coluna Esquerda - Pessoa */}
      <div className="flex flex-col items-center justify-center sm:items-center sm:w-[30%] flex-shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-3 border-4 border-blue-900/20">
          <Image
            src={depoimento.imagem}
            alt={depoimento.nome}
            className="w-full h-full object-cover"
            loading="lazy"
            fill
          />
        </div>
        <h3 className="text-white text-sm sm:text-base font-bold text-center sm:text-left mb-2 leading-tight">
          {depoimento.nome}
        </h3>
        <ul className="text-white text-xs sm:text-sm space-y-1 list-none text-center sm:text-left">
          <li className="flex items-start justify-center sm:justify-start">
            <span className="text-gray-200 mr-1.5 flex-shrink-0 mt-0.5">•</span>
            <span>{depoimento.titulo}</span>
          </li>
          {depoimento.formacao.map((item, index) => (
            <li
              key={index}
              className="flex items-start justify-center sm:justify-start"
            >
              <span className="text-gray-200 mr-1.5 flex-shrink-0 mt-0.5">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coluna Direita - Texto */}
      <div className="w-full sm:w-[70%] flex items-center justify-center">
        <p className="text-blue-950 text-xs sm:text-sm leading-relaxed bg-white/70 p-4 sm:p-5 rounded-xl h-full flex items-center">
          {depoimento.texto}
        </p>
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL
export default function DepoimentosCarrossel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW.desktop);

  // Atualizar cardsPerView baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setCardsPerView(CARDS_PER_VIEW.mobile);
      } else {
        setCardsPerView(CARDS_PER_VIEW.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcular o máximo de índices possíveis
  const maxIndex = DEPOIMENTOS.length - cardsPerView;

  // Validar índice atual
  const validatedIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

  // Handlers de navegação
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next > maxIndex ? maxIndex : next;
    });
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      return next < 0 ? 0 : next;
    });
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const isFirstSlide = validatedIndex === 0;
  const isLastSlide = validatedIndex >= maxIndex;

  return (
    <section className="bg-primary py-12 sm:py-16 md:py-24 relative overflow-hidden min-h-screen flex items-center w-full">
      {/* Grafismo decorativo de fundo */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 w-full">
        <Image
          src="/grafismo_horizontal.png"
          alt=""
          fill
          className="object-cover scale-y-[-1]"
          aria-hidden="true"
        />
      </div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl relative z-10">
        {/* Título */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 text-white">
            O que estão falando
          </h2>
          <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-lime-400">
            sobre a gente
          </p>
        </div>

        {/* Carrossel Container */}
        <div className="relative group">
          {/* Slides */}
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${validatedIndex * (cardsPerView === 1 ? 100 : 50 + 3)
                  }%)`,
              }}
            >
              {DEPOIMENTOS.map((depoimento) => (
                <div
                  key={depoimento.id}
                  className="flex-shrink-0"
                  style={{
                    width: cardsPerView === 1 ? "100%" : "calc(50% - 12px)",
                  }}
                >
                  <DepoimentoCard depoimento={depoimento} />
                </div>
              ))}
            </div>
          </div>

          {/* Botão Esquerda */}
          <button
            onClick={prevSlide}
            disabled={isFirstSlide}
            className={`absolute top-1/2 -left-12 lg:-left-16 xl:-left-20 transform -translate-y-1/2 text-white transition-all duration-200 z-20 hidden sm:flex items-center justify-center p-2 rounded-lg ${isFirstSlide
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:opacity-80 cursor-pointer hover:bg-white/10"
              }`}
            aria-label="Slide anterior"
          >
            <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </button>

          {/* Botão Direita */}
          <button
            onClick={nextSlide}
            disabled={isLastSlide}
            className={`absolute top-1/2 -right-12 lg:-right-16 xl:-right-20 transform -translate-y-1/2 text-white transition-all duration-200 z-20 hidden sm:flex items-center justify-center p-2 rounded-lg ${isLastSlide
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:opacity-80 cursor-pointer hover:bg-white/10"
              }`}
            aria-label="Próximo slide"
          >
            <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 flex-wrap">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${validatedIndex === index
                  ? "bg-white w-3 h-3 sm:w-3 sm:h-3 scale-125"
                  : "bg-white/40 w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 hover:bg-white/60"
                }`}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={validatedIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
