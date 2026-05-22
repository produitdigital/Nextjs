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
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
          }),
        }}
      />

      {/* HEADER */}
      <header className="hero-header">
        <nav className="navbar">
          <Link className="nav-link" href={`/${lang}/services`}>
            {dict.navigation?.services}
          </Link>
          <Link className="nav-link" href={`/${lang}/about`}>
            {dict.navigation?.about}
          </Link>
          <Link className="nav-link" href={`/${lang}/blog`}>
            {dict.navigation?.blog}
          </Link>
          <Link className="nav-link" href={`/${lang}/contact`}>
            {dict.navigation?.contact}
          </Link>
          <div className="language-selector">
            <Link href="/fr" className={lang === "fr" ? "active" : ""}>FR</Link>
            <span> | </span>
            <Link href="/en" className={lang === "en" ? "active" : ""}>EN</Link>
          </div>
        </nav>

        <Image
          src="/images/banner.webp"
          alt="Bureau de comptabilité moderne"
          width={800}
          height={600}
          className="responsive-img"
          priority
        />

        <h1 className="hero-title">{dict.hero?.title}</h1>
        <p className="hero-text">{dict.hero?.description}</p>
        <Link href={`/${lang}/contact`} className="cta-button">
          📩 {dict.hero?.cta}
        </Link>
      </header>

      {/* BENEFITS */}
      <section className="benefits-bar">
        <div className="benefit-item">
          <strong>🚀 {dict.benefits?.zero_charge?.title}</strong>
          <p>{dict.benefits?.zero_charge?.description}</p>
        </div>
        <div className="benefit-item">
          <strong>📅 {dict.benefits?.flexibility?.title}</strong>
          <p>{dict.benefits?.flexibility?.description}</p>
        </div>
        <div className="benefit-item">
          <strong>🤝 {dict.benefits?.partner?.title}</strong>
          <p>{dict.benefits?.partner?.description}</p>
        </div>
      </section>

      {/* MAIN */}
      <main className="container">
        {/* SERVICES */}
        <section className="section-card">
          <Image
            src="/images/teamwork.webp"
            alt="Travail en équipe comptabilité"
            width={800}
            height={600}
            className="responsive-img"
          />
          <h2 className="section-title">{dict.services?.title}</h2>
          <ul className="services-list">
            <li className="services-item"><span>✔</span> {dict.services?.list?.bookkeeping}</li>
            <li className="services-item"><span>✔</span> {dict.services?.list?.bank_reconciliation}</li>
            <li className="services-item"><span>✔</span> {dict.services?.list?.precompta}</li>
            <li className="services-item"><span>✔</span> {dict.services?.list?.accounting_entries}</li>
            <li className="services-item"><span>✔</span> {dict.services?.list?.client_followup}</li>
            <li className="services-item"><span>✔</span> {dict.services?.list?.supplier_followup}</li>
            <li className="services-item"><span>✔</span> {dict.services?.list?.payments_salaries}</li>
          </ul>
        </section>

        {/* CALCULATOR */}
        <Calculator lang={lang} />

        {/* PROCESS */}
        <section className="section-process">
          <h2 className="section-title">{dict.process?.title}</h2>
          <div className="process-grid">
            <div className="process-step">
              <h3>{dict.process?.step1?.title}</h3>
              <p>{dict.process?.step1?.description}</p>
            </div>
            <div className="process-step">
              <h3>{dict.process?.step2?.title}</h3>
              <p>{dict.process?.step2?.description}</p>
            </div>
            <div className="process-step">
              <h3>{dict.process?.step3?.title}</h3>
              <p>{dict.process?.step3?.description}</p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section-card">
          <Image
            src="/images/profil.webp"
            alt="Photo de profil assistant virtuel"
            width={800}
            height={600}
            className="responsive-img"
          />
          <h2 className="section-title">{dict.about?.title}</h2>
          <p className="text-center">{dict.about?.description}</p>

          <h3 className="sub-title">{dict.about?.pack_office}</h3>
          <ul className="services-list">
            {dict.about?.pack_office_items?.map((item: string, i: number) => (
              <li key={i} className="services-item">{item}</li>
            ))}
          </ul>

          <h3 className="sub-title">{dict.about?.accounting_software}</h3>
          <ul className="services-list">
            {dict.about?.accounting_software_items?.map((item: string, i: number) => (
              <li key={i} className="services-item">{item}</li>
            ))}
          </ul>

          <h3 className="sub-title">{dict.about?.google_workspace}</h3>
          <ul className="services-list">
            {dict.about?.google_workspace_items?.map((item: string, i: number) => (
              <li key={i} className="services-item">{item}</li>
            ))}
          </ul>

          <h3 className="sub-title">{dict.about?.other_tools}</h3>
          <ul className="services-list">
            {dict.about?.other_tools_items?.map((item: string, i: number) => (
              <li key={i} className="services-item">{item}</li>
            ))}
          </ul>

          <p className="text-center">{dict.about?.goal}</p>
        </section>

        {/* SECURITY */}
        <section className="security-banner">
          <h3 className="security-title">🔒 {dict.security?.title}</h3>
          <p>{dict.security?.description}</p>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <div className="section-title">
            <h2>⭐ {dict.testimonials?.title}</h2>
            <p>{dict.testimonials?.subtitle}</p>
          </div>
          <div className="testimonial-grid">
            {(dict.testimonials?.cards || []).map((testimonial: any, i: number) => (
              <div key={i} className="testimonial-card">
                <div className="quote">"</div>
                <p>{testimonial.text}</p>
                <div className="client-info">
                  <h3>{testimonial.client}</h3>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
