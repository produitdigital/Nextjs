import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../lib/get-dictionary";

// 1. Indispensable pour l'export statique (output: export)
// Cette fonction dit à Next.js de générer /fr et /en au moment du build
export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // 2. Récupération des traductions selon la langue
  const dict = await getDictionary(lang as "fr" | "en");

  return (
    <>
      {/* SECTION FAQ SCHEMA (Adaptée pour le multilingue) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": lang === "fr" ? "Quels services proposez-vous ?" : "What services do you offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": dict.hero.description
                }
              }
            ]
          }),
        }}
      />

      <header className="hero-header">
        <Image
          src="/images/banner.webp"
          alt="Bannière"
          width={800}
          height={600}
          className="responsive-img"
          priority
        />

        <h1 className="hero-title">
          {dict.hero.title}
        </h1>

        <p className="hero-text">
          {dict.hero.description}
        </p>

        {/* ✅ Utilisation dynamique de la langue dans les liens */}
        <Link href={`/${lang}/contact`} className="cta-button">
          {lang === "fr" ? "📩 Demander un devis" : "📩 Get a quote"}
        </Link>

        <nav className="navbar">
          <Link className="nav-link" href={`/${lang}/services`}>SERVICES</Link>
          <Link className="nav-link" href={`/${lang}/about`}>ABOUT</Link>
          <Link className="nav-link" href={`/${lang}/blog`}>BLOG</Link>
          <Link className="nav-link" href={`/${lang}/contact`}>CONTACT</Link>
        </nav>
      </header>

      <main className="container">
        {/* Sélecteur de langue rapide */}
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Link href="/fr" style={{ fontWeight: lang === "fr" ? "bold" : "normal" }}>FRANÇAIS</Link>
          {" | "}
          <Link href="/en" style={{ fontWeight: lang === "en" ? "bold" : "normal" }}>ENGLISH</Link>
        </div>
        
        <section className="section-card">
           <h2 className="section-title">
             {lang === "fr" ? "Mes Services" : "Our Services"}
           </h2>
           {/* Ton contenu ici... */}
        </section>
      </main>
    </>
  );
}
