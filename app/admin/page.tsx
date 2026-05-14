"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  // AUTH CHECK
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (!u) window.location.href = "/login";
      setUser(u);
    });
  }, []);

  // LOAD POSTS
  const loadPosts = async () => {
    const snap = await getDocs(collection(db, "posts"));
    setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // ADD POST
  const addPost = async () => {
    await addDoc(collection(db, "posts"), {
      title,
      slug,
      content,
      createdAt: serverTimestamp(),
    });

    loadPosts();
  };

  // DELETE
  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    loadPosts();
  };

  return (
    <main>
      <h1>Admin Blog</h1>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />
      <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)} />

      <button onClick={addPost}>Add</button>

      <hr />

      {posts.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>

          <button onClick={() => deletePost(p.id)}>Delete</button>
        </div>
      ))}
    </main>
  );
}
