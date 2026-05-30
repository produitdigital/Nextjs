import { MetadataRoute } from "next";

const baseUrl = "https://virtuel-compta.vercel.app";

/**
 * 👉 Raha manana API na DB ianao dia soloina eto
 * ohatra: fetch("/api/blogs")
 */
async function getBlogSlugs() {
  return [
    "gestion-factures-pme",
    "prevision-financiere-pme",
    "rapprochement-bancaire",
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getBlogSlugs();

  // 🌍 Static pages
  const staticPages = [
    "",
    "/fr",
    "/fr/about",
    "/fr/contact",
    "/fr/services",
    "/fr/services/pre-comptabilite",
    "/fr/services/relance-factures",
    "/fr/services/saisie-comptable",
    "/fr/blog",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/fr" ? 1 : 0.7,
  }));

  // 🧠 Dynamic blog pages
  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/fr/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...blogUrls];
}
