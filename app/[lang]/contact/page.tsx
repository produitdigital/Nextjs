import { getDictionary } from "../../../lib/get-dictionary";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "fr" | "en");

  return (
    <div>
      <h1>{dict.navigation.contact}</h1>
      {/* Ton formulaire de contact ici */}
    </div>
  );
}
