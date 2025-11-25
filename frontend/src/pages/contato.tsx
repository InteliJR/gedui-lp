// src/pages/contato.tsx
import { useState } from "react";
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Aqui você implementaria a lógica de envio real
    // Por exemplo: await axios.post('/api/contact', formData);

    // Simulação
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        mensagem: "",
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO
        title="Entre em Contato | Gedui"
        description="Fale com nossa equipe. Estamos prontos para ajudar sua instituição a transformar a gestão educacional. Contato, suporte e vendas."
        keywords="contato gedui, suporte, vendas, atendimento, falar com gedui"
        image="/og-image-contato.png"
      />

      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Vamos conversar?
            </h1>
            <p className="text-xl text-gray-700">
              Nossa equipe está pronta para ajudar sua instituição
            </p>
          </div>
        </section>

        {/* Contact Form + Info */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Envie uma mensagem
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="empresa"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Instituição
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mensagem"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      rows={5}
                      value={formData.mensagem}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-600 text-white py-4 rounded-lg font-semibold hover:bg-sky-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                  </button>

                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                      ✓ Mensagem enviada com sucesso! Retornaremos em breve.
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Outras formas de contato
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:contato@gedui.com.br"
                        className="text-sky-600 hover:text-sky-700"
                      >
                        contato@gedui.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Telefone
                      </h3>
                      <a
                        href="tel:+551140004000"
                        className="text-sky-600 hover:text-sky-700"
                      >
                        +55 11 4000-4000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Chat</h3>
                      <p className="text-gray-600">
                        Disponível de segunda a sexta, das 9h às 18h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Endereço
                      </h3>
                      <p className="text-gray-600">
                        São Paulo, SP
                        <br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Redes Sociais
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/company/gedui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                    >
                      <span className="text-xl">in</span>
                    </a>
                    <a
                      href="https://www.instagram.com/gedui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                    >
                      <span className="text-xl">ig</span>
                    </a>
                    <a
                      href="https://twitter.com/gedui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                    >
                      <span className="text-xl">𝕏</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
