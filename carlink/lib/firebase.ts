// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpjJKRF2It7qSb6isTsD7oCAGFoXmAoe8",
  authDomain: "carlink-83150.firebaseapp.com",
  projectId: "carlink-83150",
  storageBucket: "carlink-83150.firebasestorage.app",
  messagingSenderId: "178245658526",
  appId: "1:178245658526:web:23311c6a0b0c7c2ac7d88f",
  measurementId: "G-0HWKSPGSM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
