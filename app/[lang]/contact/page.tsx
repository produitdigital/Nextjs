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
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert(lang === "fr" ? "Erreur lors de l'envoi." : "Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
          {lang === "fr" ? "📩 Contactez-nous" : "📩 Contact Us"}
        </h1>

        <form onSubmit={sendMessage} className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              {lang === "fr" ? "Nom complet" : "Full name"}
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={lang === "fr" ? "Jean Dupont" : "John Doe"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="jean@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
              {lang === "fr" ? "Message" : "Message"}
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={lang === "fr" ? "Votre message..." : "Your message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{lang === "fr" ? "Envoi..." : "Sending..."}</span>
              </>
            ) : (
              lang === "fr" ? "Envoyer" : "Send"
            )}
          </button>
        </form>

        {success && (
          <div className="mt-5 rounded-lg bg-green-50 p-3 text-center text-green-700">
            {lang === "fr" ? "✔ Message envoyé avec succès !" : "✔ Message sent successfully!"}
          </div>
        )}
      </div>
    </main>
  );
}
