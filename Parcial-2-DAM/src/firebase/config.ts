// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_zBXdWOcqASbLv19oqz0DE2DuVtdqikw",
  authDomain: "fir-parcial-2-dam.firebaseapp.com",
  databaseURL: "https://fir-parcial-2-dam-default-rtdb.firebaseio.com",
  projectId: "fir-parcial-2-dam",
  storageBucket: "fir-parcial-2-dam.firebasestorage.app",
  messagingSenderId: "490478569660",
  appId: "1:490478569660:web:19f0f2d1b3d5076b05e8b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);