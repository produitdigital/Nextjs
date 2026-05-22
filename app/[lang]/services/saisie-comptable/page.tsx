import Image from "next/image";
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
      ? "Saisie Comptable & Rapprochement | Assistant Virtuel"
      : "Bookkeeping & Bank Reconciliation | Virtual Assistant",
    description: lang === "fr"
      ? "Service professionnel de saisie des pièces comptables et rapprochement bancaire pour PME."
      : "Professional bookkeeping and bank reconciliation service for SMEs.",
  };
}

export default async function SaisieComptablePage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Textes selon la langue
  const texts = {
    fr: {
      backToServices: "← Retour aux services",
      title: "Saisie des pièces et rapprochement",
      description: "Une comptabilité à jour est la clé d'une gestion saine. Je m'assure que chaque centime est justifié.",
      subtitle: "Ce que je prends en charge :",
      features: [
        "Saisie des factures d'achats et ventes",
        "Pointage du relevé bancaire",
        "Classement numérique des justificatifs",
        "Identification des écarts de règlement"
      ],
      benefitTitle: "Le bénéfice pour vous",
      benefitText: "Une vision claire de votre trésorerie en temps réel et une sérénité totale lors des contrôles.",
      ctaText: "Demander une étude de votre volume",
      imageAlt: "Saisie comptable"
    },
    en: {
      backToServices: "← Back to services",
      title: "Document Entry and Bank Reconciliation",
      description: "Up-to-date accounting is the key to healthy management. I ensure every cent is accounted for.",
      subtitle: "What I take care of:",
      features: [
        "Entry of purchase and sales invoices",
        "Bank statement reconciliation",
        "Digital filing of supporting documents",
        "Identification of payment discrepancies"
      ],
      benefitTitle: "The benefit for you",
      benefitText: "A clear view of your cash flow in real time and complete peace of mind during audits.",
      ctaText: "Request a volume assessment",
      imageAlt: "Bookkeeping"
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
              src="/images/Assistant-Virtuel.webp"
              alt={t.imageAlt}
              width={400}
              height={300}
              className="w-full rounded-xl object-cover shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Section Bénéfice (style "services-why") */}
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
