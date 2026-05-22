import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.metadata?.title || "Assistant Virtuel Comptable",
    description: dict.metadata?.description || "Assistant virtuel en comptabilité pour PME",
    robots: "index, follow",
    openGraph: {
      title: dict.metadata?.title || "Assistant Virtuel Comptable",
      description: dict.metadata?.description || "Services de comptabilité virtuelle professionnels",
      url: "https://virtuel-comptable.web.app/",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      {/* DONNÉES STRUCTURÉES FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": (dict.faq?.questions || []).map((q: any) => ({
              "@type": "Question",
              "name": q.name,
              "acceptedAnswer": { "@type": "Answer", "text": q.answer }
            }))
          }),
        }}
      />


      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 md:py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <Image
            src="/images/banner.webp"
            alt="Bureau de comptabilité moderne"
            width={800}
            height={600}
            className="rounded-2xl shadow-lg mx-auto mb-8"
            priority
          />
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">{dict.hero?.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">{dict.hero?.description}</p>
          <Link href={`/${lang}/contact`} className="inline-flex items-center gap-2 bg-primary hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
            📩 {dict.hero?.cta}
          </Link>
        </div>
      </section>

      {/* BENEFITS BAR */}
      <div className="bg-gray-50 py-8 border-y border-gray-200">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <p className="text-xl font-bold text-gray-800">🚀 {dict.benefits?.zero_charge?.title}</p>
            <p className="text-gray-600">{dict.benefits?.zero_charge?.description}</p>
          </div>
          <div className="p-4">
            <p className="text-xl font-bold text-gray-800">📅 {dict.benefits?.flexibility?.title}</p>
            <p className="text-gray-600">{dict.benefits?.flexibility?.description}</p>
          </div>
          <div className="p-4">
            <p className="text-xl font-bold text-gray-800">🤝 {dict.benefits?.partner?.title}</p>
            <p className="text-gray-600">{dict.benefits?.partner?.description}</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* SERVICES SECTION */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Image src="/images/teamwork.webp" alt="Travail en équipe comptabilité" width={400} height={300} className="rounded-xl w-full md:w-1/2 object-cover" />
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{dict.services?.title}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li className="flex items-center gap-2 text-gray-700"><span className="text-green-500">✔</span> {dict.services?.list?.bookkeeping}</li>
                <li className="flex items-center gap-2 text-gray-700"><span className="text-green-500">✔</span> {dict.services?.list?.bank_reconciliation}</li>
                <li className="flex items-center gap-2 text-gray-700"><span className="text-green-500">✔</span> {dict.services?.list?.precompta}</li>
                <li className="flex items-center gap-2 text-gray-700"><span className="text-green-500">✔</span> {dict.services?.list?.accounting_entries}</li>
                <li className="flex items-center gap-2 text-gray-700"><span className="text-green-500">✔</span> {dict.services?.list?.client_followup}</li>
                <li className="flex items-center gap-2 text-gray-700"><span className="text-green-500">✔</span> {dict.services?.list?.supplier_followup}</li>
                <li className="flex items-center gap-2 text-gray-700"><span className="text-green-500">✔</span> {dict.services?.list?.payments_salaries}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <Calculator lang={lang} />

        {/* PROCESS SECTION */}
        <section className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">{dict.process?.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{dict.process?.step1?.title}</h3>
              <p className="text-gray-600">{dict.process?.step1?.description}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{dict.process?.step2?.title}</h3>
              <p className="text-gray-600">{dict.process?.step2?.description}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{dict.process?.step3?.title}</h3>
              <p className="text-gray-600">{dict.process?.step3?.description}</p>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Image src="/images/profil.webp" alt="Photo de profil assistant virtuel" width={300} height={400} className="rounded-xl object-cover" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{dict.about?.title}</h2>
              <p className="text-gray-700 mb-4">{dict.about?.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><h4 className="font-semibold text-primary">{dict.about?.pack_office}</h4><p className="text-gray-600">{dict.about?.pack_office_items?.join(", ")}</p></div>
                <div><h4 className="font-semibold text-primary">{dict.about?.accounting_software}</h4><p className="text-gray-600">{dict.about?.accounting_software_items?.join(", ")}</p></div>
                <div><h4 className="font-semibold text-primary">{dict.about?.google_workspace}</h4><p className="text-gray-600">{dict.about?.google_workspace_items?.join(", ")}</p></div>
                <div><h4 className="font-semibold text-primary">{dict.about?.other_tools}</h4><p className="text-gray-600">{dict.about?.other_tools_items?.join(", ")}</p></div>
              </div>
              <p className="text-gray-700 mt-4 italic">{dict.about?.goal}</p>
            </div>
          </div>
        </section>

        {/* SECURITY BANNER */}
        <section className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 border-l-8 border-primary mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-2">🔒 {dict.security?.title}</h3>
          <p className="text-gray-700">{dict.security?.description}</p>
        </section>

        {/* TESTIMONIALS */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">⭐ {dict.testimonials?.title}</h2>
            <p className="text-gray-600">{dict.testimonials?.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(dict.testimonials?.cards || []).map((testimonial: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl text-primary mb-2">"</div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-900">{testimonial.client}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
