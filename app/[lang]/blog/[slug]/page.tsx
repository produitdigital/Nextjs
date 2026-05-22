import { posts } from "@/content/posts";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/get-dictionary";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// 🎯 SEO : Balises Meta Dynamiques Avancées avec support multilingue
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
        'fr': `${baseUrl}/fr/blog/${post.slug}`,
        'en': `${baseUrl}/en/blog/${post.slug}`,
      },
    },

    openGraph: {
      title: lang === "fr" ? post.title : (post.title_en || post.title),
      description: lang === "fr" ? post.description : (post.description_en || post.description),
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
    },

    twitter: {
      card: "summary_large_image",
      title: lang === "fr" ? post.title : (post.title_en || post.title),
      description: lang === "fr" ? post.description : (post.description_en || post.description),
      images: ["/banner.webp"],
    },

    robots: {
      index: true,
      follow: true,
    },
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
      shareTitle: "Partager cet article"
    },
    en: {
      backToBlog: "← Back to articles",
      readTime: "Reading time: 4 min",
      author: "By the Virtuelcomptable Team",
      ctaTitle: "Questions about digital management?",
      ctaText: "A suggestion, a question or need help structuring your business? Contact us now.",
      ctaButton: "Contact me",
      shareTitle: "Share this article"
    }
  };

  const t = articleTexts[lang as "fr" | "en"] || articleTexts.fr;

  // Fonction pour nettoyer le contenu des symboles Markdown (##, #, ---)
  const cleanContent = (text: string) => {
    return text
      .replace(/#{1,6}\s?/g, "") // Supprime les # et ##
      .replace(/---/g, "")       // Supprime les lignes horizontales
      .trim();
  };

  // Obtenir le titre et description selon la langue
  const postTitle = lang === "fr" ? post.title : (post.title_en || post.title);
  const postDescription = lang === "fr" ? post.description : (post.description_en || post.description);
  const postContent = lang === "fr" ? post.content : (post.content_en || post.content);

  return (
    <article className="blog-article-container">

      {/* DONNÉES STRUCTURÉES DYNAMIQUES DE L'ARTICLE (SEO E-E-A-T) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": postTitle,
            "description": postDescription,
            "image": "https://virtuel-comptable.web.app/banner.webp",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://virtuel-comptable.web.app/${lang}/blog/${post.slug}`
            },
            "author": {
              "@type": "Organization",
              "name": "Virtuelcomptable",
              "url": "https://virtuel-comptable.web.app"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Virtuelcomptable",
              "logo": {
                "@type": "ImageObject",
                "url": "https://virtuel-comptable.web.app/favicon.ico"
              }
            },
            "inLanguage": lang === "fr" ? "fr" : "en"
          }),
        }}
      />

      <header className="blog-header">
        <Link href={`/${lang}/blog`} className="back-link">
          {t.backToBlog}
        </Link>

        <div className="category-badge">{post.category}</div>
        <h1 className="blog-main-title">{postTitle}</h1>
        <p className="blog-intro">{postDescription}</p>

        <div className="blog-meta">
          <span>{t.readTime}</span> • <span>{t.author}</span>
        </div>

        {/* Sélecteur de langue pour l'article */}
        <div className="article-language-selector">
          <Link href={`/fr/blog/${slug}`} className={lang === "fr" ? "active" : ""}>
            🇫🇷 Français
          </Link>
          <span>|</span>
          <Link href={`/en/blog/${slug}`} className={lang === "en" ? "active" : ""}>
            🇬🇧 English
          </Link>
        </div>
      </header>

      <section className="blog-content">
        <div className="content-wrapper">
          {postContent ? cleanContent(postContent) : cleanContent(post.content)}
        </div>
      </section>

      <footer className="blog-footer">
        <div className="tags-container">
          {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>

        {/* Bloc CTA avec lien multilingue */}
        <div className="cta-box">
          <h3>{t.ctaTitle}</h3>
          <p>{t.ctaText}</p>
          <Link
            href={`/${lang}/contact`}
            className="cta-button"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            {t.ctaButton}
          </Link>
        </div>
      </footer>
    </article>
  );
}
