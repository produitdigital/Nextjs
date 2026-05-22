import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Gestion du Poste Clients & Relance Factures | Assistant Virtuel",
  description: "Optimisez votre trésorerie avec un suivi rigoureux des factures impayées et des relances clients diplomatiques.",
};

export default function RelanceFacturesPage() {
  return (
    <main className="services-detail-page">
      {/* Navigation retour */}
      <nav className="services-detail-nav">
        <Link href="/services" className="back-link">
          ← Retour aux services
        </Link>
      </nav>

      {/* Section principale */}
      <section className="services-detail-card">
        <h1 className="services-detail-title">Gestion du poste clients et impayés</h1>
        <p className="services-detail-description">
          Ne laissez plus vos factures traîner. J'assure un suivi diplomatique et rigoureux pour protéger votre trésorerie.
        </p>

        <div className="services-detail-grid">
          <div className="services-detail-features">
            <h3 className="services-detail-subtitle">Ma méthodologie de relance :</h3>
            <ul className="services-detail-list">
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Surveillance quotidienne des échéances
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Relances graduelles (mail, téléphone)
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Mise à jour de votre tableau de bord de suivi
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Préparation des dossiers pour contentieux
              </li>
            </ul>
          </div>
          <div className="services-detail-image">
            <Image
              src="/images/invoice-management.webp"
              alt="Suivi de facturation et relances clients"
              width={500}
              height={350}
              className="responsive-img"
            />
          </div>
        </div>
      </section>

      {/* Section Bénéfice */}
      <section className="services-detail-benefit">
        <div className="services-detail-benefit-content">
          <h3 className="services-detail-benefit-title">Le bénéfice pour vous</h3>
          <p className="services-detail-benefit-text">
            Vous réduisez vos délais de paiement (DSO) sans dégrader la relation avec vos clients grâce à une approche professionnelle.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="services-detail-cta">
        <Link href="/contact" className="cta-button">
          Optimiser ma trésorerie
        </Link>
      </div>
    </main>
  );
}
