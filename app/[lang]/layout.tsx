import { Metadata } from "next";
import "../globals.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "fr" ? "Assistant Virtuel Comptable" : "Virtual Accounting Assistant",
    description: "Services comptables professionnels.",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        {children}
      </body>
    </html>
  );
}
