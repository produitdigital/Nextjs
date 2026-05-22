'use client';

import { useState } from 'react';

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
    <section className="calculator-section">
      <h2 className="section-title">{t.title}</h2>
      <div className="calculator">
        <div className="input-group">
          <label>{t.hours}</label>
          <input
            type="range"
            min="1"
            max="100"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <span>{hours}h</span>
        </div>
        
        <div className="input-group">
          <label>{t.rate}</label>
          <input
            type="range"
            min="20"
            max="60"
            step="5"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <span>{rate}€/h</span>
        </div>
        
        <div className="total">
          <strong>{t.total}:</strong> {total}€ HT
        </div>
        
        <button className="cta-button">
          {t.cta}
        </button>
      </div>
    </section>
  );
}
