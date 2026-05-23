import { posts } from "@/content/posts";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { Metadata } from "next";

// Métadonnées dynamiques basées sur la langue
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
  title:
    lang === "fr"
      ? "Blog Comptable Professionnel | Conseils Finance PME"
      : "Professional Accounting Blog | SME Finance Tips",

  description:
    lang === "fr"
      ? "Blog en comptabilité, finance et gestion PME. Conseils professionnels pour améliorer votre entreprise."
      : "Blog on accounting, finance and SME management. Professional advice to improve your business.",

  keywords:
    lang === "fr"
      ? [
          "comptabilité",
          "finance PME",
          "gestion entreprise",
          "blog comptable",
          "conseils finance",
        ]
      : [
          "accounting",
          "SME finance",
          "business management",
          "accounting blog",
          "finance advice",
        ],

  alternates: {
    canonical: `https://virtuel-compta.vercel.app/${lang}/blog`,

    languages: {
      fr: "https://virtuel-compta.vercel.app/fr/blog",
      en: "https://virtuel-compta.vercel.app/en/blog",
    },
  },

  openGraph: {
    title:
      lang === "fr"
        ? "Blog Comptable Professionnel"
        : "Professional Accounting Blog",

    description:
      lang === "fr"
        ? "Articles et conseils en comptabilité et gestion financière pour PME."
        : "Articles and tips on accounting and financial management for SMEs.",

    url: `https://virtuel-compta.vercel.app/${lang}/blog`,

    siteName: "Virtuel Comptable",

    type: "website",

    locale: lang === "fr" ? "fr_FR" : "en_US",
  },

  twitter: {
    card: "summary_large_image",

    title:
      lang === "fr"
        ? "Blog Comptable Professionnel"
        : "Professional Accounting Blog",

    description:
      lang === "fr"
        ? "Conseils comptables et financiers pour entreprises."
        : "Accounting and financial advice for businesses.",
  },
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
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* DONNÉES STRUCTURÉES DU BLOG (SEO) */}
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

      {/* HEADER DU BLOG */}
      <header className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 text-center md:py-16">
        <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.subtitle}</p>
      </header>

      {/* BARRE DE NAVIGATION INTERNE + SÉLECTEUR DE LANGUE */}
      <nav className="mb-10 flex flex-col items-center justify-between gap-4 rounded-full bg-gray-100 px-6 py-3 shadow-sm md:flex-row md:rounded-full">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
          <Link href="/fr/blog" className={`rounded-full px-3 py-1 text-sm font-semibold transition ${lang === "fr" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"}`}>
            FR
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/en/blog" className={`rounded-full px-3 py-1 text-sm font-semibold transition ${lang === "en" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"}`}>
            EN
          </Link>
        </div>
      </nav>

      {/* GRILLE DES ARTICLES */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            {/* Catégorie */}
            <span className="mb-3 self-start rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-semibold text-white shadow-sm">
              {translateCategory(post.category, lang)}
            </span>

            {/* Titre */}
            <h2 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
              <Link href={`/${lang}/blog/${post.slug}`} className="hover:text-primary transition">
                {post.title}
              </Link>
            </h2>

            {/* Description */}
            <p className="mb-4 flex-1 text-gray-600 line-clamp-3">{post.description}</p>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags?.map((tag: string) => (
                <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 transition hover:bg-primary/10 hover:text-primary">
                  #{translateTag(tag, lang)}
                </span>
              ))}
            </div>

            {/* Lire la suite */}
            <Link href={`/${lang}/blog/${post.slug}`} className="inline-flex items-center gap-1 text-primary font-semibold transition hover:gap-2 hover:underline">
              {t.readMore}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
