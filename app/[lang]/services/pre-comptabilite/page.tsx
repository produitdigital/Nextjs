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
      ? "Pré-comptabilité & Organisation Documentaire | Assistant Virtuel"
      : "Pre-accounting & Document Organization | Virtual Assistant",
    description: lang === "fr"
      ? "Préparez sereinement vos documents pour votre expert-comptable avec un service de pré-comptabilité professionnel."
      : "Prepare your documents for your chartered accountant with a professional pre-accounting service.",
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
    <main className="services-detail-page">
      <nav className="services-detail-nav">
        <Link href={`/${lang}/services`} className="back-link">
          {t.backToServices}
        </Link>
      </nav>

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
              src="/images/precompta.webp"
              alt={t.imageAlt}
              width={500}
              height={350}
              className="responsive-img"
            />
          </div>
        </div>
      </section>

      <section className="services-detail-benefit">
        <div className="services-detail-benefit-content">
          <h3 className="services-detail-benefit-title">{t.benefitTitle}</h3>
          <p className="services-detail-benefit-text">{t.benefitText}</p>
        </div>
      </section>

      <div className="services-detail-cta">
        <Link href={`/${lang}/contact`} className="cta-button">
          {t.ctaText}
        </Link>
      </div>
    </main>
  );
}
