import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  // ✅ Plus d'import de Header - juste les enfants
  return <>{children}</>;
}
