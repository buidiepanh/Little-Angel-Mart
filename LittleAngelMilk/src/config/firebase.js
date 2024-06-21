// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1Z_zIU2M1oveRBlqVDTJZSvaFKxt4rfQ",
  authDomain: "little-angel-mart.firebaseapp.com",
  projectId: "little-angel-mart",
  storageBucket: "little-angel-mart.appspot.com",
  messagingSenderId: "128725031123",
  appId: "1:128725031123:web:8097c212f99b763d9f9c26",
  measurementId: "G-FRHS6Q4CWP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export { googleProvider, auth };
