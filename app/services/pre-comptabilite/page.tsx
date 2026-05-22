import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Pré-comptabilité & Organisation Documentaire | Assistant Virtuel",
  description: "Préparez sereinement vos documents pour votre expert-comptable avec un service de pré-comptabilité professionnel.",
};

export default function PreComptabilitePage() {
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
        <h1 className="services-detail-title">Pré-comptabilité et organisation documentaire</h1>
        <p className="services-detail-description">
          Préparez sereinement vos documents pour votre expert-comptable. Un service professionnel de pré-comptabilité pour gagner du temps et réduire les erreurs.
        </p>

        <div className="services-detail-grid">
          <div className="services-detail-features">
            <h3 className="services-detail-subtitle">Ce que je prends en charge :</h3>
            <ul className="services-detail-list">
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Classement des pièces justificatives
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Préparation des liasses fiscales
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Vérification des écritures
              </li>
              <li className="services-detail-item">
                <span className="checkmark">✔</span> Archivage numérique sécurisé
              </li>
            </ul>
          </div>
          <div className="services-detail-image">
            <Image
              src="/images/precompta.webp"
              alt="Pré-comptabilité organisée"
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
            Gagnez du temps et réduisez les erreurs avec une pré-comptabilité parfaitement structurée. Vos documents sont prêts pour votre expert-comptable.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="services-detail-cta">
        <Link href="/contact" className="cta-button">
          Organiser ma pré-comptabilité
        </Link>
      </div>
    </main>
  );
}
