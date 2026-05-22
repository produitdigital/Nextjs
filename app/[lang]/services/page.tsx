import Link from "next/link";
import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === "fr"
      ? "Nos Services Comptables | Assistant Virtuel"
      : "Our Accounting Services | Virtual Assistant",
    description: lang === "fr"
      ? "Découvrez nos services de saisie comptable, relance factures et pré-comptabilité pour freelances et PME."
      : "Discover our accounting services: bookkeeping, invoice reminders and pre-accounting for freelancers and SMEs.",
  };
}

export default async function ServicesHubPage({ params }: PageProps) {
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
      {/* Header de Navigation */}
      <header className="services-nav-header">
        <nav className="services-navbar">
          <Link href={`/${lang}`} className="services-logo">
            Virtuel<span>Comptable</span>
          </Link>
          
          <div className="services-nav-links">
            {/* Lien Accueil - AJOUTÉ */}
            <Link href={`/${lang}`} className="services-nav-link">
              {t.navHome}
            </Link>
            <Link href={`/${lang}/services`} className="services-nav-link active">
              {t.navServices}
            </Link>
            <Link href={`/${lang}/about`} className="services-nav-link">
              {t.navAbout}
            </Link>
            <Link href={`/${lang}/blog`} className="services-nav-link">
              {t.navBlog}
            </Link>
            <Link href={`/${lang}/contact`} className="services-nav-link">
              {t.navContact}
            </Link>
          </div>
          
          <Link href={`/${lang}/contact`} className="services-cta-btn">
            {t.ctaBtn}
          </Link>
          
          {/* Sélecteur de langue */}
          <div className="services-lang-selector">
            <Link href="/fr/services" className={lang === "fr" ? "active" : ""}>
              FR
            </Link>
            <span>|</span>
            <Link href="/en/services" className={lang === "en" ? "active" : ""}>
              EN
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-hero-title">
            {t.title}
          </h1>
          <p className="services-hero-subtitle">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="services-main">
        <div className="services-container">
          <div className="services-grid">
            {serviceSilos.map((silo) => (
              <div key={silo.slug} className="services-card">
                <div className="services-card-icon" style={{ backgroundColor: silo.iconBg }}>
                  <span>{silo.icon}</span>
                </div>
                <h3 className="services-card-title">
                  {lang === "fr" ? silo.title : silo.title_en}
                </h3>
                <p className="services-card-desc">
                  {lang === "fr" ? silo.desc : silo.desc_en}
                </p>
                <Link href={`/${lang}/services/${silo.slug}`} className="services-card-link">
                  {t.learnMore}
                </Link>
              </div>
            ))}
          </div>

          {/* Why Section */}
          <section className="services-why">
            <div className="services-why-content">
              <h2 className="services-why-title">{t.whyTitle}</h2>
              <p className="services-why-text">{t.whyText}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
