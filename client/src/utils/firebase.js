// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import {getFirestore}from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwWTBxcxC3t2siJwhsn01FSfvQTAdOBAE",
  authDomain: "sportify-198e3.firebaseapp.com",
  projectId: "sportify-198e3",
  storageBucket: "sportify-198e3.appspot.com",
  messagingSenderId: "890680831739",
  appId: "1:890680831739:web:8b89a0fb9a09c851884a5e",
  measurementId: "G-7HC3HNRFP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);