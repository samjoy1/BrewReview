// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkHTi8JKp7JOqg6Lh-bqdf6h2_1_QnlT0",
  authDomain: "brewreview-b7d32.firebaseapp.com",
  projectId: "brewreview-b7d32",
  storageBucket: "brewreview-b7d32.firebasestorage.app",
  messagingSenderId: "286193547430",
  appId: "1:286193547430:web:dcaf647d92e1c2a30bdc67",
  measurementId: "G-0EEZPKE3H6",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const auth = getAuth(FIREBASE_APP);
console.log(
  "firebaseconfig.js DEBUG: FIRESTORE_DB is (should be an object):",
  FIRESTORE_DB
);
