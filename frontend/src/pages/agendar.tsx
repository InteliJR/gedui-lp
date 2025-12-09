import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import logo from "../../public/logo.png";

// Calendly type declaration
declare global {
    interface Window {
        Calendly?: {
            initPopupWidget: (options: {
                url: string;
                prefill?: {
                    name?: string;
                    email?: string;
                    customAnswers?: Record<string, string>;
                };
                utm?: Record<string, string>;
            }) => void;
        };
    }
}

// Calendly URL
const CALENDLY_URL = "https://calendly.com/raphael-silva-sou/new-meeting-1";

// Custom Checkbox Component
function CustomCheckbox({
    id,
    checked,
    onChange,
    required = false,
}: {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: boolean;
}) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="mt-0.5 h-4 w-4 border border-white bg-transparent flex items-center justify-center cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-0"
        >
            {checked && <div className="h-2.5 w-2.5 bg-white" />}
            {required && (
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    required
                    className="sr-only"
                    tabIndex={-1}
                />
            )}
        </button>
    );
}

export default function Agendar() {
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        institutionType: "",
        institutionName: "",
        productInterest: "",
        email: "",
        phone: "",
        birthDate: "",
        registration: "",
        newsletter: false,
        terms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            [name]: checked,
        }));
    };

    const [isScheduled, setIsScheduled] = useState(false);

    // Listen for Calendly events
    useEffect(() => {
        const handleCalendlyEvent = (e: MessageEvent) => {
            if (e.data.event && e.data.event.indexOf("calendly") === 0) {
                if (e.data.event === "calendly.event_scheduled") {
                    console.log("Agendamento confirmado via Calendly!");
                    setIsScheduled(true);

                    // Remove Calendly overlay if exists
                    const popup = document.querySelector(".calendly-overlay");
                    if (popup) popup.remove();
                }
            }
        };

        window.addEventListener("message", handleCalendlyEvent);
        return () => window.removeEventListener("message", handleCalendlyEvent);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.terms) {
            alert("Por favor, aceite os Termos e Condições para continuar.");
            return;
        }

        // Prepare additional info for Calendly notes
        const positionLabels: Record<string, string> = {
            director: "Diretor",
            coordinator: "Coordenador",
            teacher: "Professor",
            other: "Outro",
        };

        const institutionTypeLabels: Record<string, string> = {
            public: "Pública",
            private: "Privada",
            nonprofit: "Não Lucrativa",
        };

        const productLabels: Record<string, string> = {
            edu: "Gedu Edu",
            corp: "Gedu Corp",
            both: "Ambos",
        };

        // Format meeting notes with all form data
        const meetingNotes = `
INFORMACOES DO LEAD:

Nome: ${formData.name}
Cargo: ${positionLabels[formData.position] || formData.position}
Instituicao: ${formData.institutionName}
Tipo: ${institutionTypeLabels[formData.institutionType] || formData.institutionType}
Produto de Interesse: ${productLabels[formData.productInterest] || formData.productInterest}
Email: ${formData.email}
Telefone: ${formData.phone}
Data de Nascimento: ${formData.birthDate || "Nao informado"}
Horario Preferido: ${formData.registration || "Nao informado"}
Newsletter: ${formData.newsletter ? "Sim" : "Nao"}
        `.trim();

        // Check if Calendly is loaded
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: CALENDLY_URL,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    customAnswers: {
                        a1: meetingNotes,
                    },
                },
                utm: {
                    utm_source: "gedui_website",
                    utm_medium: "form",
                    utm_campaign: "demo_request",
                    utm_content: formData.productInterest,
                },
            });
        } else {
            console.error("Calendly não carregado");
            alert("Erro ao carregar o sistema de agendamento. Por favor, recarregue a página.");
        }
    };

    const handleNewSchedule = () => {
        setIsScheduled(false);
        setFormData({
            name: "",
            position: "",
            institutionType: "",
            institutionName: "",
            productInterest: "",
            email: "",
            phone: "",
            birthDate: "",
            registration: "",
            newsletter: false,
            terms: false,
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col relative">
            <Header />

            {/* Background with image - scrolls with page */}
            <div
                className="absolute top-0 left-0 right-0 z-0 bg-no-repeat"
                style={{
                    backgroundImage: `url('/777642295bdc87285106a64b5eef729025dd26ca.jpg')`,
                    backgroundSize: "100% auto",
                    backgroundPosition: "top center",
                    height: "100%",
                    minHeight: "100vh",
                }}
            >
                {/* Blue overlay with 25% opacity */}
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(3, 74, 148, 0.35)" }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center pt-24 pb-16 px-4">
                <div className="w-full max-w-md lg:max-w-none lg:w-[50%]">
                    {/* Form Card */}
                    <div className="bg-[#034A94] rounded-3xl p-8 md:p-10 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-2">
                                <Link
                                    href="/"
                                    className="flex items-center space-x-2 shrink-0"
                                    aria-label="Ir para a página inicial"
                                >
                                    <Image src={logo} width={300} height={300} alt="Logo da Gedui" priority />
                                </Link>
                            </div>
                            {!isScheduled && (
                                <h2 className="text-4xl md:text-5xl text-white">
                                    Agende uma <span className="text-green-300 font-semibold">demo</span>
                                </h2>
                            )}
                        </div>

                        {/* Success Message */}
                        {isScheduled ? (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">✅</div>
                                <h3 className="text-2xl md:text-3xl text-white font-bold mb-4">
                                    Agendamento Confirmado!
                                </h3>
                                <p className="text-blue-100 text-lg mb-8">
                                    Os detalhes foram enviados para o seu email.
                                    <br />
                                    Estamos ansiosos para conversar com você!
                                </p>
                                <button
                                    onClick={handleNewSchedule}
                                    className="px-8 py-3 rounded-full font-semibold text-base transition text-slate-900 hover:opacity-90 shadow-lg"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, rgba(255, 255, 255) 0%, rgba(153, 255, 0, 0.78) 100%)",
                                    }}
                                >
                                    Novo Agendamento
                                </button>
                            </div>
                        ) : (
                            /* Form */
                            <form id="agendar-form" onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome do Responsável *"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-full bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                    required
                                />

                                {/* Position and Institution Type */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition appearance-none cursor-pointer pr-8"
                                            required
                                        >
                                            <option value="">Cargo *</option>
                                            <option value="director">Diretor</option>
                                            <option value="coordinator">Coordenador</option>
                                            <option value="teacher">Professor</option>
                                            <option value="other">Outro</option>
                                        </select>
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                                            ▼
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <select
                                            name="institutionType"
                                            value={formData.institutionType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition appearance-none cursor-pointer pr-8"
                                            required
                                        >
                                            <option value="">Tipo *</option>
                                            <option value="public">Pública</option>
                                            <option value="private">Privada</option>
                                            <option value="nonprofit">Não Lucrativa</option>
                                        </select>
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                                            ▼
                                        </span>
                                    </div>
                                </div>

                                {/* Institution Name */}
                                <input
                                    type="text"
                                    name="institutionName"
                                    placeholder="Nome da Instituição *"
                                    value={formData.institutionName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-full bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                    required
                                />

                                {/* Product Interest */}
                                <div className="relative">
                                    <select
                                        name="productInterest"
                                        value={formData.productInterest}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition appearance-none cursor-pointer pr-8"
                                        required
                                    >
                                        <option value="">Produto de interesse *</option>
                                        <option value="edu">Gedu Edu</option>
                                        <option value="corp">Gedu Corp</option>
                                        <option value="both">Ambos</option>
                                    </select>
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                                        ▼
                                    </span>
                                </div>

                                {/* Email and Phone */}
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail de Contato *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="px-4 py-3 rounded-full bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                        required
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Telefone *"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="px-4 py-3 rounded-full bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                        required
                                    />
                                </div>

                                {/* Birth Date and Registration */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                        />
                                        <Image
                                            src="/simbolo-de-ferramentas-de-organizacao-e-administracao-de-horario-de-calendario-e-relogio 1.svg"
                                            alt="Ícone de calendário"
                                            width={20}
                                            height={20}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="registration"
                                            placeholder="--:-- *"
                                            value={formData.registration}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-full bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                                            required
                                        />
                                        <Image
                                            src="/relogio-circular 1.svg"
                                            alt="Ícone de relógio"
                                            width={20}
                                            height={20}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                        />
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="space-y-3 py-4">
                                    <div className="flex items-start gap-3">
                                        <CustomCheckbox
                                            id="newsletter"
                                            checked={formData.newsletter}
                                            onChange={checked => handleCheckboxChange("newsletter", checked)}
                                        />
                                        <label
                                            htmlFor="newsletter"
                                            className="text-white text-sm cursor-pointer leading-tight"
                                            onClick={() => handleCheckboxChange("newsletter", !formData.newsletter)}
                                        >
                                            Deseja receber novidades e ofertas?
                                        </label>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CustomCheckbox
                                            id="terms"
                                            checked={formData.terms}
                                            onChange={checked => handleCheckboxChange("terms", checked)}
                                            required
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-white text-sm cursor-pointer leading-tight"
                                            onClick={() => handleCheckboxChange("terms", !formData.terms)}
                                        >
                                            <span className="font-semibold">Termos e Condições e uso de dados: </span>
                                            <span>
                                                Confirmo que li e concordo com os Termos e Condições e autorizo o uso
                                                dos meus dados pessoais para as finalidades descritas na Política de
                                                Privacidade.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                    {/* Submit Button - 50% outside card */}
                    {!isScheduled && (
                        <div className="flex justify-center -mt-6">
                            <button
                                type="submit"
                                form="agendar-form"
                                className="w-4/5 rounded-full py-3 font-semibold text-base transition text-slate-900 hover:opacity-90 shadow-lg"
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(255, 255, 255) 0%, rgba(153, 255, 0, 0.78) 100%)",
                                }}
                            >
                                Agendar demonstração
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10">
                <Footer />
            </div>

            {/* Calendly Script */}
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        </div>
    );
}
