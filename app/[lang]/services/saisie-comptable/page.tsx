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
    <main className="services-detail-page">
      {/* Navigation retour */}
      <nav className="services-detail-nav">
        <Link href={`/${lang}/services`} className="back-link">
          {t.backToServices}
        </Link>
      </nav>

      {/* Section principale */}
      <section className="services-detail-card">
        <h1 className="services-detail-title">{t.title}</h1>
        <p className="services-detail-description">{t.description}</p>

        <div className="services-detail-grid">
          <div className="services-detail-features">
            <h3 className="services-detail-subtitle">{t.subtitle}</h3>
            <ul className="services-detail-list">
              {t.features.map((feature, index) => (
                <li key={index} className="services-detail-item">
                  <span className="checkmark">✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="services-detail-image">
            <Image
              src="/images/Assistant-Virtuel.webp"
              alt={t.imageAlt}
              width={400}
              height={300}
              className="responsive-img"
            />
          </div>
        </div>
      </section>

      {/* Section Bénéfice */}
      <section className="services-detail-benefit">
        <div className="services-detail-benefit-content">
          <h3 className="services-detail-benefit-title">{t.benefitTitle}</h3>
          <p className="services-detail-benefit-text">{t.benefitText}</p>
        </div>
      </section>

      {/* CTA */}
      <div className="services-detail-cta">
        <Link href={`/${lang}/contact`} className="cta-button">
          {t.ctaText}
        </Link>
      </div>
    </main>
  );
}
