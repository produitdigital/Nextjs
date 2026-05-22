'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CalculatorProps {
  lang?: string;
}

export default function Calculator({ lang = 'fr' }: CalculatorProps) {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(35);

  const total = hours * rate;

  const texts = {
    fr: {
      title: "📊 Simulateur de Tarifs",
      hours: "Heures par mois",
      rate: "Tarif horaire (€)",
      total: "Total mensuel estimé",
      cta: "Demander un devis personnalisé"
    },
    en: {
      title: "📊 Price Simulator",
      hours: "Hours per month",
      rate: "Hourly rate (€)",
      total: "Estimated monthly total",
      cta: "Request a personalized quote"
    }
  };

  const t = texts[lang as keyof typeof texts] || texts.fr;

  return (
    <section className="my-12 rounded-2xl bg-white p-6 shadow-md md:p-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 md:text-3xl">
        {t.title}
      </h2>

      <div className="mx-auto max-w-md space-y-6">
        {/* Heures */}
        <div className="space-y-2">
          <label htmlFor="hours-range" className="block text-sm font-medium text-gray-700">
            {t.hours}
          </label>
          <div className="flex items-center gap-4">
            <input
              id="hours-range"
              type="range"
              min="1"
              max="100"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer rounded-lg bg-gray-200 accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={t.hours}
            />
            <span className="w-12 text-center font-semibold text-gray-800">{hours}h</span>
          </div>
        </div>

        {/* Tarif horaire */}
        <div className="space-y-2">
          <label htmlFor="rate-range" className="block text-sm font-medium text-gray-700">
            {t.rate}
          </label>
          <div className="flex items-center gap-4">
            <input
              id="rate-range"
              type="range"
              min="20"
              max="60"
              step="5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer rounded-lg bg-gray-200 accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={t.rate}
            />
            <span className="w-12 text-center font-semibold text-gray-800">{rate}€/h</span>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-4 text-center transition-all hover:from-primary/20 hover:to-secondary/20">
          <p className="text-lg font-bold text-gray-800">
            {t.total} :{' '}
            <span className="text-2xl font-extrabold text-primary">
              {total}€ HT
            </span>
          </p>
        </div>

        {/* Bouton CTA (lien vers contact) */}
        <Link
          href={`/${lang}/contact`}
          className="block w-full rounded-full bg-gradient-to-r from-primary to-secondary py-3 text-center font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
