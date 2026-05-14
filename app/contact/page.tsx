"use client";

import { useState, useRef } from "react";
import { db } from "@/lib/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const lastSendTime = useRef(0);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSendTime.current < 5000) {
      alert("Veuillez patienter quelques secondes avant d'envoyer un autre message.");
      return;
    }

    if (!name || !email || !message) return;

    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
      });

      lastSendTime.current = now;
      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
    } catch (error) {
      console.error("Erreur Firestore :", error);
      alert("Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>📩 Contact</h1>
      
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          style={styles.textarea}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button 
          type="submit" 
          disabled={loading} 
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {loading ? (
            <div style={styles.loaderContainer}>
              {/* Loader miasa amin'ny CSS Animation tsotra */}
              <div style={styles.spinner}></div>
              <span>Envoi...</span>
            </div>
          ) : (
            "Envoyer"
          )}
        </button>
      </form>

      {success && <p style={styles.successText}>✔ Message envoyé avec succès !</p>}

      {/* Animation ho an'ny spinner raha tsy miasa ny raki-daza ivelany */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

const styles = {
  container: { 
    maxWidth: "500px", 
    margin: "40px auto", 
    padding: "20px", 
    fontFamily: "sans-serif", 
    backgroundColor: "#f9f9f9", 
    borderRadius: "8px", 
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
  },
  title: { textAlign: "center" as const, color: "#333", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" as const, gap: "15px" },
  input: { padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" },
  textarea: { padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px", minHeight: "120px" },
  button: { 
    padding: "12px", 
    backgroundColor: "#0070f3", 
    color: "white", // Nesorina ilay # diso teo
    border: "none", 
    borderRadius: "6px", 
    fontSize: "16px", 
    fontWeight: "bold" as const, 
    cursor: "pointer", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  buttonDisabled: { backgroundColor: "#a0c0f0", cursor: "not-allowed" },
  loaderContainer: { display: "flex", alignItems: "center", gap: "10px" },
  spinner: { 
    width: "18px", 
    height: "18px", 
    border: "2px solid white", 
    borderTop: "2px solid transparent", 
    borderRadius: "50%", 
    animation: "spin 0.8s linear infinite" 
  },
  successText: { color: "#2e7d32", textAlign: "center" as const, fontWeight: "bold" as const, marginTop: "15px" }
};
