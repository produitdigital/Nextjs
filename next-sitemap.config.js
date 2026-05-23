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
      "/services/pre-comptabilite",
      "/services/relance-factures",
      "/services/saisie-comptable",
    ];

    let paths = [];

    for (const lang of languages) {
      for (const page of staticPages) {
        paths.push({
          loc: `${config.siteUrl}/${lang}${page}`,
          priority: page === "" ? 1 : 0.8,
          changefreq: "weekly",
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
