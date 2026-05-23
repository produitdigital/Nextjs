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
      canonical: `https://virtuel-compta.vercel.app/${lang}/about`,
      languages: {
        fr: "https://virtuel-compta.vercel.app/fr/about",
        en: "https://virtuel-compta.vercel.app/en/about",
      },
    },
    openGraph: {
      title: lang === "fr"
        ? "À Propos | Assistant Virtuel Comptabilité"
        : "About | Virtual Accounting Assistant",
      description: lang === "fr"
        ? "Parcours professionnel et expertise en comptabilité et gestion financière."
        : "Professional background and expertise in accounting and financial management.",
      url: `https://virtuel-compta.vercel.app/${lang}/about`,
      type: "website",
      siteName: "Virtuel Comptable",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: "https://virtuel-compta.vercel.app/images/profil.webp",
          width: 800,
          height: 600,
          alt: lang === "fr"
            ? "Assistant virtuel comptable professionnel"
            : "Professional virtual accounting assistant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr"
        ? "À Propos | Assistant Virtuel Comptabilité"
        : "About | Virtual Accounting Assistant",
      description: lang === "fr"
        ? "Expert en comptabilité et gestion financière à distance."
        : "Expert in remote accounting and financial management.",
      images: ["https://virtuel-compta.vercel.app/images/profil.webp"],
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
      phone: "Téléphone :",
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
      phone: "Phone:",
    },
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

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header Section */}
        <header className="mb-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center md:p-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/about.webp"
                alt={t.title}
                width={800}
                height={600}
                className="rounded-xl shadow-md"
              />
            </div>
            <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">{t.title}</h1>
            <p className="mb-6 text-lg text-gray-600">{t.subtitle}</p>
          </div>
        </header>

        {/* Parcours Section */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">{t.parcoursTitle}</h2>
            <p className="mb-2 text-gray-700">{t.parcoursText1}</p>
            <p className="text-gray-700">{t.parcoursText2}</p>
          </div>
        </div>

        {/* Compétences Section */}
        <div className="mb-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 md:text-3xl">{t.competencesTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-primary">{t.packOffice}</h3>
              <p className="text-gray-600">{t.packOfficeText}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-primary">{t.logicielsComptables}</h3>
              <p className="text-gray-600">{t.logicielsComptablesText}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-primary">{t.googleWorkspace}</h3>
              <p className="text-gray-600">{t.googleWorkspaceText}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-primary">{t.autresOutils}</h3>
              <p className="text-gray-600">{t.autresOutilsText}</p>
            </div>
          </div>
        </div>

        {/* Services Mini Section */}
        <div className="mb-8 rounded-2xl bg-gray-50 p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">{t.servicesTitle}</h2>
            <ul className="flex flex-wrap justify-center gap-3">
              {t.servicesList.map((service, index) => (
                <li key={index} className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-white shadow-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-8 rounded-2xl border-l-8 border-primary bg-gradient-to-r from-gray-50 to-gray-100 p-6 md:p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">{t.missionTitle}</h2>
            <p className="mb-2 text-gray-700">{t.missionText1}</p>
            <p className="text-gray-700">{t.missionText2}</p>
          </div>
        </div>

        {/* Valeur ajoutée Section */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">{t.valeurTitle}</h2>
            <p className="text-gray-700">{t.valeurText}</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">{t.ctaTitle}</h2>
            <p className="mb-6 text-gray-600">{t.ctaText}</p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center md:p-8">
          <div className="mx-auto max-w-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">{t.contactTitle}</h2>
            <p className="mb-2 text-gray-700">
              {t.email}{" "}
              <a href="mailto:rjeantsioriniaina@gmail.com" className="text-primary transition hover:underline">
                rjeantsioriniaina@gmail.com
              </a>
            </p>
            <p className="text-gray-700">
              {t.phone}{" "}
              <a href="tel:+261380806430" className="text-primary transition hover:underline">
                +261 38 08 064 30
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
