
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, 
} from "firebase/firestore"
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "##",
  authDomain: "##",
  projectId: "##",
  storageBucket: "##",
  messagingSenderId: "##",
  appId: "##"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// Init services
const db = getFirestore(app);

export default db;