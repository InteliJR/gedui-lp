// pages/agendar.tsx
import type { GetStaticProps } from "next";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import logo from "../../public/logo.png";

import loadCommonDictionary from "@/i18n/loadCommonDictionary";
import loadSchedulleDictionary, { type SchedulleDict } from "@/i18n/loadSchedulleDictionary";
import type { CommonDict } from "@/i18n/loadCommonDictionary";

type Props = {
    common: CommonDict;
    t: SchedulleDict;
    locale: "pt-br" | "es" | "en";
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const l = (locale as Props["locale"]) || "pt-br";

    const common = await loadCommonDictionary(l);
    const t = await loadSchedulleDictionary(l);

    return {
        props: { common, t, locale: l },
    };
};

const STYLES = {
    input:
        "w-full px-4 py-3 rounded-full bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary transition",
    select:
        "w-full px-4 py-3 rounded-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-secondary transition appearance-none cursor-pointer pr-10",
    selectDisabled:
        "disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60",
    selectIcon:
        "absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500",
    buttonPrimary:
        "rounded-full py-3 font-semibold text-base transition text-slate-900 hover:opacity-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
    buttonGradient:
        "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(153, 255, 0, 0.78) 100%)",
    card: "bg-[#034A94] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl",
    labelWhite: "text-white text-sm cursor-pointer leading-tight",
    errorBox: "bg-red-500/20 border border-red-400 rounded-lg p-3 mb-2",
    loadingSpinner:
        "animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"
} as const;

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

