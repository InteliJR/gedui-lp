// src/components/common/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { CommonDict } from "@/i18n/loadCommonDictionary";

interface FooterProps {
  t: CommonDict["footer"];
}

export default function Footer({ t }: FooterProps) {
  const footerLinks = {
    solucoes: [
      { name: t.solutions.edu, href: "/solucoes#gedui-edu" },
      { name: t.solutions.corp, href: "/solucoes#gedui-corp" },
    ],
    links: [{ name: t.links.blog, href: "/blog" }],
  };

  const socialLinks = [
    {
      name: "Whatsapp",
      href: "https://wa.link/mbg92f",
      icon: <FaWhatsapp className="text-primary" />,
    },
    {
      name: "Facebook",
      href: "https://www.linkedin.com/company/gedui",
      icon: <FaFacebookF className="text-primary" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/gedui",
      icon: <FaInstagram className="text-primary" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/gedui",
      icon: <FaLinkedinIn className="text-primary" />,
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-primary to-secondary/60 text-gray-300">
      <div className="flex flex-col md:flex-row justify-between mt-20 px-4 sm:px-6 lg:px-8 py-12 gap-8 xl:px-30">
        {/* LOGO + COPYRIGHT */}
        <section
          className="gap-3 flex flex-col items-center text-center"
          aria-label={t.aria.institutional}
        >
          <figure>
            <Image src={logo} width={300} height={150} alt="Logo da Gedui" />
          </figure>

          <p className="text-sm md:text-md lg:text-lg font-semibold text-white">
            {t.copyright.replace(
              "{year}",
              new Date().getFullYear().toString()
            )}
          </p>
        </section>

        {/* LINKS */}
        <nav
          className="flex gap-8 md:grid md:grid-cols-3"
          aria-label={t.aria.footerNav}
        >
          {/* Soluções */}
          <section>
            <h3 className="text-secondary font-semibold mb-3 md:text-md lg:text-lg">
              {t.columns.solutions}
            </h3>

            <ul className="space-y-1">
              {footerLinks.solucoes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm md:text-md lg:text-lg text-white font-semibold hover:text-sky-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Links */}
          <section>
            <h3 className="text-secondary font-semibold mb-3 md:text-md lg:text-lg">
              {t.columns.links}
            </h3>

            <ul className="space-y-1">
              {footerLinks.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm md:text-md lg:text-lg text-white font-semibold hover:text-sky-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Contato */}
          <section>
            <h3 className="text-white font-semibold mb-1 md:text-md lg:text-lg">
              {t.columns.contact}
            </h3>

            <address className="not-italic">
              <a
                href={`mailto:${t.contactEmailLabel}`}
                className="text-white font-semibold md:text-md lg:text-lg hover:text-sky-500 transition-colors"
              >
                {t.contactEmailLabel}
              </a>
            </address>
          </section>
        </nav>

        {/* REDES SOCIAIS */}
        <section
          aria-label={t.aria.social}
          className="flex justify-center md:flex-col gap-3"
        >
          <ul className="flex md:flex-col gap-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  aria-label={t.aria.visitProfile.replace(
                    "{social}",
                    social.name
                  )}
                  className="bg-white p-2 md:p-4 rounded-full flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
}
