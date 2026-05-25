"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);

  const [posts, setPosts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  // AUTH
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        window.location.href = "/login";
      } else {
        setUser(u);
      }
    });

    return () => unsubscribe();
  }, []);

  // POSTS
  const loadPosts = async () => {
    try {
      const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      setPosts(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    } catch (error) {
      console.error("Erreur posts :", error);
    }
  };

  // CONTACTS (IMPORTANT FIX HERE)
  const loadContacts = async () => {
    try {
      const snap = await getDocs(collection(db, "contacts"));

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      console.log("CONTACTS:", data);

      setContacts(data);
    } catch (error) {
      console.error("Erreur contacts :", error);
    }
  };

  // INIT LOAD
  useEffect(() => {
    loadPosts();
    loadContacts();
  }, []);

  // ADD POST
  const addPost = async () => {
    if (!title || !slug || !content) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        title,
        slug,
        content,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setSlug("");
      setContent("");

      await loadPosts();

      alert("Article publié avec succès");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’ajout");
    } finally {
      setLoading(false);
    }
  };

  // DELETE POST
  const deletePost = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      await loadPosts();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-10 text-3xl font-bold text-gray-900">
        🛠 Administration
      </h1>

      {/* FORM */}
      <div className="mb-14 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          ➕ Nouvel article
        </h2>

        <div className="space-y-4">
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <textarea
            className="w-full rounded-lg border p-3"
            rows={6}
            placeholder="Contenu"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={addPost}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white"
          >
            {loading ? "Loading..." : "Publier"}
          </button>
        </div>
      </div>

      {/* POSTS */}
      <div className="mb-16">
        <h2 className="mb-5 text-xl font-bold">📄 Articles</h2>

        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-3 rounded-lg border p-4"
          >
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm text-gray-500">
              /{post.slug}
            </p>

            <p className="text-xs text-gray-400">
              {post.createdAt?.seconds
                ? new Date(
                    post.createdAt.seconds * 1000
                  ).toLocaleString()
                : "Pas de date"}
            </p>

            <button
              onClick={() => deletePost(post.id)}
              className="mt-2 rounded bg-red-500 px-3 py-1 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* CONTACTS (FIXED SECTION) */}
      <div>
        <h2 className="mb-5 text-xl font-bold">
          📞 Messages Clients
        </h2>

        {contacts.map((c) => (
          <div
            key={c.id}
            className="mb-3 rounded-lg border p-4"
          >
            <p className="font-bold">👤 {c.name}</p>
            <p className="text-gray-600">📧 {c.email}</p>

            <p className="mt-2">{c.message}</p>

            <p className="mt-2 text-xs text-gray-400">
              {c.createdAt?.seconds
                ? new Date(
                    c.createdAt.seconds * 1000
                  ).toLocaleString()
                : "Pas de date"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
