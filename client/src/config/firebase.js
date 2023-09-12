// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeOxccrZKWatjimEDKtVFmxHkVIZFXfxw",
  authDomain: "sneakar-70279.firebaseapp.com",
  projectId: "sneakar-70279",
  storageBucket: "sneakar-70279.appspot.com",
  messagingSenderId: "657081706772",
  appId: "1:657081706772:web:8e660f7fc6dbe564e8ba01",
  measurementId: "G-NBWTXYXJKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};