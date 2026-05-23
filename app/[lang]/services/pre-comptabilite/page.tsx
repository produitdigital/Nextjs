returneturnmport Image from "next/image";
import Link from "next/link";
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
      ? "Pré-comptabilité & Organisation Documentaire | Assistant Virtuel"
      : "Pre-accounting & Document Organization | Virtual Assistant",

  description:
    lang === "fr"
      ? "Préparez sereinement vos documents pour votre expert-comptable avec un service de pré-comptabilité professionnel."
      : "Prepare your documents for your chartered accountant with a professional pre-accounting service.",

  alternates: {
    canonical: `https://virtuel-compta.vercel.app/${lang}/services/pre-comptabilite`,

    languages: {
      fr: "https://virtuel-compta.vercel.app/fr/services/pre-comptabilite",
      en: "https://virtuel-compta.vercel.app/en/services/pre-comptabilite",
    },
  },

  openGraph: {
    title:
      lang === "fr"
        ? "Pré-comptabilité & Organisation Documentaire"
        : "Pre-accounting & Document Organization",

    description:
      lang === "fr"
        ? "Service professionnel de pré-comptabilité pour PME et freelances."
        : "Professional pre-accounting service for SMEs and freelancers.",

    url: `https://virtuel-compta.vercel.app/${lang}/services/pre-comptabilite`,

    siteName: "Virtuel Comptable",

    type: "website",

    locale: lang === "fr" ? "fr_FR" : "en_US",
  },

  twitter: {
    card: "summary_large_image",

    title:
      lang === "fr"
        ? "Pré-comptabilité & Organisation Documentaire"
        : "Pre-accounting & Document Organization",

    description:
      lang === "fr"
        ? "Service de pré-comptabilité professionnel pour entreprises."
        : "Professional pre-accounting service for businesses.",
  },
};
}

export default async function PreComptabilitePage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const texts = {
    fr: {
      backToServices: "← Retour aux services",
      title: "Pré-comptabilité et organisation documentaire",
      description: "Préparez sereinement vos documents pour votre expert-comptable. Un service professionnel de pré-comptabilité pour gagner du temps et réduire les erreurs.",
      subtitle: "Ce que je prends en charge :",
      features: [
        "Classement des pièces justificatives",
        "Préparation des liasses fiscales",
        "Vérification des écritures",
        "Archivage numérique sécurisé"
      ],
      benefitTitle: "Le bénéfice pour vous",
      benefitText: "Gagnez du temps et réduisez les erreurs avec une pré-comptabilité parfaitement structurée. Vos documents sont prêts pour votre expert-comptable.",
      ctaText: "Organiser ma pré-comptabilité",
      imageAlt: "Pré-comptabilité organisée"
    },
    en: {
      backToServices: "← Back to services",
      title: "Pre-accounting and document organization",
      description: "Prepare your documents for your chartered accountant with peace of mind. A professional pre-accounting service to save time and reduce errors.",
      subtitle: "What I take care of:",
      features: [
        "Filing of supporting documents",
        "Preparation of tax packages",
        "Entry verification",
        "Secure digital archiving"
      ],
      benefitTitle: "The benefit for you",
      benefitText: "Save time and reduce errors with perfectly structured pre-accounting. Your documents are ready for your chartered accountant.",
      ctaText: "Organize my pre-accounting",
      imageAlt: "Organized pre-accounting"
    }
  };

  const t = texts[lang as "fr" | "en"] || texts.fr;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Navigation retour */}
      <nav className="mb-8">
        <Link href={`/${lang}/services`} className="inline-flex items-center gap-1 text-gray-600 transition hover:text-primary">
          {t.backToServices}
        </Link>
      </nav>

      {/* Section principale */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">{t.title}</h1>
        <p className="mb-8 text-lg text-gray-600">{t.description}</p>

        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Liste des prestations */}
          <div className="flex-1">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">{t.subtitle}</h3>
            <ul className="space-y-2">
              {t.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500">✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="flex-1">
            <Image
              src="/images/precompta.webp"
              alt={t.imageAlt}
              width={500}
              height={350}
              className="w-full rounded-xl object-cover shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Section Bénéfice */}
      <div className="mt-8 rounded-2xl border-l-8 border-primary bg-gradient-to-r from-gray-50 to-gray-100 p-6 md:p-8">
        <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">{t.benefitTitle}</h3>
        <p className="text-gray-700">{t.benefitText}</p>
      </div>

      {/* Appel à l'action */}
      <div className="mt-8 text-center">
        <Link
          href={`/${lang}/contact`}
          className="inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
        >
          {t.ctaText}
        </Link>
      </div>
    </main>
  );
}
