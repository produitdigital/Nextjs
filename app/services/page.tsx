import Link from "next/link";
import Image from "next/image";

export default function ServicesHubPage() {
  const serviceSilos = [
    {
      title: "Saisie Comptable",
      slug: "saisie-comptable",
      desc: "Saisie rigoureuse de vos pièces justificatives et rapprochement bancaire mensuel.",
      icon: "📑",
      iconBg: "#EFF6FF"
    },
    {
      title: "Relance Factures",
      slug: "relance-factures",
      desc: "Gestion du poste clients, suivi des impayés et relances professionnelles.",
      icon: "📧",
      iconBg: "#FEF3C7"
    },
    {
      title: "Pré-comptabilité",
      slug: "pre-comptabilite",
      desc: "Préparation et organisation complète de vos documents pour votre expert-comptable.",
      icon: "📂",
      iconBg: "#ECFDF5"
    }
  ];

  return (
    <>
      {/* Header de Navigation */}
      <header className="services-nav-header">
        <nav className="services-navbar">
          <Link href="/" className="services-logo">
            Virtuel<span>Comptable</span>
          </Link>
          <div className="services-nav-links">
            <Link href="/services" className="services-nav-link active">
              Services
            </Link>
            <Link href="/about" className="services-nav-link">
              À Propos
            </Link>
            <Link href="/blog" className="services-nav-link">
              Blog
            </Link>
            <Link href="/contact" className="services-nav-link">
              Contact
            </Link>
          </div>
          <Link href="/contact" className="services-cta-btn">
            Devis Gratuit
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-hero-title">
            Nos Expertises en Gestion
          </h1>
          <p className="services-hero-subtitle">
            Des solutions ciblées pour optimiser votre flux financier.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="services-main">
        <div className="services-container">
          <div className="services-grid">
            {serviceSilos.map((silo) => (
              <div key={silo.slug} className="services-card">
                <div className="services-card-icon" style={{ backgroundColor: silo.iconBg }}>
                  <span>{silo.icon}</span>
                </div>
                <h3 className="services-card-title">{silo.title}</h3>
                <p className="services-card-desc">{silo.desc}</p>
                <Link href={`/services/${silo.slug}`} className="services-card-link">
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>

          {/* Why Section */}
          <section className="services-why">
            <div className="services-why-content">
              <h2 className="services-why-title">Pourquoi cette organisation ?</h2>
              <p className="services-why-text">
                Chaque aspect de votre comptabilité mérite une attention particulière. 
                Notre structure permet une gestion modulaire adaptée à votre volume d'activité.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
