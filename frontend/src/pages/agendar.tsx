import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import logo from "../../public/logo.png";

// ============================================
// CONSTANTES DE ESTILO
// ============================================
const STYLES = {
    // Inputs e Selects base
    input: "w-full px-4 py-3 rounded-full bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary transition",
    select: "w-full px-4 py-3 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary transition appearance-none cursor-pointer pr-10",
    selectDisabled: "disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60",
    // Ícone do dropdown
    selectIcon: "absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500",
    // Botão primário (gradiente)
    buttonPrimary:
        "rounded-full py-3 font-semibold text-base transition text-slate-900 hover:opacity-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
    buttonGradient: "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(153, 255, 0, 0.78) 100%)",
    // Card
    card: "bg-[#034A94] rounded-3xl p-8 md:p-10 shadow-2xl",
    // Labels
    labelWhite: "text-white text-sm cursor-pointer leading-tight",
    // Estados
    errorBox: "bg-red-500/20 border border-red-400 rounded-lg p-3 mb-2",
    loadingSpinner: "animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2",
} as const;

// ============================================
// TIPOS
// ============================================
interface AvailableTime {
    status: string;
    invitees_remaining: number;
    start_time: string;
    scheduling_url: string;
}

interface EventType {
    uri: string;
    name: string;
    duration: number;
    scheduling_url: string;
}

interface AvailableDate {
    date: string;
    displayDate: string;
    times: AvailableTime[];
}

interface SelectFieldProps {
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

interface InputFieldProps {
    type?: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

// ============================================
// COMPONENTES REUTILIZÁVEIS
// ============================================

// Ícone de seta para dropdown
function ChevronDownIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            className={className}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

// Select customizado
function SelectField({
    name,
    value,
    onChange,
    disabled = false,
    required = false,
    children,
    className = "",
}: SelectFieldProps) {
    return (
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`${STYLES.select} ${STYLES.selectDisabled} ${className}`}
            >
                {children}
            </select>
            <span className={STYLES.selectIcon}>
                <ChevronDownIcon />
            </span>
        </div>
    );
}

// Input customizado
function InputField({
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    required = false,
    className = "",
}: InputFieldProps) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`${STYLES.input} ${className}`}
        />
    );
}

