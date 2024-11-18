// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const admin = require('firebase-admin');

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
const auth = getAuth(app);
const db = getFirestore(app);
admin.initializeApp(firebaseConfig);

module.exports = { auth, db, admin };
