import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === "fr"
      ? "À Propos | Assistant Virtuel en Comptabilité Professionnel"
      : "About | Professional Virtual Accounting Assistant",
    description: lang === "fr"
      ? "Découvrez mon parcours en comptabilité, mes compétences et mon expertise en gestion financière pour PME et entrepreneurs."
      : "Discover my background in accounting, my skills and my expertise in financial management for SMEs and entrepreneurs.",
    robots: "index, follow",
    authors: [{ name: "Assistant Virtuel Comptabilité" }],
    alternates: {
      canonical: `https://virtuel-comptable.web.app/${lang}/about`,
    },
    openGraph: {
      title: lang === "fr" ? "À Propos | Assistant Virtuel Comptabilité" : "About | Virtual Accounting Assistant",
      description: lang === "fr"
        ? "Parcours professionnel et expertise en comptabilité et gestion financière."
        : "Professional background and expertise in accounting and financial management.",
      url: `https://virtuel-comptable.web.app/${lang}/about`,
      type: "website",
      images: [
        {
          url: "/images/profil.webp",
          width: 800,
          height: 600,
          alt: lang === "fr" ? "Assistant virtuel comptable professionnel" : "Professional virtual accounting assistant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr" ? "À Propos | Assistant Virtuel Comptabilité" : "About | Virtual Accounting Assistant",
      description: lang === "fr"
        ? "Expert en comptabilité et gestion financière à distance."
        : "Expert in remote accounting and financial management.",
      images: ["/images/profil.webp"],
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Textes selon la langue
  const texts = {
    fr: {
      title: "À Propos de Moi",
      subtitle: "Assistant virtuel spécialisé en comptabilité et gestion financière pour entreprises et PME.",
      navHome: "Accueil",
      navServices: "Services",
      navBlog: "Blog",
      navContact: "Contact",
      parcoursTitle: "🎓 Mon Parcours",
      parcoursText1: "Licence en gestion et Master I en finance et comptabilité de l'Université Andrainjato Fianarantsoa.",
      parcoursText2: "J'accompagne les entreprises dans la gestion financière, la comptabilité et l'optimisation administrative.",
      competencesTitle: "⚙️ Mes Compétences",
      packOffice: "Pack Office",
      packOfficeText: "Word, Excel, PowerPoint, Access, Outlook",
      logicielsComptables: "Logiciels comptables",
      logicielsComptablesText: "QuickBooks, ZohoBooks, Sage 100, Navision, Sage Saari",
      googleWorkspace: "Google Workspace",
      googleWorkspaceText: "Gmail, Drive, Calendar, Sheets",
      autresOutils: "Autres outils",
      autresOutilsText: "Canva, Trello, Notion",
      servicesTitle: "💼 Mes Services",
      servicesList: ["Tenue de livre", "Rapprochement bancaire", "Pré-comptabilité"],
      missionTitle: "🚀 Ma Mission",
      missionText1: "Simplifier la gestion financière des entreprises grâce à des services comptables fiables et professionnels à distance.",
      missionText2: "Permettre aux entrepreneurs de se concentrer sur leur croissance.",
      valeurTitle: "⭐ Valeur ajoutée",
      valeurText: "Travail professionnel, rigoureux et adapté aux besoins des PME et entrepreneurs.",
      ctaTitle: "📩 Travaillons ensemble",
      ctaText: "Besoin d'un assistant comptable fiable ? Contactez-moi dès maintenant.",
      ctaButton: "Me contacter",
      contactTitle: "📞 Contact rapide",
      email: "Email :",
      phone: "Téléphone :"
    },
    en: {
      title: "About Me",
      subtitle: "Virtual assistant specialized in accounting and financial management for businesses and SMEs.",
      navHome: "Home",
      navServices: "Services",
      navBlog: "Blog",
      navContact: "Contact",
      parcoursTitle: "🎓 My Background",
      parcoursText1: "Bachelor's degree in Management and Master I in Finance and Accounting from Andrainjato Fianarantsoa University.",
      parcoursText2: "I support companies in financial management, accounting and administrative optimization.",
      competencesTitle: "⚙️ My Skills",
      packOffice: "Office Pack",
      packOfficeText: "Word, Excel, PowerPoint, Access, Outlook",
      logicielsComptables: "Accounting Software",
      logicielsComptablesText: "QuickBooks, ZohoBooks, Sage 100, Navision, Sage Saari",
      googleWorkspace: "Google Workspace",
      googleWorkspaceText: "Gmail, Drive, Calendar, Sheets",
      autresOutils: "Other Tools",
      autresOutilsText: "Canva, Trello, Notion",
      servicesTitle: "💼 My Services",
      servicesList: ["Bookkeeping", "Bank reconciliation", "Pre-accounting"],
      missionTitle: "🚀 My Mission",
      missionText1: "Simplify the financial management of companies through reliable and professional remote accounting services.",
      missionText2: "Allow entrepreneurs to focus on their growth.",
      valeurTitle: "⭐ Added value",
      valeurText: "Professional, rigorous work adapted to the needs of SMEs and entrepreneurs.",
      ctaTitle: "📩 Let's work together",
      ctaText: "Need a reliable accounting assistant? Contact me now.",
      ctaButton: "Contact me",
      contactTitle: "📞 Quick contact",
      email: "Email:",
      phone: "Phone:"
    }
  };

  const t = texts[lang as "fr" | "en"] || texts.fr;

  return (
    <>
      {/* Schema.org Person */}
      <Script
        id="schema-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Assistant Virtuel Comptable",
            jobTitle: lang === "fr" ? "Assistant Virtuel en Comptabilité" : "Virtual Accounting Assistant",
            description: t.subtitle,
            url: `https://virtuel-comptable.web.app/${lang}/about`,
            sameAs: [],
          }),
        }}
      />

      <main className="about-page">
        {/* Header Section */}
        <header className="about-header">
          <div className="about-header-content">
            <div className="about-header-image">
              <Image
                src="/images/about.webp"
                alt={t.title}
                width={800}
                height={600}
                className="about-image"
              />
            </div>
            <h1 className="about-title">{t.title}</h1>
            <p className="about-subtitle">{t.subtitle}</p>
            <nav className="about-nav">
              <Link href={`/${lang}`} className="about-nav-link">{t.navHome}</Link>
              <Link href={`/${lang}/services`} className="about-nav-link">{t.navServices}</Link>
              <Link href={`/${lang}/blog`} className="about-nav-link">{t.navBlog}</Link>
              <Link href={`/${lang}/contact`} className="about-nav-link">{t.navContact}</Link>
            </nav>
          </div>
        </header>

        {/* Parcours Section */}
        <section className="about-section">
          <div className="about-section-content">
            <h2 className="about-section-title">{t.parcoursTitle}</h2>
            <p className="about-section-text">{t.parcoursText1}</p>
            <p className="about-section-text">{t.parcoursText2}</p>
          </div>
        </section>

        {/* Compétences Section */}
        <section className="about-skills">
          <h2 className="about-skills-title">{t.competencesTitle}</h2>
          <div className="about-skills-grid">
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">{t.packOffice}</h3>
              <p className="about-skill-card-text">{t.packOfficeText}</p>
            </div>
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">{t.logicielsComptables}</h3>
              <p className="about-skill-card-text">{t.logicielsComptablesText}</p>
            </div>
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">{t.googleWorkspace}</h3>
              <p className="about-skill-card-text">{t.googleWorkspaceText}</p>
            </div>
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">{t.autresOutils}</h3>
              <p className="about-skill-card-text">{t.autresOutilsText}</p>
            </div>
          </div>
        </section>

        {/* Services Mini Section */}
        <section className="about-section-light">
          <div className="about-section-content">
            <h2 className="about-section-title">{t.servicesTitle}</h2>
            <ul className="about-services-list">
              {t.servicesList.map((service, index) => (
                <li key={index} className="about-services-item">{service}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-mission">
          <div className="about-mission-content">
            <h2 className="about-mission-title">{t.missionTitle}</h2>
            <p className="about-mission-text">{t.missionText1}</p>
            <p className="about-mission-text">{t.missionText2}</p>
          </div>
        </section>

        {/* Valeur ajoutée Section */}
        <section className="about-section">
          <div className="about-section-content">
            <h2 className="about-section-title">{t.valeurTitle}</h2>
            <p className="about-section-text">{t.valeurText}</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="about-cta-content">
            <h2 className="about-cta-title">{t.ctaTitle}</h2>
            <p className="about-cta-text">{t.ctaText}</p>
            <div className="about-cta-button-wrapper">
              <Link href={`/${lang}/contact`} className="cta-button">
                {t.ctaButton}
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="about-contact">
          <div className="about-contact-content">
            <h2 className="about-contact-title">{t.contactTitle}</h2>
            <p className="about-contact-email">
              {t.email}{" "}
              <a href="mailto:rjeantsioriniaina@gmail.com">
                rjeantsioriniaina@gmail.com
              </a>
            </p>
            <p className="about-contact-phone">
              {t.phone}{" "}
              <a href="tel:+261380806430">+261 38 08 064 30</a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
