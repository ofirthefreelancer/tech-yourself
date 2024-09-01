// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqZyBRuIbHd3iynEblmzOPBU29OALKrys",
  authDomain: "tech-yourself.firebaseapp.com",
  projectId: "tech-yourself",
  storageBucket: "tech-yourself.appspot.com",
  messagingSenderId: "397932319472",
  appId: "1:397932319472:web:f34218219509f37815a835",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
