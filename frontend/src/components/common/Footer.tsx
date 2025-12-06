// src/components/common/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const footerLinks = {
    solucoes: [
      { name: "Gedui Edu", href: "/recursos" },
      { name: "Gedui Corp", href: "/precos" },
    ],
    links: [
      { name: "Blog", href: "/blog" },
    ],
    legal: [
      { name: "Termos de Uso", href: "/termos" },
      { name: "Política de Privacidade", href: "/privacidade" },
      { name: "Cookies", href: "/cookies" },
    ],
  };

  const socialLinks = [
    {
      name: "Whatsapp",
      href: "https://wa.link/mbg92f",
      icon: (
        <FaWhatsapp className="text-primary"/>
      ),
    },
    {
      name: "Facebook",
      href: "https://www.linkedin.com/company/gedui",
      icon: (
        <FaFacebookF className="text-primary" />
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/gedui",
      icon: (
        <FaInstagram className="text-primary" />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/gedui",
      icon: (
        <FaLinkedinIn className="text-primary" />
      ),
    },
  ];

  return (
    <footer className="bg-custom-gradient text-gray-300">
      <div className="flex flex-col md:flex-row justify-between mt-20 px-4 sm:px-6 lg:px-8 py-12 gap-8 xl:px-30">

        {/* Logo */}
        <section className="gap-3 flex flex-col items-center">
          <Image src={logo} width={300} height={150} alt="Logo" />
          <p className="text-sm md:text-md lg:text-lg font-semibold text-white text-center">
            © {new Date().getFullYear()} Gedui. Todos os direitos reservados.
          </p>
        </section>

        {/* Links */}
        <section className="flex md:grid-cols-3 gap-8">
          {/* Produto */}
          <div>
            <h3 className="text-secondary font-semibold mb-3 md:text-md lg:text-lg">Soluções</h3>
            <ul className="space-y-1">
              {footerLinks.solucoes.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm md:text-md lg:text-lg text-white font-semibold hover:text-sky-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gerais */}
          <div>
            <h3 className="text-secondary font-semibold mb-3">Links</h3>
            <ul className="space-y-1">
              {footerLinks.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm md:text-md lg:text-lg text-white font-semibold hover:text-sky-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-1 md:text-md lg:text-lg">Contato</h3>
            <h3 className="text-white font-semibold md:text-md lg:text-lg">falecom@gedui.com.br</h3>
          </div>
        </section>

        {/* Redes sociais */}
        <section className="flex justify-center md:flex-col gap-3">
          {socialLinks.map((social) => (
            <a key={social.name} href={social.href} className="bg-white p-2 md:p-4 rounded-full">
              {social.icon}
            </a>
          ))}
        </section>
      </div>
    </footer>

  );
}
