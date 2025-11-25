// src/components/sections/CTA.tsx
import Link from "next/link";

interface CTAProps {
  variant?: "default" | "simple";
}

export default function CTA({ variant = "default" }: CTAProps) {
  if (variant === "simple") {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para transformar sua instituição?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Agende uma demonstração gratuita e veja o Gedui em ação
          </p>
          <Link
            href="/agendar"
            className="inline-block bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sky-700 transition-colors shadow-lg"
          >
            Agendar Demonstração Gratuita
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-sky-600 to-blue-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comece a transformar sua instituição hoje
            </h2>
            <p className="text-xl text-sky-100 mb-8 leading-relaxed">
              Junte-se a centenas de instituições que já estão oferecendo
              experiências educacionais de excelência com o Gedui.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/agendar"
                className="bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold hover:bg-sky-50 transition-all shadow-lg text-center"
              >
                Agendar Demonstração
              </Link>
              <Link
                href="/contato"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-sky-600 transition-all text-center"
              >
                Falar com Consultor
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              "✓ Demonstração gratuita de 30 minutos",
              "✓ Consultoria personalizada sem compromisso",
              "✓ Análise das necessidades da sua instituição",
              "✓ Plano de implementação customizado",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="text-2xl">✓</div>
                <span className="text-lg">{benefit.replace("✓ ", "")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
