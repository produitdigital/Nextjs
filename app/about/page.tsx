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
    description:
      "Expert en comptabilité et gestion financière à distance.",
    images: ["/images/profil.webp"],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* 🧠 SCHEMA.ORG (PERSON + PROFESSIONAL PROFILE) */}
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

      <main>

        {/* HEADER */}
        <header className="header">

          <Image
            src="/images/about.webp"
            alt="Assistant virtuel comptable professionnel"
            width={800}
            height={600}
          />

          <h1>À Propos de Moi</h1>

          <p>
            Assistant virtuel spécialisé en comptabilité et gestion financière pour entreprises et PME.
          </p>

          <nav className="navbar">
            <Link href="/">Accueil</Link>
            <Link href="/services">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>

        </header>

        {/* PARCOURS */}
        <section>

          <h2>🎓 Mon Parcours</h2>

          <p>
            Licence en gestion et Master I en finance et comptabilité de l’Université Andrainjato Fianarantsoa.
          </p>

          <p>
            J’accompagne les entreprises dans la gestion financière, la comptabilité et l’optimisation administrative.
          </p>

        </section>

        {/* COMPÉTENCES */}
        <section>

          <h2>⚙️ Mes Compétences</h2>

          <p><strong>Pack Office :</strong> Word, Excel, PowerPoint, Access, Outlook</p>
          <p><strong>Logiciels comptables :</strong> QuickBooks, ZohoBooks, Sage 100, Navision, Sage Saari</p>
          <p><strong>Google Workspace :</strong> Gmail, Drive, Calendar, Sheets</p>
          <p><strong>Autres outils :</strong> Canva, Trello, Notion</p>

        </section>

        {/* SERVICES MINI */}
        <section>

          <h2>💼 Mes Services</h2>

          <ul>
            <li>Tenue de livre</li>
            <li>Rapprochement bancaire</li>
            <li>Pré-comptabilité</li>
          </ul>

        </section>

        {/* MISSION */}
        <section>

          <h2>🚀 Ma Mission</h2>

          <p>
            Simplifier la gestion financière des entreprises grâce à des services comptables fiables et professionnels à distance.
          </p>

          <p>
            Permettre aux entrepreneurs de se concentrer sur leur croissance.
          </p>

        </section>

        {/* VALEUR */}
        <section>

          <h2>⭐ Valeur ajoutée</h2>

          <p>
            Travail professionnel, rigoureux et adapté aux besoins des PME et entrepreneurs.
          </p>

        </section>

        {/* CTA */}
        <section className="section-center">

          <h2>📩 Travaillons ensemble</h2>

          <p>Besoin d’un assistant comptable fiable ? Contactez-moi dès maintenant.</p>

          <div className="cta-wrapper">
          <Link href="/contact" className="cta-button">
            Me contacter
          </Link>
         </div>

        </section>

        {/* CONTACT INFO */}
        <section className="contact-info">

          <h2>📞 Contact rapide</h2>

          <p>
            Email :{" "}
            <a href="mailto:rjeantsioriniaina@gmail.com">
              rjeantsioriniaina@gmail.com
            </a>
          </p>

          <p>
            Téléphone :{" "}
            <a href="tel:+261380806430">+261 38 08 064 30</a>
          </p>

        </section>

      </main>
    </>
  );
}
