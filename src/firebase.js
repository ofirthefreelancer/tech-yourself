// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCHF8-oIzaQ0dFCxmJm6rhGmuW0k73t3Jk",
  authDomain: "my-front-end-score.firebaseapp.com",
  projectId: "my-front-end-score",
  storageBucket: "my-front-end-score.appspot.com",
  messagingSenderId: "768938437100",
  appId: "1:768938437100:web:b4cdb5feebadafcab678c9",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
