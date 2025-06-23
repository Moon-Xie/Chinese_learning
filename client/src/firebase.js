// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBt9K0L4G1ukiI9vlGL11Ii_f6ohffOtk",
  authDomain: "hsk-adventures.firebaseapp.com",
  projectId: "hsk-adventures",
  storageBucket: "hsk-adventures.firebasestorage.app",
  messagingSenderId: "402336362554",
  appId: "1:402336362554:web:ff2ccd9f6168aba992c503",
  measurementId: "G-PX773WN3C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 