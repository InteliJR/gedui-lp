// src/components/common/Header.tsx
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import logo from "../../../public/logo.png";

import loadCommonDictionary from "@/i18n/loadCommonDictionary";
import type { CommonDict } from "@/i18n/loadCommonDictionary";

type HeaderVariant = "transparent" | "primary";

type HeaderProps = {
  variant?: HeaderVariant;
  t: CommonDict["header"];
};

export default function Header({ variant = "transparent", t }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const [tHeader, setTHeader] = useState<CommonDict["header"]>(t);

  useEffect(() => {
    let alive = true;

    async function syncHeaderDict() {
      const dict = await loadCommonDictionary(router.locale);
      if (!alive) return;
      setTHeader(dict.header);
    }

    syncHeaderDict();

    return () => {
      alive = false;
    };
  }, [router.locale]);

  function getBasePath(asPath: string) {

    const [pathname] = asPath.split(/[?#]/);

    const cleaned = pathname.replace(/^\/(pt-br|en|es)(\/|$)/i, "/");

    return cleaned === "" ? "/" : cleaned;
  }

  const navigation = useMemo(
    () => [
      { name: tHeader.nav.solutions, href: "/solucoes" },
      { name: tHeader.nav.blog, href: "/blog" },
    ],
    [tHeader]
  );


  const currentPath = useMemo(
    () => getBasePath(router.asPath),
    [router.asPath]
  );

  const languages = useMemo(
    () => [
      { src: "/flags/br.svg", alt: tHeader.languages.pt, locale: "pt-BR" },
      { src: "/flags/es.svg", alt: tHeader.languages.es, locale: "es" },
      { src: "/flags/gb.svg", alt: tHeader.languages.en, locale: "en" },
    ],
    [tHeader]
  );

  const headerBgClass = variant === "primary" ? "bg-primary" : "bg-transparent";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${headerBgClass} backdrop-blur-md`}>
      <nav
        className="mx-auto sm:px-6"
        role="navigation"
        aria-label={tHeader.aria.mainNav}
      >
        <div className="flex justify-between items-center py-4 mx-10 md:mx-10">
          <section className="md:flex items-center space-x-8" aria-label="Logo e navegação">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
              aria-label={tHeader.aria.logoLink}
            >
              <Image src={logo} width={120} height={100} alt="Logo da Gedui" priority />
            </Link>

            {/* Navegação Desktop */}
            <ul className="hidden md:flex space-x-10" role="menubar">
              {navigation.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className={`
                      text-white transition-colors text-lg
                      hover:text-sky-600
                      ${currentPath.startsWith(item.href) ? "font-bold" : "font-medium"}
                    `}
                  >

                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* IDIOMAS + CTA DESKTOP */}
          <section className="flex items-center" aria-label="Troca de idioma e agendamento">
            <ul
              className="hidden md:flex items-center space-x-6"
              aria-label={tHeader.aria.languageSwitcher}
            >
              {languages.map((flag) => (
                <li key={flag.locale}>
                  <Link
                    href={router.asPath}
                    locale={flag.locale}
                    className="block cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label={`${tHeader.aria.languageSwitcher}: ${flag.alt}`}
                  >
                    <figure className="w-8 h-8 rounded-full overflow-hidden relative m-0">
                      <Image
                        src={flag.src}
                        alt={`Idioma: ${flag.alt}`}
                        fill
                        className="object-cover"
                      />
                    </figure>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/agendar"
              className="hidden md:block border border-solid text-white px-5 py-2 rounded-3xl font-medium ml-6"
            >
              {tHeader.cta}
            </Link>
          </section>

          {/* BOTÃO MENU MOBILE */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={tHeader.aria.openCloseMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <section
            id="mobile-menu"
            className="flex flex-col md:hidden py-4 border-t border-white/15 text-center items-center bg-transparent backdrop-blur-md"
            aria-label="Menu móvel"
          >
            <ul role="menu" className="w-full">
              {navigation.map((item) => (
                <li key={item.href} className="w-full">
                  <Link
                    href={item.href}
                    role="menuitem"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      block py-3 text-white transition-colors
                      hover:text-sky-200
                      ${currentPath.startsWith(item.href) ? "font-bold" : "font-medium"}
                    `}
                  >
                    {item.name}
                  </Link>

                </li>
              ))}

              <li className="w-full">
                <Link
                  href="/agendar"
                  className="
                    inline-block
                    mt-4
                    border border-solid text-white
                    px-8 py-3
                    rounded-3xl
                    font-medium
                    mx-auto
                    text-center
                  "
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tHeader.cta}
                </Link>
              </li>


            </ul>
          </section>
        )}
      </nav>
    </header>
  );
}
