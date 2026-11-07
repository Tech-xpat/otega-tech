import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwMt3l5FKjabNDpu8ybVwaAdKi2DqdYQw",
  authDomain: "mishael-port-folio.firebaseapp.com",
  databaseURL: "https://mishael-port-folio-default-rtdb.firebaseio.com",
  projectId: "mishael-port-folio",
  storageBucket: "mishael-port-folio.firebasestorage.app",
  messagingSenderId: "90852999870",
  appId: "1:90852999870:web:1664dcba497c022effd4ef",
  measurementId: "G-W9F0GG8Y6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only Firestore is needed on public pages. Storage is created in ImageUpload (admin-only chunk)
// and Auth is handled by Supabase, so neither is loaded for visitors.
export const firestore = getFirestore(app);

export default app;
