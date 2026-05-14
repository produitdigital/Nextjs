"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqndA1abN4wy-uCTKyProhdxzm4_mR2Xk",
  authDomain: "virtuel-comptable.firebaseapp.com",
  projectId: "virtuel-comptable",
  storageBucket: "virtuel-comptable.firebasestorage.app",
  messagingSenderId: "192881285900",
  appId: "1:192881285900:web:0b83de32611d1a72194729",
  measurementId: "G-SE3JG29E1G"
};

// Singleton
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Naverina ho tsotra tsy misy anarana database fanampiny
export const db = getFirestore(app);
export const auth = getAuth(app);
