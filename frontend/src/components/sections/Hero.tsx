// src/components/sections/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforme a gestão educacional com{" "}
              <span className="text-sky-200">Gedui</span>
            </h1>

            <p className="text-xl md:text-2xl text-sky-100 mb-8 leading-relaxed">
              A plataforma completa para instituições de ensino que querem
              inovar e oferecer experiências educacionais de excelência.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/agendar"
                className="bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold hover:bg-sky-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Agendar Demonstração
              </Link>

              <Link
                href="/recursos"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-sky-600 transition-all"
              >
                Conhecer Recursos
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
                <div className="text-sky-200 text-sm">Instituições</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">50k+</div>
                <div className="text-sky-200 text-sm">Alunos Ativos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
                <div className="text-sky-200 text-sm">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Image/Illustration Placeholder */}
          <div className="relative lg:block">
            <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {/* Aqui o time de design pode adicionar uma ilustração ou screenshot */}
              <div className="w-full h-full bg-gradient-to-br from-sky-400/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎓</div>
                  <p className="text-sky-100">Ilustração da plataforma</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-400 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-400 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
