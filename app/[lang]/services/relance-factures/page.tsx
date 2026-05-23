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
    alternates: {
      canonical: `https://virtuel-compta.vercel.app/${lang}/services/relance-factures`,
      languages: {
        fr: "https://virtuel-compta.vercel.app/fr/services/relance-factures",
        en: "https://virtuel-compta.vercel.app/en/services/relance-factures",
      },
    },
    openGraph: {
      title: lang === "fr"
        ? "Gestion du Poste Clients & Relance Factures"
        : "Customer Management & Invoice Reminders",
      description: lang === "fr"
        ? "Suivi des factures impayées et relance clients professionnelle."
        : "Tracking unpaid invoices and professional customer reminders.",
      url: `https://virtuel-compta.vercel.app/${lang}/services/relance-factures`,
      siteName: "Virtuel Comptable",
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr"
        ? "Gestion du Poste Clients & Relance Factures"
        : "Customer Management & Invoice Reminders",
      description: lang === "fr"
        ? "Optimisation du recouvrement et gestion clients."
        : "Cash flow optimization and customer management.",
    },
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
              src="/images/invoice-management.webp"
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
