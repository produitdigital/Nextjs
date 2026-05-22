import { posts } from "@/content/posts";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// SEO : Balises Meta dynamiques avec support multilingue
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: lang === "fr" ? "Article introuvable" : "Article not found",
      description: lang === "fr" ? "Cet article n'existe pas." : "This article does not exist.",
    };
  }

  const baseUrl = "https://virtuel-comptable.web.app";
  return {
    title: lang === "fr"
      ? `${post.title} | Virtuelcomptable`
      : `${post.title_en || post.title} | Virtuelcomptable`,
    description: lang === "fr" ? post.description : (post.description_en || post.description),
    keywords: post.tags,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog/${post.slug}`,
      languages: {
        fr: `${baseUrl}/fr/blog/${post.slug}`,
        en: `${baseUrl}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: lang === "fr" ? post.title : (post.title_en || post.title),
      description: lang === "fr" ? post.description : (post.description_en || post.description),
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      type: "article",
      images: [{ url: "/banner.webp", width: 1200, height: 630, alt: post.title }],
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr" ? post.title : (post.title_en || post.title),
      description: lang === "fr" ? post.description : (post.description_en || post.description),
      images: ["/banner.webp"],
    },
    robots: { index: true, follow: true },
  };
}

// Génération des chemins statiques pour toutes les langues
export function generateStaticParams() {
  const languages = ["fr", "en"];
  const paths = [];
  for (const lang of languages) {
    for (const post of posts) {
      paths.push({ lang, slug: post.slug });
    }
  }
  return paths;
}

export default async function PostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Traductions pour la page article
  const articleTexts = {
    fr: {
      backToBlog: "← Retour aux articles",
      readTime: "Temps de lecture : 4 min",
      author: "Par l'Équipe Virtuelcomptable",
      ctaTitle: "Des questions sur la gestion digitale ?",
      ctaText: "Une suggestion, une question ou besoin d'aide pour structurer votre activité ? Contactez-nous dès maintenant.",
      ctaButton: "Me contacter",
      shareTitle: "Partager cet article",
    },
    en: {
      backToBlog: "← Back to articles",
      readTime: "Reading time: 4 min",
      author: "By the Virtuelcomptable Team",
      ctaTitle: "Questions about digital management?",
      ctaText: "A suggestion, a question or need help structuring your business? Contact us now.",
      ctaButton: "Contact me",
      shareTitle: "Share this article",
    },
  };
  const t = articleTexts[lang as "fr" | "en"] || articleTexts.fr;

  // Nettoyage basique du contenu Markdown
  const cleanContent = (text: string) => {
    return text
      .replace(/#{1,6}\s?/g, "")
      .replace(/---/g, "")
      .trim();
  };

  const postTitle = lang === "fr" ? post.title : (post.title_en || post.title);
  const postDescription = lang === "fr" ? post.description : (post.description_en || post.description);
  const postContent = lang === "fr" ? post.content : (post.content_en || post.content);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Données structurées JSON‑LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: postTitle,
            description: postDescription,
            image: "https://virtuel-comptable.web.app/banner.webp",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://virtuel-comptable.web.app/${lang}/blog/${post.slug}`,
            },
            author: { "@type": "Organization", name: "Virtuelcomptable", url: "https://virtuel-comptable.web.app" },
            publisher: {
              "@type": "Organization",
              name: "Virtuelcomptable",
              logo: { "@type": "ImageObject", url: "https://virtuel-comptable.web.app/favicon.ico" },
            },
            inLanguage: lang === "fr" ? "fr" : "en",
          }),
        }}
      />

      {/* En‑tête de l’article */}
      <header className="mb-8">
        <Link href={`/${lang}/blog`} className="mb-4 inline-flex items-center gap-1 text-gray-600 transition hover:text-primary">
          {t.backToBlog}
        </Link>

        <div className="mb-3">
          <span className="inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {post.category}
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">{postTitle}</h1>
        <p className="mb-4 text-lg italic text-gray-600 border-l-4 border-primary pl-4">{postDescription}</p>

        <div className="mb-4 text-sm text-gray-400">
          <span>{t.readTime}</span> • <span>{t.author}</span>
        </div>

        {/* Sélecteur de langue pour l'article */}
        <div className="flex flex-wrap items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm">
          <Link
            href={`/fr/blog/${slug}`}
            className={`rounded-full px-3 py-1 transition ${lang === "fr" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            🇫🇷 Français
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href={`/en/blog/${slug}`}
            className={`rounded-full px-3 py-1 transition ${lang === "en" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            🇬🇧 English
          </Link>
        </div>
      </header>

      {/* Contenu de l’article */}
      <section className="prose prose-lg max-w-none text-gray-700">
        <div className="whitespace-pre-line">{postContent ? cleanContent(postContent) : cleanContent(post.content)}</div>
      </section>

      {/* Pied de page : tags + CTA */}
      <footer className="mt-12 border-t border-gray-200 pt-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 transition hover:bg-primary/10 hover:text-primary">
              #{tag}
            </span>
          ))}
        </div>

        <div className="rounded-2xl border-l-8 border-primary bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center md:p-8">
          <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">{t.ctaTitle}</h3>
          <p className="mb-4 text-gray-600">{t.ctaText}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
          >
            {t.ctaButton}
          </Link>
        </div>
      </footer>
    </article>
  );
}
