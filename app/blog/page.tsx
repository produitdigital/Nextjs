import { posts } from "@/content/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog Comptable Professionnel | Conseils Finance PME",
  description:
    "Blog en comptabilité, finance et gestion PME. Conseils professionnels pour améliorer votre entreprise.",
  keywords: [
    "comptabilité",
    "finance PME",
    "gestion entreprise",
    "blog comptable",
    "conseils finance",
  ],
};

export default function BlogPage() {
  return (
    <main className="seo-container">
      
      {/* 🔥 DONNÉES STRUCTURÉES DU BLOG (SEO GOOGLE) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Virtuel Comptable | Conseils en gestion et organisation",
            "url": "https://virtuel-comptable.web.app/blog",
            "description": "Retrouvez nos articles et conseils pour optimiser la gestion financière et administrative de votre PME."
          }),
        }}
      />

      {/* SEO HERO SECTION */}
      <header className="hero">
        <h1>📚 Blog Comptable Professionnel</h1>
        <p>
          Conseils en comptabilité, finance et gestion pour PME modernes
        </p>
      </header>

      {/* INTERNAL LINKING SECTION (SEO BOOST) */}
      <nav className="seo-nav">
        <Link href="/">Accueil</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* BLOG GRID */}
      <section className="grid">

        {posts.map((post) => (
          <article key={post.slug} className="card">

            {/* CATEGORY (SEO CONTEXT) */}
            <span className="category">{post.category}</span>

            {/* TITLE HIERARCHY SEO */}
            <h2>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p>{post.description}</p>

            {/* TAGS = KEYWORDS BOOST */}
            <div className="tags">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>

            <Link href={`/blog/${post.slug}`} className="btn">
              Lire l'article →
            </Link>

          </article>
        ))}

      </section>

    </main>
  );
}
