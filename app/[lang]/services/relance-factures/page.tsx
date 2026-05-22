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
      ? "Gestion du Poste Clients & Relance Factures | Assistant Virtuel"
      : "Customer Management & Invoice Reminders | Virtual Assistant",
    description: lang === "fr"
      ? "Optimisez votre trésorerie avec un suivi rigoureux des factures impayées et des relances clients diplomatiques."
      : "Optimize your cash flow with rigorous tracking of unpaid invoices and diplomatic customer reminders.",
  };
}

export default async function RelanceFacturesPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const texts = {
    fr: {
      backToServices: "← Retour aux services",
      title: "Gestion du poste clients et impayés",
      description: "Ne laissez plus vos factures traîner. J'assure un suivi diplomatique et rigoureux pour protéger votre trésorerie.",
      subtitle: "Ma méthodologie de relance :",
      features: [
        "Surveillance quotidienne des échéances",
        "Relances graduelles (mail, téléphone)",
        "Mise à jour de votre tableau de bord de suivi",
        "Préparation des dossiers pour contentieux"
      ],
      benefitTitle: "Le bénéfice pour vous",
      benefitText: "Vous réduisez vos délais de paiement (DSO) sans dégrader la relation avec vos clients grâce à une approche professionnelle.",
      ctaText: "Optimiser ma trésorerie",
      imageAlt: "Suivi de facturation et relances clients"
    },
    en: {
      backToServices: "← Back to services",
      title: "Customer account and payment management",
      description: "Don't let your invoices linger. I provide diplomatic and rigorous follow-up to protect your cash flow.",
      subtitle: "My reminder methodology:",
      features: [
        "Daily deadline monitoring",
        "Gradual reminders (email, phone)",
        "Update of your monitoring dashboard",
        "Preparation of files for litigation"
      ],
      benefitTitle: "The benefit for you",
      benefitText: "Reduce your payment terms (DSO) without damaging relationships with your customers through a professional approach.",
      ctaText: "Optimize my cash flow",
      imageAlt: "Invoice tracking and customer reminders"
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
              src="/images/invoice-management.webp"
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
