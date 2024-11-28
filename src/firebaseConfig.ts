// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore importado aqui

const firebaseConfig = {
  apiKey: "AIzaSyDhZ0jNSrvphkJlCwOQXorBcvK-ZzPVkrY",
  authDomain: "finalproject-c4d5d.firebaseapp.com",
  projectId: "finalproject-c4d5d",
  storageBucket: "finalproject-c4d5d.firebasestorage.app",
  messagingSenderId: "961810668212",
  appId: "1:961810668212:web:61198fd3d2b3e64e1795e1",
  measurementId: "G-2SRTYSHXQ6"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);  // Usando Firestore

export { firestore };
