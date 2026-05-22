import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "À Propos | Assistant Virtuel en Comptabilité Professionnel",
  description:
    "Découvrez mon parcours en comptabilité, mes compétences et mon expertise en gestion financière pour PME et entrepreneurs.",
  robots: "index, follow",
  authors: [{ name: "Assistant Virtuel Comptabilité" }],
  alternates: {
    canonical: "https://virtuel-comptable.web.app/about",
  },
  openGraph: {
    title: "À Propos | Assistant Virtuel Comptabilité",
    description:
      "Parcours professionnel et expertise en comptabilité et gestion financière.",
    url: "https://virtuel-comptable.web.app/about",
    type: "website",
    images: [
      {
        url: "/images/profil.webp",
        width: 800,
        height: 600,
        alt: "Assistant virtuel comptable professionnel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos | Assistant Virtuel Comptabilité",
    description: "Expert en comptabilité et gestion financière à distance.",
    images: ["/images/profil.webp"],
  },
};

export default function AboutPage() {
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
            jobTitle: "Assistant Virtuel en Comptabilité",
            description:
              "Expert en comptabilité et gestion financière pour PME et entrepreneurs.",
            url: "https://virtuel-comptable.web.app/about",
            sameAs: [],
          }),
        }}
      />

      <main className="about-page">
        {/* Header Section - style comme services-hero */}
        <header className="about-header">
          <div className="about-header-content">
            <div className="about-header-image">
              <Image
                src="/images/about.webp"
                alt="Assistant virtuel comptable professionnel"
                width={800}
                height={600}
                className="about-image"
              />
            </div>
            <h1 className="about-title">À Propos de Moi</h1>
            <p className="about-subtitle">
              Assistant virtuel spécialisé en comptabilité et gestion financière pour entreprises et PME.
            </p>
            <nav className="about-nav">
              <Link href="/" className="about-nav-link">Accueil</Link>
              <Link href="/services" className="about-nav-link">Services</Link>
              <Link href="/blog" className="about-nav-link">Blog</Link>
              <Link href="/contact" className="about-nav-link">Contact</Link>
            </nav>
          </div>
        </header>

        {/* Parcours Section */}
        <section className="about-section">
          <div className="about-section-content">
            <h2 className="about-section-title">🎓 Mon Parcours</h2>
            <p className="about-section-text">
              Licence en gestion et Master I en finance et comptabilité de l'Université Andrainjato Fianarantsoa.
            </p>
            <p className="about-section-text">
              J'accompagne les entreprises dans la gestion financière, la comptabilité et l'optimisation administrative.
            </p>
          </div>
        </section>

        {/* Compétences Section - style comme services-grid */}
        <section className="about-skills">
          <h2 className="about-skills-title">⚙️ Mes Compétences</h2>
          <div className="about-skills-grid">
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">Pack Office</h3>
              <p className="about-skill-card-text">Word, Excel, PowerPoint, Access, Outlook</p>
            </div>
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">Logiciels comptables</h3>
              <p className="about-skill-card-text">QuickBooks, ZohoBooks, Sage 100, Navision, Sage Saari</p>
            </div>
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">Google Workspace</h3>
              <p className="about-skill-card-text">Gmail, Drive, Calendar, Sheets</p>
            </div>
            <div className="about-skill-card">
              <h3 className="about-skill-card-title">Autres outils</h3>
              <p className="about-skill-card-text">Canva, Trello, Notion</p>
            </div>
          </div>
        </section>

        {/* Services Mini Section */}
        <section className="about-section-light">
          <div className="about-section-content">
            <h2 className="about-section-title">💼 Mes Services</h2>
            <ul className="about-services-list">
              <li className="about-services-item">Tenue de livre</li>
              <li className="about-services-item">Rapprochement bancaire</li>
              <li className="about-services-item">Pré-comptabilité</li>
            </ul>
          </div>
        </section>

        {/* Mission Section - style comme services-why */}
        <section className="about-mission">
          <div className="about-mission-content">
            <h2 className="about-mission-title">🚀 Ma Mission</h2>
            <p className="about-mission-text">
              Simplifier la gestion financière des entreprises grâce à des services comptables fiables et professionnels à distance.
            </p>
            <p className="about-mission-text">
              Permettre aux entrepreneurs de se concentrer sur leur croissance.
            </p>
          </div>
        </section>

        {/* Valeur ajoutée Section */}
        <section className="about-section">
          <div className="about-section-content">
            <h2 className="about-section-title">⭐ Valeur ajoutée</h2>
            <p className="about-section-text">
              Travail professionnel, rigoureux et adapté aux besoins des PME et entrepreneurs.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="about-cta-content">
            <h2 className="about-cta-title">📩 Travaillons ensemble</h2>
            <p className="about-cta-text">
              Besoin d'un assistant comptable fiable ? Contactez-moi dès maintenant.
            </p>
            <div className="about-cta-button-wrapper">
              <Link href="/contact" className="cta-button">
                Me contacter
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="about-contact">
          <div className="about-contact-content">
            <h2 className="about-contact-title">📞 Contact rapide</h2>
            <p className="about-contact-email">
              Email :{" "}
              <a href="mailto:rjeantsioriniaina@gmail.com">
                rjeantsioriniaina@gmail.com
              </a>
            </p>
            <p className="about-contact-phone">
              Téléphone :{" "}
              <a href="tel:+261380806430">+261 38 08 064 30</a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
