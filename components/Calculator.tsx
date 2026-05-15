"use client";

import { useState } from "react";
import Link from "next/link";

export default function Calculator() {
  const [hours, setHours] = useState(5);
  const tarifHoraireEstimatif = 35; // Modifiez cette valeur selon votre propre tarif horaire moyen

  const budgetMensuel = hours * 4 * tarifHoraireEstimatif;
  const tempsGagne = hours * 4;

  return (
    <section className="calculator-section">
      <h2 className="section-title">📊 Estimez votre gain de temps & votre budget</h2>
      <p className="calculator-subtitle">
        Combien d'heures par semaine passez-vous sur votre facturation et vos tâches administratives ?
      </p>

      <div className="calculator-container">
        <input 
          type="range" 
          min="2" 
          max="20" 
          value={hours} 
          onChange={(e) => setHours(Number(e.target.value))}
          className="calculator-slider"
        />
        
        <p className="calculator-hours">
          Temps estimé : <strong>{hours} heures / semaine</strong>
        </p>

        <div className="calculator-results">
          <div className="result-block">
            <span>Temps libéré / mois</span>
            <p className="result-highlight">+ {tempsGagne} heures</p>
          </div>
          <div className="result-block">
            <span>Budget mensuel estimé</span>
            <p className="result-value">{budgetMensuel} €</p>
          </div>
        </div>

        <p className="calculator-disclaimer">
          *Tarif indicatif basé sur une prestation moyenne. Un devis personnalisé gratuit est nécessaire pour valider votre projet.
        </p>

        <Link href="/contact" className="cta-button calculator-cta">
          Conserver mes {hours}h pour mon cœur de métier
        </Link>
      </div>
    </section>
  );
}
