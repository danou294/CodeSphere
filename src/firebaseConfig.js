// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/analytics"; // Désactivé temporairement

// Configuration Firebase avec variables d'environnement
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase avec configuration minimale
let app;
try {
  app = firebase.app();
} catch (e) {
  app = firebase.initializeApp(firebaseConfig);
}

// Services Firebase (sans Analytics)
const analytics = null; // Complètement désactivé
const auth = firebase.auth();
const firestore = firebase.firestore();

// Configuration de la persistance
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((error) => {
  console.error('Erreur persistance:', error);
});

export { app, analytics, auth, firestore };
