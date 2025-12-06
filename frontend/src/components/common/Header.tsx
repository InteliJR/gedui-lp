// src/components/common/Header.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/logo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Soluções", href: "/solucoes" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent shadow-sm">
      <nav
        className="mx-auto sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="flex justify-between items-center h-16 mx-10 md:mx-20">

          <section className="md:flex items-center space-x-8" aria-label="Logo e navegação">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
              aria-label="Ir para a página inicial"
            >
              <Image
                src={logo}
                width={100}
                height={100}
                alt="Logo da Gedui"
                priority
              />
            </Link>

            {/* Navegação Desktop */}
            <ul className="hidden md:flex space-x-10" role="menubar">
              {navigation.map((item) => (
                <li key={item.name} role="none">
                  <Link
                    href={item.href}
                    className="text-white hover:text-sky-600 transition-colors font-medium"
                    role="menuitem"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

          </section>

          {/* IDIOMAS + CTA DESKTOP */}
          <section className="flex items-center" aria-label="Troca de idioma e agendamento">

            <ul className="hidden md:flex items-center space-x-6" aria-label="Seleção de idioma">
              {[
                { src: "/flags/br.svg", alt: "Português" },
                { src: "/flags/es.svg", alt: "Espanhol" },
                { src: "/flags/gb.svg", alt: "Inglês" },
              ].map((flag) => (
                <li key={flag.alt}>
                  <figure
                    className="w-10 h-10 rounded-full overflow-hidden relative"
                  >
                    <Image
                      src={flag.src}
                      alt={`Idioma: ${flag.alt}`}
                      fill
                      className="object-cover"
                    />
                  </figure>
                </li>
              ))}
            </ul>

            <Link
              href="/agendar"
              className="hidden md:block border border-solid text-white px-6 py-2 rounded-3xl font-medium ml-6"
            >
              Agendar Demonstração
            </Link>

          </section>

          {/* BOTÃO MENU MOBILE */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir ou fechar menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              // Ícone fechar
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ícone hamburguer
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
            className="flex flex-col md:hidden py-4 border-t text-center items-center"
            aria-label="Menu móvel"
          >
            <ul role="menu" className="w-full">
              {navigation.map((item) => (
                <li key={item.name} className="w-full">
                  <Link
                    href={item.href}
                    className="block py-3 text-gray-700 hover:text-sky-600 transition-colors"
                    role="menuitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <li className="w-full">
                <Link
                  href="/agendar"
                  className="block mt-4 border border-solid text-gray-700 px-6 py-3 rounded-3xl text-center font-medium w-90"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agendar Demonstração
                </Link>
              </li>
            </ul>
          </section>
        )}
      </nav>
    </header>
  );
}