function SelectField({
    name,
    value,
    onChange,
    disabled = false,
    required = false,
    children,
    className = ""
}: {
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}) {
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

function InputField({
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    required = false,
    className = ""
}: {
    type?: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}) {
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

function PrimaryButton({
    children,
    type = "button",
    form,
    disabled = false,
    onClick,
    className = ""
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

function CustomCheckbox({
    checked,
    onChange,
    required = false
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
                    onChange={() => { }}
                    required
                    className="sr-only"
                    tabIndex={-1}
                />
            )}
        </button>
    );
}

function LoadingSpinner({ message }: { message: string }) {
    return (
        <div className="text-center py-4">
            <div className={STYLES.loadingSpinner}></div>
            <p className="text-blue-100 text-sm">{message}</p>
        </div>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <div className={STYLES.errorBox}>
            <p className="text-red-200 text-center text-sm">{message}</p>
        </div>
    );
}

export default function Agendar({ common, t, locale }: Props) {
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        institutionType: "",
        institutionName: "",
        productInterest: "",
        email: "",
        phone: "",
        newsletter: false,
        terms: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [selectedEventType, setSelectedEventType] = useState<string>("");
    const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [availableTimesForDate, setAvailableTimesForDate] = useState<AvailableTime[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [apiError, setApiError] = useState<string>("");
    const [isScheduled, setIsScheduled] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const groupTimesByDate = useCallback((times: AvailableTime[]): AvailableDate[] => {
        const grouped: Record<string, AvailableTime[]> = {};

        times.forEach(slot => {
            const dateObj = new Date(slot.start_time);
            const dateKey = dateObj.toISOString().split("T")[0];
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(slot);
        });

        return Object.entries(grouped).map(([date, times]) => {
            const dateObj = new Date(date + "T12:00:00");
            const localeTag = locale === "pt-br" ? "pt-BR" : locale;
            return {
                date,
                displayDate: dateObj.toLocaleDateString(localeTag, {
                    weekday: "short",
                    day: "2-digit",
                    month: "short"
                }),
                times
            };
        });
    }, [locale]);

    useEffect(() => {
        const initializeCalendlyAPI = async () => {
            setIsInitializing(true);
            try {
                const userResponse = await fetch("/api/calendly/user");
                const userData = await userResponse.json();

                if (!userData.success) {
                    setApiError(t.errors.connectLater);
                    setIsInitializing(false);
                    return;
                }

                const eventTypesResponse = await fetch(
                    `/api/calendly/event-types?userUri=${encodeURIComponent(userData.user.uri)}`
                );
                const eventTypesData = await eventTypesResponse.json();

                if (eventTypesData.success && eventTypesData.eventTypes?.length > 0) {
                    setEventTypes(eventTypesData.eventTypes);
                    const firstEventType = eventTypesData.eventTypes[0].uri;
                    setSelectedEventType(firstEventType);

                    const availabilityResponse = await fetch(
                        `/api/calendly/availability?eventTypeUri=${encodeURIComponent(firstEventType)}`
                    );
                    const availabilityData = await availabilityResponse.json();

                    if (availabilityData.success && availabilityData.availableTimes?.length > 0) {
                        setAvailableDates(groupTimesByDate(availabilityData.availableTimes));
                    } else {
                        setApiError(t.errors.noTimes7Days);
                    }
                } else {
                    setApiError(t.errors.noEventTypes);
                }
            } catch {
                setApiError(t.errors.loadTimes);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeCalendlyAPI();
    }, [groupTimesByDate, t.errors]);

    useEffect(() => {
        if (selectedDate && availableDates.length > 0) {
            const dateData = availableDates.find(d => d.date === selectedDate);
            if (dateData) {
                setAvailableTimesForDate(dateData.times);
                setSelectedTime("");
            }
        } else {
            setAvailableTimesForDate([]);
        }
    }, [selectedDate, availableDates]);

    const scheduleViaProgrammaticAPI = async () => {
        if (!selectedTime || !selectedEventType) {
            setApiError(t.errors.selectDateTime);
            return;
        }
        if (!formData.name || !formData.email) {
            setApiError(t.errors.fillNameEmail);
            return;
        }

        setIsLoading(true);
        setApiError("");

        const positionLabel =
            t.options.position[formData.position as keyof typeof t.options.position] || formData.position || t.meetingNotes.notProvided;

        const institutionTypeLabel =
            t.options.institutionType[formData.institutionType as keyof typeof t.options.institutionType] ||
            formData.institutionType ||
            t.meetingNotes.notProvided;

        const productLabel =
            t.options.product[formData.productInterest as keyof typeof t.options.product] ||
            formData.productInterest ||
            t.meetingNotes.notProvided;

        const meetingNotes = `
${t.meetingNotes.header}

${t.meetingNotes.position}: ${positionLabel}
${t.meetingNotes.institution}: ${formData.institutionName || t.meetingNotes.notProvided}
${t.meetingNotes.institutionType}: ${institutionTypeLabel}
${t.meetingNotes.product}: ${productLabel}
${t.meetingNotes.phone}: ${formData.phone || t.meetingNotes.notProvided}
Newsletter: ${formData.newsletter ? t.meetingNotes.newsletterYes : t.meetingNotes.newsletterNo}
    `.trim();

        try {
            const response = await fetch("/api/calendly/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventTypeUri: selectedEventType,
                    startTime: selectedTime,
                    invitee: {
                        name: formData.name,
                        email: formData.email,
                        timezone: "America/Sao_Paulo"
                    },
                    notes: meetingNotes
                })
            });

            const data = await response.json();

            if (data.success) {
                setIsScheduled(true);
            } else {
                setApiError(data.error || t.errors.createSchedule);
            }
        } catch {
            setApiError(t.errors.connection);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.terms) {
            alert(t.errors.acceptTermsAlert);
            return;
        }

        if (!selectedDate || !selectedTime) {
            setApiError(t.errors.pickDateTime);
            return;
        }

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
            terms: false
        });
    };

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        const localeTag = locale === "pt-br" ? "pt-BR" : locale;
        return date.toLocaleTimeString(localeTag, { hour: "2-digit", minute: "2-digit" });
    };

    const homeHref = locale === "pt-br" ? "/" : `/${locale}`;

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col relative">
            <Header t={common.header} />

            <div
                className="absolute top-0 left-0 right-0 z-0 bg-no-repeat"
                style={{
                    backgroundImage: `url('/og-bg-agendar.jpg')`,
                    backgroundSize: "100% auto",
                    backgroundPosition: "top center",
                    height: "100%",
                    minHeight: "100vh"
                }}
            >
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(3, 74, 148, 0.35)" }} />
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center pt-24 pb-16 px-4">
                <div className="w-full max-w-md lg:max-w-none lg:w-[50%]">
                    <div className={STYLES.card}>
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-2">
                                <Link href={homeHref} className="flex items-center space-x-2 shrink-0">
                                    <Image src={logo} alt="Logo da Gedui" className="w-32 sm:w-36 md:w-44 lg:w-52 h-auto" priority />
                                </Link>
                            </div>

                            {!isScheduled && (
                                <h2 className="text-2xl sm:text-3xl md:text-5xl text-white leading-tight">
                                    {t.heading.title}{" "}
                                    <span className="text-green-300 font-semibold">
                                        {t.heading.highlight}
                                    </span>
                                </h2>

                            )}
                        </div>

                        {isScheduled ? (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">✅</div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-4">
                                    {t.success.title}
                                </h3>
                               <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-8">
                                    {t.success.line1}
                                    <br />
                                    {t.success.line2}
                                </p>
                                <PrimaryButton onClick={handleNewSchedule} className="px-8">
                                    {t.success.cta}
                                </PrimaryButton>
                            </div>
                        ) : (
                            <form id="agendar-form" onSubmit={handleSubmit} className="space-y-4">
                                {isInitializing && <LoadingSpinner message={t.loading.initializing} />}

                                {apiError && !isInitializing && <ErrorMessage message={apiError} />}

                                <InputField
                                    name="name"
                                    placeholder={t.fields.name}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <SelectField
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">{t.selects.positionPlaceholder}</option>
                                        <option value="director">{t.options.position.director}</option>
                                        <option value="coordinator">{t.options.position.coordinator}</option>
                                        <option value="teacher">{t.options.position.teacher}</option>
                                        <option value="other">{t.options.position.other}</option>
                                    </SelectField>

                                    <SelectField
                                        name="institutionType"
                                        value={formData.institutionType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">{t.selects.institutionTypePlaceholder}</option>
                                        <option value="public">{t.options.institutionType.public}</option>
                                        <option value="private">{t.options.institutionType.private}</option>
                                        <option value="nonprofit">{t.options.institutionType.nonprofit}</option>
                                    </SelectField>
                                </div>

                                <InputField
                                    name="institutionName"
                                    placeholder={t.fields.institutionName}
                                    value={formData.institutionName}
                                    onChange={handleInputChange}
                                    required
                                />

                                <SelectField
                                    name="productInterest"
                                    value={formData.productInterest}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">{t.selects.productInterestPlaceholder}</option>
                                    <option value="edu">{t.options.product.edu}</option>
                                    <option value="corp">{t.options.product.corp}</option>
                                    <option value="both">{t.options.product.both}</option>
                                </SelectField>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        type="email"
                                        name="email"
                                        placeholder={t.fields.email}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <InputField
                                        type="tel"
                                        name="phone"
                                        placeholder={t.fields.phone}
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <SelectField
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        disabled={isInitializing || availableDates.length === 0}
                                        required
                                    >
                                        <option value="">
                                            {isInitializing
                                                ? t.selects.loading
                                                : availableDates.length === 0
                                                    ? t.selects.noDates
                                                    : t.selects.datePlaceholder}
                                        </option>
                                        {availableDates.map((d) => (
                                            <option key={d.date} value={d.date}>
                                                {d.displayDate}
                                            </option>
                                        ))}
                                    </SelectField>

                                    <SelectField
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        disabled={!selectedDate || availableTimesForDate.length === 0}
                                        required
                                    >
                                        <option value="">
                                            {!selectedDate
                                                ? t.selects.selectDateFirst
                                                : availableTimesForDate.length === 0
                                                    ? t.selects.noTimes
                                                    : t.selects.timePlaceholder}
                                        </option>
                                        {availableTimesForDate.map((slot) => (
                                            <option key={slot.start_time} value={slot.start_time}>
                                                {formatTime(slot.start_time)}
                                            </option>
                                        ))}
                                    </SelectField>
                                </div>

                                <div className="space-y-3 py-4">
                                    <div className="flex items-start gap-3">
                                        <CustomCheckbox
                                            id="newsletter"
                                            checked={formData.newsletter}
                                            onChange={(checked) => handleCheckboxChange("newsletter", checked)}
                                        />
                                        <label
                                            htmlFor="newsletter"
                                            className={STYLES.labelWhite}
                                            onClick={() => handleCheckboxChange("newsletter", !formData.newsletter)}
                                        >
                                            {t.checkboxes.newsletter}
                                        </label>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CustomCheckbox
                                            id="terms"
                                            checked={formData.terms}
                                            onChange={(checked) => handleCheckboxChange("terms", checked)}
                                            required
                                        />
                                        <label
                                            htmlFor="terms"
                                            className={STYLES.labelWhite}
                                            onClick={() => handleCheckboxChange("terms", !formData.terms)}
                                        >
                                            <span className="font-semibold">{t.checkboxes.termsTitle} </span>
                                            <span>{t.checkboxes.termsText}</span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    {!isScheduled && (
                        <div className="flex justify-center -mt-6">
                            <PrimaryButton
                                type="submit"
                                form="agendar-form"
                                disabled={isLoading || isInitializing || !selectedTime || !formData.terms}
                                className="w-4/5"
                            >
                                {isLoading ? t.buttons.scheduling : t.buttons.submit}
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10">
                <Footer t={common.footer} />
            </div>
        </div>
    );
}
