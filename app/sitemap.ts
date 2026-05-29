import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ======================
    // 🌍 HOME
    // ======================
    {
      url: "https://virtuel-compta.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    // ======================
    // 🇫🇷 FRENCH VERSION
    // ======================
    {
      url: "https://virtuel-compta.vercel.app/fr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://virtuel-compta.vercel.app/fr/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://virtuel-compta.vercel.app/fr/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://virtuel-compta.vercel.app/fr/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },

    // ======================
    // 🇬🇧 ENGLISH VERSION
    // ======================
    {
      url: "https://virtuel-compta.vercel.app/en",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://virtuel-compta.vercel.app/en/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://virtuel-compta.vercel.app/en/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://virtuel-compta.vercel.app/en/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
