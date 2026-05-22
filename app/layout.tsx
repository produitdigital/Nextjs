import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://virtuel-comptable.web.app"),
  title: {
    default: "Assistant Virtuel Comptable | Comptabilité Freelance PME",
    template: "%s | Virtuel Comptable",
  },
  description:
    "Assistant virtuel spécialisé en gestion administrative et comptable freelance pour PME et entrepreneurs : tenue de livre, facturation et suivi clients.",
  keywords: [
    "assistant virtuel comptable",
    "comptabilité freelance",
    "assistant virtuel Madagascar",
    "gestion financière PME",
    "tenue de livre",
    "assistant administratif",
  ],
  alternates: {
    canonical: "https://virtuel-comptable.web.app",
    languages: {
      "fr-FR": "https://virtuel-comptable.web.app",
      "en-US": "https://virtuel-comptable.web.app/en",
      "x-default": "https://virtuel-comptable.web.app",
    },
  },
  openGraph: {
    title: "Assistant Virtuel Comptable | Services à distance",
    description:
      "Services administratifs et comptables professionnels à distance pour PME et entrepreneurs.",
    url: "https://virtuel-comptable.web.app",
    siteName: "Virtuel Comptable",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Assistant Virtuel Comptable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistant Virtuel Comptable",
    description:
      "Services comptables professionnels à distance pour PME et entrepreneurs.",
    images: ["/banner.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Données structurées JSON‑LD pour le service professionnel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Assistant Virtuel Comptable",
              url: "https://virtuel-comptable.web.app",
              image: "https://virtuel-comptable.web.app/banner.webp",
              description:
                "Services de secrétariat, gestion administrative et pré‑comptabilité à distance pour PME.",
              email: "rjeantsioriniaina@gmail.com",
              telephone: "+261380806430",
              areaServed: ["FR", "MG", "Worldwide"],
              serviceType: "Gestion administrative et comptable freelance",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MG",
              },
              sameAs: [
                "https://www.linkedin.com/in/jean-tsioriniaina-984998340",
                "https://www.facebook.com/hajatina.randrianantenaina",
              ],
            }),
          }}
        />

        {/* Contenu principal */}
        {children}

        {/* Footer stylé avec Tailwind */}
          <footer className="mt-16 border-t border-gray-200 bg-gray-50 py-8 text-center text-gray-500">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} Assistant Virtuel Comptable. Tous droits réservés.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
