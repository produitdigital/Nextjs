module.exports = {
  siteUrl: "https://virtuelcomptable.web.app",
  generateRobotsTxt: true,

  sitemapSize: 7000,

  changefreq: "weekly",
  priority: 0.7,

  exclude: ["/admin", "/login"],

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
