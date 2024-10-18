const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getStorage } = require("firebase/storage");  // Necesitarás esta importación para Firebase Storage
<<<<<<< HEAD

// Importa las funciones necesarias de Firebase SDK
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwWTBxcxC3t2siJwhsn01FSfvQTAdOBAE",
=======
require('dotenv').config();
// Importa las funciones necesarias de Firebase SDK
// Configuración de Firebase
const firebaseConfig = {
    apiKey:process.env.FIREBASE_API_KEY ,
>>>>>>> 1bc70db92518f7e34050d8413dc202362dc18d5b
    authDomain: "sportify-198e3.firebaseapp.com",
    projectId: "sportify-198e3",
    storageBucket: "sportify-198e3.appspot.com",
    messagingSenderId: "890680831739",
    appId: "1:890680831739:web:8b89a0fb9a09c851884a5e",
    measurementId: "G-7HC3HNRFP5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);


// Inicializa Firebase Storage
const storage = getStorage(app);

<<<<<<< HEAD
module.exports = { storage };
=======
module.exports = { storage };
>>>>>>> 1bc70db92518f7e34050d8413dc202362dc18d5b
