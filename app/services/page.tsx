import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "Services Comptables Freelance | Assistant Virtuel Professionnel",
  description:
    "Services comptables professionnels à distance : tenue de livre, rapprochement bancaire, pré-comptabilité, suivi clients et fournisseurs, paiements et gestion financière.",
  robots: "index, follow",
  alternates: {
    canonical: "https://virtuel-comptable.web.app/services",
  },
  openGraph: {
    title: "Services Comptables Freelance",
    description:
      "Services de comptabilité à distance pour PME et entrepreneurs.",
    url: "https://virtuel-comptable.web.app/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* 🧠 SCHEMA.ORG SEO */}
      <Script
        id="schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Assistant Virtuel Comptable",
            url: "https://virtuel-comptable.web.app/services",
            description:
              "Services comptables professionnels à distance pour PME et entrepreneurs.",
            areaServed: "Worldwide",
            serviceType: [
              "Tenue de livre",
              "Rapprochement bancaire",
              "Pré-comptabilité",
              "Gestion financière",
              "Suivi clients",
              "Suivi fournisseurs",
              "Paiements et salaires",
            ],
          }),
        }}
      />

      <main>

        {/* HEADER */}
        <header className="header">
          <h1>Mes Services Comptables</h1>

          <p>
            Solutions professionnelles de comptabilité à distance pour entreprises, startups et PME.
          </p>

          <nav className="navbar">
            <Link href="/">Accueil</Link>
            <Link href="/about">À Propos</Link>
            <Link href="/services">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        {/* SECTION 1 */}
        <section>

          <Image
            src="/images/Assistant-Viruel.webp"
            alt="Services comptables professionnels pour PME et entrepreneurs"
            width={800}
            height={600}
          />

          <h2>💼 Services comptables professionnels à distance</h2>

          <ul>
            <li>Tenue de livre comptable pour entreprises et PME</li>
            <li>Rapprochement bancaire précis et fiable</li>
            <li>Pré-comptabilité et organisation financière</li>
            <li>Écritures comptables professionnelles</li>
            <li>Comptabilisation des opérations</li>
            <li>Suivi clients et facturation</li>
            <li>Suivi fournisseurs</li>
            <li>Paiements et gestion des salaires</li>
          </ul>

        </section>

        {/* SECTION 2 */}
        <section>

          <Image
            src="/images/financial-charts.webp"
            alt="Analyse financière et gestion comptable professionnelle"
            width={800}
            height={600}
          />

          <h2>📊 Pourquoi travailler avec moi ?</h2>

          <p>
            Je vous aide à optimiser votre gestion financière et à gagner du temps grâce à une comptabilité fiable, organisée et professionnelle.
          </p>

          <p>
            Mon objectif est de vous permettre de vous concentrer sur le développement de votre entreprise.
          </p>

        </section>

        {/* SECTION 3 */}
        <section>
          <h2>⭐ Qualité de service</h2>

          <p>
            Service sérieux, rapide et adapté aux besoins des entrepreneurs, freelances et PME.
          </p>
        </section>

        {/* CTA */}
<section className="text-center">

  <h2>🚀 Prêt à collaborer ?</h2>

  <p>
    Contactez-moi pour un service comptable professionnel et fiable.
  </p>

  <div className="cta-wrapper">
    <Link href="/contact" className="cta-button">
      Demander un devis
    </Link>
  </div>

</section>

      </main>
    </>
  );
}
