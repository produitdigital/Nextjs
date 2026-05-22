import { posts } from "@/content/posts";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { Metadata } from "next";

// Métadonnées dynamiques basées sur la langue
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: lang === "fr"
      ? "Blog Comptable Professionnel | Conseils Finance PME"
      : "Professional Accounting Blog | SME Finance Tips",
    description: lang === "fr"
      ? "Blog en comptabilité, finance et gestion PME. Conseils professionnels pour améliorer votre entreprise."
      : "Blog on accounting, finance and SME management. Professional advice to improve your business.",
    keywords: lang === "fr"
      ? ["comptabilité", "finance PME", "gestion entreprise", "blog comptable", "conseils finance"]
      : ["accounting", "SME finance", "business management", "accounting blog", "finance advice"],
  };
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Traductions pour la page blog
  const blogTexts = {
    fr: {
      title: "📚 Blog Comptable Professionnel",
      subtitle: "Conseils en comptabilité, finance et gestion pour PME modernes",
      readMore: "Lire l'article →",
      backToHome: "Accueil",
      services: "Services",
      contact: "Contact",
      blogName: "Blog Virtuel Comptable | Conseils en gestion et organisation",
      blogDescription: "Retrouvez nos articles et conseils pour optimiser la gestion financière et administrative de votre PME."
    },
    en: {
      title: "📚 Professional Accounting Blog",
      subtitle: "Tips on accounting, finance and management for modern SMEs",
      readMore: "Read article →",
      backToHome: "Home",
      services: "Services",
      contact: "Contact",
      blogName: "Virtual Accounting Blog | Management & Organization Tips",
      blogDescription: "Find our articles and tips to optimize your SME's financial and administrative management."
    }
  };

  const t = blogTexts[lang as "fr" | "en"] || blogTexts.fr;

  // Traduction des catégories
  const categoryTranslations: Record<string, { fr: string; en: string }> = {
    "Comptabilité": { fr: "Comptabilité", en: "Accounting" },
    "Finance": { fr: "Finance", en: "Finance" },
    "Banque": { fr: "Banque", en: "Banking" },
    "Business": { fr: "Business", en: "Business" },
    "Management": { fr: "Management", en: "Management" },
  };

  const translateCategory = (category: string, lang: string): string => {
    if (lang === "fr") return category;
    return categoryTranslations[category]?.en || category;
  };

  // Traduction des tags
  const tagTranslations: Record<string, { fr: string; en: string }> = {
    "facture": { fr: "facture", en: "invoice" },
    "PME": { fr: "PME", en: "SME" },
    "gestion": { fr: "gestion", en: "management" },
    "finance": { fr: "finance", en: "finance" },
    "budget": { fr: "budget", en: "budget" },
    "prévision": { fr: "prévision", en: "forecast" },
    "cashflow": { fr: "cashflow", en: "cashflow" },
    "trésorerie": { fr: "trésorerie", en: "cash flow" },
    "banque": { fr: "banque", en: "bank" },
    "audit": { fr: "audit", en: "audit" },
    "digital": { fr: "digital", en: "digital" },
    "automatisation": { fr: "automatisation", en: "automation" },
  };

  const translateTag = (tag: string, lang: string): string => {
    if (lang === "fr") return tag;
    return tagTranslations[tag]?.en || tag;
  };

  return (
    <main className="blog-page">
      {/* DONNÉES STRUCTURÉES DU BLOG (SEO GOOGLE) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": t.blogName,
            "url": `https://virtuel-comptable.web.app/${lang}/blog`,
            "description": t.blogDescription,
            "inLanguage": lang === "fr" ? "fr" : "en"
          }),
        }}
      />

      {/* BLOG HEADER - style comme services-hero */}
      <header className="blog-header">
        <div className="blog-header-content">
          <h1 className="blog-header-title">{t.title}</h1>
          <p className="blog-header-subtitle">{t.subtitle}</p>
        </div>
      </header>

      {/* INTERNAL LINKING SECTION - style comme services-navbar */}
      <nav className="blog-nav">
        <div className="blog-nav-links">
          <Link href={`/${lang}`} className="blog-nav-link">{t.backToHome}</Link>
          <Link href={`/${lang}/services`} className="blog-nav-link">{t.services}</Link>
          <Link href={`/${lang}/contact`} className="blog-nav-link">{t.contact}</Link>
        </div>
        {/* Sélecteur de langue */}
        <div className="blog-lang-selector">
          <Link href="/fr/blog" className={lang === "fr" ? "active" : ""}>FR</Link>
          <span>|</span>
          <Link href="/en/blog" className={lang === "en" ? "active" : ""}>EN</Link>
        </div>
      </nav>

      {/* BLOG GRID - style comme services-grid */}
      <section className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <span className="blog-card-category">
              {translateCategory(post.category, lang)}
            </span>

            <h2 className="blog-card-title">
              <Link href={`/${lang}/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="blog-card-description">{post.description}</p>

            <div className="blog-card-tags">
              {post.tags?.map((tag: string) => (
                <span key={tag} className="blog-card-tag">
                  #{translateTag(tag, lang)}
                </span>
              ))}
            </div>

            <Link href={`/${lang}/blog/${post.slug}`} className="blog-card-link">
              {t.readMore}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
