import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDhr7UEypHazkiGLPO45uSPFqwlCAMh8pE",
  authDomain: "bonsai-codex.firebaseapp.com",
  projectId: "bonsai-codex",
  storageBucket: "bonsai-codex.firebasestorage.app",
  messagingSenderId: "32127300555",
  appId: "1:32127300555:web:9a3ea82b2409f917a8bc4e",
  measurementId: "G-3RWM6X89B0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);