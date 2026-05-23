returneturnmport Link from "next/link";
import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
  title:
    lang === "fr"
      ? "Nos Services Comptables | Assistant Virtuel"
      : "Our Accounting Services | Virtual Assistant",

  description:
    lang === "fr"
      ? "Découvrez nos services de saisie comptable, relance factures et pré-comptabilité pour freelances et PME."
      : "Discover our accounting services: bookkeeping, invoice reminders and pre-accounting for freelancers and SMEs.",

  alternates: {
    canonical: `https://virtuel-compta.vercel.app/${lang}/services`,
    languages: {
      fr: "https://virtuel-compta.vercel.app/fr/services",
      en: "https://virtuel-compta.vercel.app/en/services",
    },
  },

  openGraph: {
    title:
      lang === "fr"
        ? "Nos Services Comptables"
        : "Our Accounting Services",

    description:
      lang === "fr"
        ? "Services de comptabilité pour freelances et PME"
        : "Accounting services for freelancers and SMEs",

    url: `https://virtuel-compta.vercel.app/${lang}/services`,
    siteName: "Virtuel Comptable",
    type: "website",
    locale: lang === "fr" ? "fr_FR" : "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title:
      lang === "fr"
        ? "Nos Services Comptables"
        : "Our Accounting Services",

    description:
      lang === "fr"
        ? "Assistant comptable virtuel pour PME"
        : "Virtual accounting assistant for SMEs",
  },
};
defaultrt default async function ServicesHubPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Données des services avec support multilingue
  const serviceSilos = [
    {
      title: dict.services?.saisie?.title || "Saisie Comptable",
      title_en: "Bookkeeping",
      slug: "saisie-comptable",
      desc: dict.services?.saisie?.desc || "Saisie rigoureuse de vos pièces justificatives et rapprochement bancaire mensuel.",
      desc_en: "Rigorous entry of your supporting documents and monthly bank reconciliation.",
      icon: "📑",
      iconBg: "#EFF6FF"
    },
    {
      title: dict.services?.relance?.title || "Relance Factures",
      title_en: "Invoice Reminders",
      slug: "relance-factures",
      desc: dict.services?.relance?.desc || "Gestion du poste clients, suivi des impayés et relances professionnelles.",
      desc_en: "Customer account management, payment follow-up and professional reminders.",
      icon: "📧",
      iconBg: "#FEF3C7"
    },
    {
      title: dict.services?.precompta?.title || "Pré-comptabilité",
      title_en: "Pre-accounting",
      slug: "pre-comptabilite",
      desc: dict.services?.precompta?.desc || "Préparation et organisation complète de vos documents pour votre expert-comptable.",
      desc_en: "Complete preparation and organization of your documents for your chartered accountant.",
      icon: "📂",
      iconBg: "#ECFDF5"
    }
  ];

  // Textes de la page selon la langue
  const pageTexts = {
    fr: {
      title: "Nos Expertises en Gestion",
      subtitle: "Des solutions ciblées pour optimiser votre flux financier.",
      whyTitle: "Pourquoi cette organisation ?",
      whyText: "Chaque aspect de votre comptabilité mérite une attention particulière. Notre structure permet une gestion modulaire adaptée à votre volume d'activité.",
      learnMore: "En savoir plus →",
      navHome: "Accueil",
      navServices: "Services",
      navAbout: "À Propos",
      navBlog: "Blog",
      navContact: "Contact",
      ctaBtn: "Devis Gratuit"
    },
    en: {
      title: "Our Management Expertise",
      subtitle: "Targeted solutions to optimize your financial flow.",
      whyTitle: "Why this organization?",
      whyText: "Every aspect of your accounting deserves special attention. Our structure allows for modular management adapted to your business volume.",
      learnMore: "Learn more →",
      navHome: "Home",
      navServices: "Services",
      navAbout: "About",
      navBlog: "Blog",
      navContact: "Contact",
      ctaBtn: "Free Quote"
    }
  };

  const t = pageTexts[lang as "fr" | "en"] || pageTexts.fr;

  return (
    <>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-16 text-center md:py-20">
        <div className="container mx-auto max-w-3xl">
          <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {serviceSilos.map((silo) => (
            <div key={silo.slug} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl" style={{ backgroundColor: silo.iconBg }}>
                <span>{silo.icon}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {lang === "fr" ? silo.title : silo.title_en}
              </h3>
              <p className="mb-4 text-gray-600">
                {lang === "fr" ? silo.desc : silo.desc_en}
              </p>
              <Link href={`/${lang}/services/${silo.slug}`} className="inline-flex items-center gap-1 text-primary font-semibold transition hover:gap-2">
                {t.learnMore}
              </Link>
            </div>
          ))}
        </div>

        {/* Why Section */}
        <section className="mt-12 rounded-2xl border-l-8 border-primary bg-gradient-to-r from-gray-50 to-gray-100 p-6 md:p-8">
          <div className="max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">{t.whyTitle}</h2>
            <p className="text-gray-700">{t.whyText}</p>
          </div>
        </section>
      </main>
    </>
  );
}
