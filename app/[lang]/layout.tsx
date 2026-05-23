import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  return (
    <>
      <Header lang={lang} />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
