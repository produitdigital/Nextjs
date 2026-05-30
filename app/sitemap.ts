// app/sitemap.ts
import { MetadataRoute } from "next";
import { posts } from "@/content/posts";

// Utilisez votre domaine actuel
const baseUrl = "https://virtuel-compta.vercel.app";
const languages = ["fr", "en"];

// Routes statiques (hors blog et services détaillés)
const staticRoutes = [
  "",
  "services",
  "about",
  "blog",
  "contact",
];

// Routes des services détaillés (slugs)
const serviceSlugs = [
  "saisie-comptable",
  "relance-factures",
  "pre-comptabilite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    // Pages statiques
    staticRoutes.forEach((route) => {
      const path = route === "" ? "" : `/${route}`;
      entries.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });

    // Services détaillés
    serviceSlugs.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${lang}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });

    // Articles de blog
    posts.forEach((post) => {
      entries.push({
        url: `${baseUrl}/${lang}/blog/${post.slug}`,
        lastModified: new Date(), // Tu peux utiliser post.updatedAt si disponible
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  return entries;
}
