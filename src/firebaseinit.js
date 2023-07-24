// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU4h8DQFt1xyCOgB-UCXdZZwyaoI1_6HA",
  authDomain: "photofolio-3a37d.firebaseapp.com",
  projectId: "photofolio-3a37d",
  storageBucket: "photofolio-3a37d.appspot.com",
  messagingSenderId: "483244851417",
  appId: "1:483244851417:web:fac9b3e3660053aba4bec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);