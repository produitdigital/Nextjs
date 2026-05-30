module.exports = {
  siteUrl: "https://virtuel-compta.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/admin", "/login"],

  additionalPaths: async (config) => {
    const languages = ["fr", "en"];

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

    // Liste manuelle des slugs d'articles (vérifiez qu'ils existent dans content/posts.ts)
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

    for (const lang of languages) {
      for (const page of staticPages) {
        paths.push({
          loc: `/${lang}${page}`,
          priority: page === "" ? 1.0 : 0.8,
          changefreq: "weekly",
          lastmod: new Date().toISOString(),
        });
      }
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
};
