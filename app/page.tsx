import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistant Virtuel Comptable | Comptabilité Freelance Professionnelle",
  description:
    "Assistant virtuel en comptabilité pour PME et entrepreneurs : tenue de livre, rapprochement bancaire, écritures comptables, suivi clients et fournisseurs.",
  robots: "index, follow",
  openGraph: {
    title: "Assistant Virtuel Comptable",
    description:
      "Services de comptabilité virtuelle professionnels pour entreprises et freelances.",
    url: "https://virtuel-comptable.web.app/",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/* 🔥 DONNÉES STRUCTURÉES FAQ (SEO GOOGLE RICH SNIPPETS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quels services propose un assistant virtuel comptable ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tenue de livre, rapprochement bancaire, gestion des factures clients et fournisseurs, et assistance administrative à distance."
                }
              },
              {
                "@type": "Question",
                "name": "Travaillez-vous entièrement à distance ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, tous les services de secrétariat comptable et gestion sont réalisés à distance pour les PME et entrepreneurs."
                }
              }
            ]
          }),
        }}
      />

      {/* HEADER */}
      <header className="hero-header">
        <Image
          src="/images/banner.webp"
          alt="Bureau de comptabilité moderne avec graphiques financiers"
          width={800}
          height={600}
          className="responsive-img"
          priority // Ajouté pour optimiser le LCP (Vitesse de chargement SEO)
        />

        <h1 className="hero-title">
          Bienvenue sur Mon Site d'Assistant Virtuel en Comptabilité
        </h1>

        <p className="hero-text">
          Services comptables professionnels à distance adaptés aux entreprises
          : gestion financière, tenue de livre et assistance administrative.
        </p>

        <Link href="/contact" className="cta-button">
          📩 Demander un devis gratuit
        </Link>
        
        <nav className="navbar">
          <Link className="nav-link" href="/services">
            SERVICES
          </Link>
          <Link className="nav-link" href="/about">
            À PROPOS
          </Link>
          <Link className="nav-link" href="/blog">
            BLOG
          </Link>
          <Link className="nav-link" href="/contact">
            CONTACT
          </Link>
        </nav>
      </header>

      {/* MAIN */}
      <main className="container">
        <section className="section-card">
          <Image
            src="/images/teamwork.webp"
            alt="Travail en équipe comptabilité"
            width={800}
            height={600}
            className="responsive-img"
          />

          <h2 className="section-title">Les services que j'offre</h2>

          <ul className="services-list">
            {[
              "Tenue de livre",
              "Rapprochement bancaire",
              "Pré-comptabilité",
              "Écritures comptables",
              "Suivi clients",
              "Suivi fournisseurs",
              "Paiements & salaires",
            ].map((item, i) => (
              <li key={i} className="services-item">
                <span>✔</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="section-card">
          <Image
            src="/images/profil.webp"
            alt="Photo de profil assistant virtuel"
            width={800}
            height={600}
            className="responsive-img"
          />

          <h2 className="section-title">À Propos de Moi</h2>

          <p className="text-center">
            Assistant virtuel spécialisé en comptabilité, j’aide les entreprises
            à optimiser leur gestion financière avec des solutions fiables et
            professionnelles.
          </p>

          <h3 className="sub-title">Pack Office</h3>
          <ul className="services-list">
            <li className="services-item">Word, Excel, PowerPoint, Access, Outlook</li>
          </ul>

          <h3 className="sub-title">Logiciels comptables</h3>
          <ul className="services-list">
            <li className="services-item">
              QuickBooks, ZohoBooks, Sage 100, Navision, Sage Saari
            </li>
          </ul>

          <h3 className="sub-title">Google Workspace</h3>
          <ul className="services-list">
            <li className="services-item">
              Gmail, Google Sheets, Drive, Calendar
            </li>
          </ul>

          <h3 className="sub-title">Autres outils</h3>
          <ul className="services-list">
            <li className="services-item">Canva, Trello, Notion</li>
          </ul>

          <p className="text-center">
            Mon objectif est de simplifier la gestion financière des entreprises
            grâce à un service à distance efficace et personnalisé.
          </p>
        </section>

        <section className="testimonials">
          <div className="section-title">
            <h2>⭐ Témoignages Clients</h2>
            <p>
              Quelques retours de clients satisfaits de mes services comptables.
            </p>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="quote">“</div>
              <p>
                Service très professionnel et rapide. Mon suivi comptable est devenu beaucoup plus organisé.
              </p>
              <div className="client-info">
                <h3>Client PME</h3>
                <span>Entreprise locale</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote">“</div>
              <p>
                Excellent assistant virtuel. Travail sérieux, communication fluide et résultats rapides.
              </p>
              <div className="client-info">
                <h3>Entrepreneur Freelance</h3>
                <span>Business en ligne</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote">“</div>
              <p>
                Je recommande vivement ses services pour la gestion comptable et administrative.
              </p>
              <div className="client-info">
                <h3>Startup Client</h3>
                <span>PME & Startup</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
