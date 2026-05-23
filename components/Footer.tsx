"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "fr";

  const navigation = [
    { href: `/${lang}`, label: "Accueil", labelEn: "Home" },
    { href: `/${lang}/services`, label: "Services", labelEn: "Services" },
    { href: `/${lang}/about`, label: "À Propos", labelEn: "About" },
    { href: `/${lang}/blog`, label: "Blog", labelEn: "Blog" },
    { href: `/${lang}/contact`, label: "Contact", labelEn: "Contact" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50 py-8 text-center text-gray-500">
      <div className="container mx-auto px-4">
        {/* Liens de navigation */}
        <nav className="mb-4 flex flex-wrap justify-center gap-4 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary transition"
            >
              {lang === "fr" ? item.label : item.labelEn}
            </Link>
          ))}
        </nav>

        {/* Icônes réseaux sociaux */}
        <div className="mb-4 flex justify-center gap-6">
          <a
            href="https://www.facebook.com/hajatina.randrianantenaina"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition hover:text-primary"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2v-2c0-2.21 1.79-4 4-4h2v3h-2c-1.1 0-2 .9-2 2v1h4v3h-4v6.93c5.05-.48 9-4.73 9-9.93z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jean-tsioriniaina-984998340"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition hover:text-primary"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M20.45 20.45h-3.6v-5.66c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.76h-3.6V8.56h3.45v1.62h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.39 4.29 5.5v6.62zM5.34 7.09c-1.15 0-2.09-.94-2.09-2.09 0-1.15.94-2.09 2.09-2.09 1.15 0 2.09.94 2.09 2.09 0 1.15-.94 2.09-2.09 2.09zm1.8 13.36h-3.6V8.56h3.6v11.89z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs">
          © {currentYear} Assistant Virtuel Comptable. Tous droits réservés.
          <br />
          <span className="text-xs text-gray-400">
            {lang === "fr"
              ? "Services de comptabilité à distance pour PME et entrepreneurs."
              : "Remote accounting services for SMEs and entrepreneurs."}
          </span>
        </p>
      </div>
    </footer>
  );
}
