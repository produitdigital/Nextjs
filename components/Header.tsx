"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  lang?: string;
}

export default function Header({
  lang = "fr",
}: HeaderProps) {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navigation = [
    {
      href: `/${lang}`,
      label: "Accueil",
      icon: "🏠",
    },
    {
      href: `/${lang}/services`,
      label: "Services",
      icon: "💼",
    },
    {
      href: `/${lang}/about`,
      label: "À propos",
      icon: "👤",
    },
    {
      href: `/${lang}/blog`,
      label: "Blog",
      icon: "📝",
    },
    {
      href: `/${lang}/contact`,
      label: "Contact",
      icon: "📧",
    },
  ];

  const isActive = (path: string) => {
    if (path === `/${lang}`) {
      return pathname === path;
    }

    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Virtuel Comptable"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl shadow-lg">
            📊
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold text-gray-900">
              Virtuel
            </span>

            <span className="text-sm font-semibold text-blue-600">
              Comptable
            </span>
          </div>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <span>{item.icon}</span>

              <span>{item.label}</span>

              {isActive(item.href) && (
                <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-blue-600" />
              )}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* LANGUAGE SWITCHER */}
          <div className="hidden items-center rounded-full border border-gray-200 bg-gray-50 p-1 md:flex">

            <Link
              href="/fr"
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                lang === "fr"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              🇫🇷 FR
            </Link>

            <Link
              href="/en"
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                lang === "en"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              🇬🇧 EN
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-100 md:hidden"
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="space-y-2 px-4 py-5">

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium transition ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>

                <span>{item.label}</span>
              </Link>
            ))}

            {/* MOBILE LANG */}
            <div className="flex items-center justify-center gap-3 pt-4">

              <Link
                href="/fr"
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  lang === "fr"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                🇫🇷 FR
              </Link>

              <Link
                href="/en"
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  lang === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                🇬🇧 EN
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
