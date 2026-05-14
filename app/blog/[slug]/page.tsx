import { posts } from "@/content/posts";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

// 🎯 SEO : Balises Meta Dynamiques Avancées
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article introuvable",
      description: "Cet article n'existe pas.",
    };
  }

  return {
    title: `${post.title} | Virtuelcomptable`,
    description: post.description,
    keywords: post.tags,

    alternates: {
      canonical: `https://virtuel-comptable.web.app/blog/${post.slug}`,
    },

    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://virtuel-comptable.web.app/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: "/banner.webp", // Alignement sur ton visuel officiel existant
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/banner.webp"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// Génération des chemins statiques à la compilation
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Fonction pour nettoyer le contenu des symboles Markdown (##, #, ---)
  const cleanContent = (text: string) => {
    return text
      .replace(/#{1,6}\s?/g, "") // Supprime les # et ##
      .replace(/---/g, "")       // Supprime les lignes horizontales
      .trim();
  };

  return (
    <article className="blog-article-container">
      
      {/* 🔥 DONNÉES STRUCTURÉES DYNAMIQUES DE L'ARTICLE (SEO E-E-A-T) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": "https://virtuel-comptable.web.app/banner.webp",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://virtuel-comptable.web.app/blog/${post.slug}`
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
            }
          }),
        }}
      />

      <header className="blog-header">
        <Link href="/blog" className="back-link">← Retour aux articles</Link>

        <div className="category-badge">{post.category}</div>
        <h1 className="blog-main-title">{post.title}</h1>
        <p className="blog-intro">{post.description}</p>

        <div className="blog-meta">
          <span>Temps de lecture : 4 min</span> • <span>Par l'Équipe Virtuelcomptable</span>
        </div>
      </header>

      <section className="blog-content">
        <div className="content-wrapper">
          {cleanContent(post.content)}
        </div>
      </section>

      <footer className="blog-footer">
        <div className="tags-container">
          {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>

        {/* ✅ Bloc mis à jour : Lien vers la page Contact */}
        <div className="cta-box">
          <h3>Des questions sur la gestion digitale ?</h3>
          <p>Une suggestion, une question ou besoin d'aide pour structurer votre activité ? Contactez-nous dès maintenant.</p>
          <Link
            href="/contact"
            className="cta-button"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Me contacter
          </Link>
        </div>
      </footer>
    </article>
  );
}
