import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCto7eFkz5UjypVYmSrT0MJl7_Qq6QLJrY",
  authDomain: "meme-generator-3eb04.firebaseapp.com",
  projectId: "meme-generator-3eb04",
  storageBucket: "meme-generator-3eb04.appspot.com",
  messagingSenderId: "733920469797",
  appId: "1:733920469797:web:d19d7f397236720438b0cc",
  measurementId: "G-Y7ZZQD766W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
