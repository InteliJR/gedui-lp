// src/components/sections/Hero.tsx
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen text-white overflow-hidden bg-[url('/hero_bg.jpg')] bg-cover bg-[length:100%_auto] bg-top bg-no-repeat -mt-16">
      {/*background overlay */}
      <div className="absolute inset-0 bg-blur-sm bg-[rgba(5,41,79,0.9)]" />
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 lg:mx-20 pt-32 md:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna da esquerda (texto e botão) */}
          <div className="text-center lg:text-left mt-20">

            <h1 className="text-2xl md:text-5xl lg:text-3xl font-bold mb-6 leading-tight max-w-lg">
              Impulsione o futuro de sua empresa ou escola com conhecimento e tecnologia
            </h1>

            <p className="text-xl md:text-xl text-sky-100 mb-8 leading-relaxed max-w-xl">
              Transformamos a educação com soluções inovadoras por meio do conhecimento e da informação.
            </p>

            <p className="text-xl md:text-xl text-sky-100 mb-8 leading-relaxed max-w-xl">
              Nosso ecossistema educacional impulsiona o desempenho individual de alunos e colaboradores e é um facilitador para gestores e professores.
            </p>

            <div className="flex flex-col gap-4 items-center justify-center lg:justify-start lg:items-start">
              <Link
                href="/agendar"
                className="bg-secondary text-black px-8 py-4 rounded-full max-w-65 text-center hover:bg-sky-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Agendar Demonstração
              </Link>

              <p className="w-65 text-center text-sm italic">
                Acessar mais informações
              </p>

            </div>
          </div>

          {/* Coluna direita (logo)*/}
          <div className="relative hidden lg:flex items-center justify-center lg:justify-end lg:-translate-x-[-70px]">

            {/* Glow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-sky-300/40 blur-3xl opacity-70 pointer-events-none" />

            {/* Grafismo */}
            <Image
              src="/grafismo.png"
              alt=""
              width={650}
              height={550}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -translate-y-[280px] opacity-80 pointer-events-none select-none" />

            {/* Logo */}
            <Image
              src={logo}
              alt="Logo Gedui"
              width={350}
              height={140}
              className="relative z-10 -translate-x-[220px] -translate-y-[-30px]"
            />
          </div>

        </div>
      </div>

      {/*Degradê inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="
              h-52
              bg-gradient-to-b
              from-transparent
              via-[rgba(5,41,79,0.4)]
              to-[rgba(5,41,79,1)]
        " />
      </div>



    </section>
  );
}
