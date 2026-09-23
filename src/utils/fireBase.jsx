// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration (safe to be public: Firebase web keys aren't secrets)
const firebaseConfig = {
  apiKey: "AIzaSyCOrZ8KNyTQ4fqIFL9mXHPRRIPPy4nNjcI",
  authDomain: "netflixgpt1-40ee2.firebaseapp.com",
  projectId: "netflixgpt1-40ee2",
  storageBucket: "netflixgpt1-40ee2.firebasestorage.app",
  messagingSenderId: "1086505001513",
  appId: "1:1086505001513:web:d9eea1d5b41b9fb5c33238",
  measurementId: "G-ZM9TT69KG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
