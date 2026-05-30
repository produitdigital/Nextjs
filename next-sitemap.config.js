module.exports = {
  siteUrl: "https://virtuel-compta.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/admin", "/login"],

  additionalPaths: async (config) => {
    const languages = ["fr", "en"];

    // Pages statiques
    const staticPages = [
      "",
      "/services",
      "/about",
      "/blog",
      "/contact",
      "/services/pre-comptabilite",
      "/services/relance-factures",
      "/services/saisie-comptable",
    ];

    // Slugs des articles de blog (liste manuelle)
    const blogSlugs = [
      "gestion-factures-pme",
      "prevision-financiere-pme",
      "rapprochement-bancaire",
      "gestion-cashflow-pme",
      "comptabilite-numerique-pme",
      "optimisation-fiscale-pme",
      "gestion-relations-clients-pme",
      "productivite-gestion-entreprise-pme",
      "strategie-financiere-globale-pme",
      "transformation-digitale-comptabilite-pme",
    ];

    let paths = [];

    // Ajouter pages statiques et services
    for (const lang of languages) {
      for (const page of staticPages) {
        paths.push({
          loc: `/${lang}${page}`,
          priority: page === "" ? 1.0 : 0.8,
          changefreq: "weekly",
          lastmod: new Date().toISOString(),
        });
      }
      // Ajouter articles de blog
      for (const slug of blogSlugs) {
        paths.push({
          loc: `/${lang}/blog/${slug}`,
          priority: 0.6,
          changefreq: "monthly",
          lastmod: new Date().toISOString(),
        });
      }
    }

    return paths;
  },

  transform: async (config, path) => {
    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