// Botão primário com gradiente
function PrimaryButton({
    children,
    type = "button",
    form,
    disabled = false,
    onClick,
    className = "",
}: {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    form?: string;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <button
            type={type}
            form={form}
            disabled={disabled}
            onClick={onClick}
            className={`${STYLES.buttonPrimary} ${className}`}
            style={{ background: STYLES.buttonGradient }}
        >
            {children}
        </button>
    );
}

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
            className="mt-0.5 h-5 w-5 rounded border-2 border-white/70 bg-white/10 flex items-center justify-center cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-secondary transition-all hover:border-white"
        >
            {checked && (
                <svg
                    className="h-3 w-3 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            )}
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

// Spinner de loading
function LoadingSpinner({ message }: { message: string }) {
    return (
        <div className="text-center py-4">
            <div className={STYLES.loadingSpinner}></div>
            <p className="text-blue-100 text-sm">{message}</p>
        </div>
    );
}

// Mensagem de erro
function ErrorMessage({ message }: { message: string }) {
    return (
        <div className={STYLES.errorBox}>
            <p className="text-red-200 text-center text-sm">{message}</p>
        </div>
    );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function Agendar() {
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        institutionType: "",
        institutionName: "",
        productInterest: "",
        email: "",
        phone: "",
        newsletter: false,
        terms: false,
    });

    // Estados para agendamento programático
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTimes, setIsLoadingTimes] = useState(false);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [selectedEventType, setSelectedEventType] = useState<string>("");
    const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [availableTimesForDate, setAvailableTimesForDate] = useState<AvailableTime[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [apiError, setApiError] = useState<string>("");
    const [userUri, setUserUri] = useState<string>("");
    const [isScheduled, setIsScheduled] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

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

    // Função para agrupar horários por data
    const groupTimesByDate = useCallback((times: AvailableTime[]): AvailableDate[] => {
        const grouped: Record<string, AvailableTime[]> = {};

        times.forEach(slot => {
            const dateObj = new Date(slot.start_time);
            const dateKey = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD

            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(slot);
        });

        return Object.entries(grouped).map(([date, times]) => {
            const dateObj = new Date(date + "T12:00:00");
            return {
                date,
                displayDate: dateObj.toLocaleDateString("pt-BR", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                }),
                times,
            };
        });
    }, []);

    // Inicializar API - buscar usuário, tipos de evento e disponibilidade
    useEffect(() => {
        const initializeCalendlyAPI = async () => {
            setIsInitializing(true);
            try {
                // 1. Buscar usuário
                const userResponse = await fetch("/api/calendly/user");
                const userData = await userResponse.json();

                if (!userData.success) {
                    console.error("Erro ao conectar com Calendly:", userData.error);
                    setApiError("Erro ao conectar com o sistema de agendamento. Tente novamente mais tarde.");
                    setIsInitializing(false);
                    return;
                }

                setUserUri(userData.user.uri);

                // 2. Buscar tipos de evento
                const eventTypesResponse = await fetch(
                    `/api/calendly/event-types?userUri=${encodeURIComponent(userData.user.uri)}`
                );
                const eventTypesData = await eventTypesResponse.json();

                if (eventTypesData.success && eventTypesData.eventTypes?.length > 0) {
                    setEventTypes(eventTypesData.eventTypes);
                    const firstEventType = eventTypesData.eventTypes[0].uri;
                    setSelectedEventType(firstEventType);

                    // 3. Buscar disponibilidade automaticamente
                    const availabilityResponse = await fetch(
                        `/api/calendly/availability?eventTypeUri=${encodeURIComponent(firstEventType)}`
                    );
                    const availabilityData = await availabilityResponse.json();

                    if (availabilityData.success && availabilityData.availableTimes?.length > 0) {
                        const groupedDates = groupTimesByDate(availabilityData.availableTimes);
                        setAvailableDates(groupedDates);
                    } else {
                        setApiError("Nenhum horário disponível nos próximos 7 dias.");
                    }
                } else {
                    setApiError("Nenhum tipo de evento configurado no Calendly.");
                }
            } catch (error) {
                console.error("Erro ao inicializar API Calendly:", error);
                setApiError("Erro ao carregar horários disponíveis.");
            } finally {
                setIsInitializing(false);
            }
        };

        initializeCalendlyAPI();
    }, [groupTimesByDate]);

    // Atualizar horários disponíveis quando a data for selecionada
    useEffect(() => {
        if (selectedDate && availableDates.length > 0) {
            const dateData = availableDates.find(d => d.date === selectedDate);
            if (dateData) {
                setAvailableTimesForDate(dateData.times);
                setSelectedTime(""); // Reset time when date changes
            }
        } else {
            setAvailableTimesForDate([]);
        }
    }, [selectedDate, availableDates]);

    // Agendar via API programática
    const scheduleViaProgrammaticAPI = async () => {
        if (!selectedTime || !selectedEventType) {
            setApiError("Selecione uma data e horário para continuar.");
            return;
        }

        if (!formData.name || !formData.email) {
            setApiError("Preencha nome e email para continuar.");
            return;
        }

        setIsLoading(true);
        setApiError("");

        // Preparar notas da reunião (informações adicionais estruturadas)
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

        const meetingNotes = `
INFORMACOES DO LEAD:

Cargo: ${positionLabels[formData.position] || formData.position || "Nao informado"}
Instituicao: ${formData.institutionName || "Nao informado"}
Tipo de Instituicao: ${institutionTypeLabels[formData.institutionType] || formData.institutionType || "Nao informado"}
Produto de Interesse: ${productLabels[formData.productInterest] || formData.productInterest || "Nao informado"}
Telefone: ${formData.phone || "Nao informado"}
Newsletter: ${formData.newsletter ? "Sim, deseja receber" : "Nao"}
        `.trim();

        try {
            const response = await fetch("/api/calendly/schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventTypeUri: selectedEventType,
                    startTime: selectedTime,
                    invitee: {
                        name: formData.name,
                        email: formData.email,
                        timezone: "America/Sao_Paulo",
                    },
                    notes: meetingNotes,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Agendamento criado via API:", data.event);
                setIsScheduled(true);
            } else {
                setApiError(data.error || "Erro ao criar agendamento. Tente outro horário.");
            }
        } catch (error) {
            console.error("Erro ao agendar:", error);
            setApiError("Erro de conexão. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.terms) {
            alert("Por favor, aceite os Termos e Condições para continuar.");
            return;
        }

        if (!selectedDate || !selectedTime) {
            setApiError("Por favor, selecione uma data e horário.");
            return;
        }

        // Agendar diretamente
        await scheduleViaProgrammaticAPI();
    };

    const handleNewSchedule = () => {
        setIsScheduled(false);
        setSelectedDate("");
        setSelectedTime("");
        setApiError("");
        setFormData({
            name: "",
            position: "",
            institutionType: "",
            institutionName: "",
            productInterest: "",
            email: "",
            phone: "",
            newsletter: false,
            terms: false,
        });
    };

    // Helper para formatar horário
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
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
                    <div className={STYLES.card}>
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
                                <PrimaryButton onClick={handleNewSchedule} className="px-8">
                                    Novo Agendamento
                                </PrimaryButton>
                            </div>
                        ) : (
                            /* Form */
                            <form id="agendar-form" onSubmit={handleSubmit} className="space-y-4">
                                {/* Loading inicial */}
                                {isInitializing && <LoadingSpinner message="Carregando horários disponíveis..." />}

                                {/* Error State */}
                                {apiError && !isInitializing && <ErrorMessage message={apiError} />}

                                {/* Name */}
                                <InputField
                                    name="name"
                                    placeholder="Nome do Responsável *"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />

                                {/* Position and Institution Type */}
                                <div className="grid grid-cols-2 gap-4">
                                    <SelectField
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Cargo *</option>
                                        <option value="director">Diretor</option>
                                        <option value="coordinator">Coordenador</option>
                                        <option value="teacher">Professor</option>
                                        <option value="other">Outro</option>
                                    </SelectField>

                                    <SelectField
                                        name="institutionType"
                                        value={formData.institutionType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Tipo *</option>
                                        <option value="public">Pública</option>
                                        <option value="private">Privada</option>
                                        <option value="nonprofit">Não Lucrativa</option>
                                    </SelectField>
                                </div>

                                {/* Institution Name */}
                                <InputField
                                    name="institutionName"
                                    placeholder="Nome da Instituição *"
                                    value={formData.institutionName}
                                    onChange={handleInputChange}
                                    required
                                />

                                {/* Product Interest */}
                                <SelectField
                                    name="productInterest"
                                    value={formData.productInterest}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Produto de interesse *</option>
                                    <option value="edu">Gedu Edu</option>
                                    <option value="corp">Gedu Corp</option>
                                    <option value="both">Ambos</option>
                                </SelectField>

                                {/* Email and Phone */}
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        type="email"
                                        name="email"
                                        placeholder="E-mail de Contato *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <InputField
                                        type="tel"
                                        name="phone"
                                        placeholder="Telefone *"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Date and Time Selection */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Data - Dropdown com datas disponíveis */}
                                    <SelectField
                                        value={selectedDate}
                                        onChange={e => setSelectedDate(e.target.value)}
                                        disabled={isInitializing || availableDates.length === 0}
                                        required
                                    >
                                        <option value="">
                                            {isInitializing
                                                ? "Carregando..."
                                                : availableDates.length === 0
                                                ? "Sem datas"
                                                : "Data *"}
                                        </option>
                                        {availableDates.map(dateOption => (
                                            <option key={dateOption.date} value={dateOption.date}>
                                                {dateOption.displayDate}
                                            </option>
                                        ))}
                                    </SelectField>

                                    {/* Horário - Dropdown com horários da data selecionada */}
                                    <SelectField
                                        value={selectedTime}
                                        onChange={e => setSelectedTime(e.target.value)}
                                        disabled={!selectedDate || availableTimesForDate.length === 0}
                                        required
                                    >
                                        <option value="">
                                            {!selectedDate
                                                ? "Selecione a data"
                                                : availableTimesForDate.length === 0
                                                ? "Sem horários"
                                                : "Horário *"}
                                        </option>
                                        {availableTimesForDate.map(slot => (
                                            <option key={slot.start_time} value={slot.start_time}>
                                                {formatTime(slot.start_time)}
                                            </option>
                                        ))}
                                    </SelectField>
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
                                            className={STYLES.labelWhite}
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
                                            className={STYLES.labelWhite}
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
                            <PrimaryButton
                                type="submit"
                                form="agendar-form"
                                disabled={isLoading || isInitializing || !selectedTime || !formData.terms}
                                className="w-4/5"
                            >
                                {isLoading ? "Agendando..." : "Agendar demonstração"}
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
}
