// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyvcqyuCAGvGJk-HByMEi2ns_Ml-0ZzqA",
    authDomain: "codesphere-77591.firebaseapp.com",
    projectId: "codesphere-77591",
    storageBucket: "codesphere-77591.appspot.com",
    messagingSenderId: "325545896794",
    appId: "1:325545896794:web:d10c8c8f07427a3a8ba163",
    measurementId: "G-F9QB7JWK5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
