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
      <nav className="mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mx-10 md:mx-20">
          <div className="md:flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <Image
                src={logo}
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-sky-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Botão Agendar separado (desktop only) */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-6">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  src="/flags/br.svg"
                  alt="Português"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  src="/flags/es.svg"
                  alt="Español"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  src="/flags/gb.svg"
                  alt="English"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <Link
              href="/agendar"
              className="hidden md:block border border-solid text-white px-6 py-2 rounded-3xl font-medium ml-6"
            >
              Agendar Demonstração
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="flex flex-col md:hidden py-4 border-t text-center items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-sky-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/agendar"
              className="block mt-4 border border-solid text-gray-700 px-6 py-3 rounded-3xl text-center font-medium w-90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Agendar Demonstração
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
