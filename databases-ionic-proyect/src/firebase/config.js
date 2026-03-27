// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-vSf3pamqCbK5GV-mgQWF9FfycJSbJuU",
  authDomain: "proyectodam-8e536.firebaseapp.com",
  databaseURL: "https://proyectodam-8e536-default-rtdb.firebaseio.com",
  projectId: "proyectodam-8e536",
  storageBucket: "proyectodam-8e536.firebasestorage.app",
  messagingSenderId: "745646665694",
  appId: "1:745646665694:web:b803b09a51314d13c5374f",
  measurementId: "G-N7L27VQYDT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { auth, db, rtdb, ref, set, push, onValue, remove };
