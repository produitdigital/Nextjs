import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Saisie Comptable & Rapprochement | Assistant Virtuel",
  description: "Service professionnel de saisie des pièces comptables et rapprochement bancaire pour PME.",
};

export default function SaisieComptablePage() {
  return (
    <main className="services-detail-page">
      {/* Navigation retour */}
      <nav className="services-detail-nav">
        <Link href="/services" className="back-link">
          ← Retour aux services
        </Link>
      </nav>

      {/* Section principale - style identique à section-card */}
      <section className="services-detail-card">
        <h1 className="services-detail-title">Saisie des pièces et rapprochement</h1>
        <p className="services-detail-description">
          Une comptabilité à jour est la clé d'une gestion saine. Je m'assure que chaque centime est justifié.
        </p>

        <div className="services-detail-grid">
          <div className="services-detail-features">
            <h3 className="services-detail-subtitle">Ce que je prends en charge :</h3>
            <ul className="services-detail-list">
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Saisie des factures d'achats et ventes
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Pointage du relevé bancaire
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Classement numérique des justificatifs
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Identification des écarts de règlement
              </li>
            </ul>
          </div>
          <div className="services-detail-image">
            <Image
              src="/images/Assistant-Virtuel.webp"
              alt="Saisie comptable"
              width={400}
              height={300}
              className="responsive-img"
            />
          </div>
        </div>
      </section>

      {/* Section Bénéfice - style harmonisé avec services-why */}
      <section className="services-detail-benefit">
        <div className="services-detail-benefit-content">
          <h3 className="services-detail-benefit-title">Le bénéfice pour vous</h3>
          <p className="services-detail-benefit-text">
            Une vision claire de votre trésorerie en temps réel et une sérénité totale lors des contrôles.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="services-detail-cta">
        <Link href="/contact" className="cta-button">
          Demander une étude de votre volume
        </Link>
      </div>
    </main>
  );
}
