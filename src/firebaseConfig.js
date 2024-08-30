// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyvcqyuCAGvGJk-HByMEi2ns_Ml-0ZzqA",
  authDomain: "codesphere-77591.firebaseapp.com",
  databaseURL: "https://codesphere-77591-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codesphere-77591",
  storageBucket: "codesphere-77591.appspot.com",
  messagingSenderId: "325545896794",
  appId: "1:325545896794:web:d10c8c8f07427a3a8ba163",
  measurementId: "G-F9QB7JWK5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
