"use client";

import { useState, useRef, use } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
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
      alert(lang === "fr" ? "Veuillez patienter quelques secondes." : "Please wait a few seconds.");
      return;
    }
    
    if (!name || !email || !message) return;
    setLoading(true);

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
      console.error(error);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ padding: "60px 20px" }}>
      <section className="section-card" style={{ maxWidth: "550px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "25px", color: "var(--dark)" }}>
          {lang === "fr" ? "📩 Contactez-nous" : "📩 Contact Us"}
        </h1>

        <form onSubmit={sendMessage} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            style={styles.input}
            placeholder={lang === "fr" ? "Nom" : "Name"}
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
                <div style={styles.spinner}></div>
                <span>{lang === "fr" ? "Envoi..." : "Sending..."}</span>
              </div>
            ) : (
              lang === "fr" ? "Envoyer" : "Send"
            )}
          </button>
        </form>

        {success && (
          <p style={styles.successText}>
            {lang === "fr" ? "✔ Message envoyé avec succès !" : "✔ Message sent successfully!"}
          </p>
        )}
      </section>

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
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    fontSize: "16px",
    backgroundColor: "white",
    outline: "none"
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    fontSize: "16px",
    minHeight: "150px",
    backgroundColor: "white",
    outline: "none"
  },
  button: {
    padding: "14px",
    backgroundColor: "var(--primary, #0070f3)",
    color: "white",
    border: "none",
    borderRadius: "8px",
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
  successText: { 
    color: "#2e7d32", 
    textAlign: "center" as const, 
    fontWeight: "bold" as const, 
    marginTop: "15px" 
  }
};
