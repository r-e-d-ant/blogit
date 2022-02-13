
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, 
} from "firebase/firestore"
// import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrc_q_2bsZXnYXjU_z-qxAXn5AH7rny9w",
  authDomain: "blogit-a9af5.firebaseapp.com",
  projectId: "blogit-a9af5",
  storageBucket: "blogit-a9af5.appspot.com",
  messagingSenderId: "94234164996",
  appId: "1:94234164996:web:e907a11b730beec71e9a51"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const functions = getFunctions(firebaseConfig);

// Init services
const db = getFirestore();

// export { functions };
export default db;
