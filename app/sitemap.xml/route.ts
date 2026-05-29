export async function GET() {
  const baseUrl = "https://virtuel-compta.vercel.app";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
