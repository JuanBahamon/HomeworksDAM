import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-vSf3pamqCbK5GV-mgQWF9FfycJSbJuU",
  authDomain: "proyectodam-8e536.firebaseapp.com",
  databaseURL: "https://proyectodam-8e536-default-rtdb.firebaseio.com",
  projectId: "proyectodam-8e536",
  storageBucket: "proyectodam-8e536.firebasestorage.app",
  messagingSenderId: "745646665694",
  appId: "1:745646665694:web:b803b09a51314d13c5374f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };