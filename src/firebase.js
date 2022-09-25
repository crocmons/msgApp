import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDH7rtDR7GFyo0Sa4QoCG2TXhAbF06qfX8",
  authDomain: "chatapp-b96c9.firebaseapp.com",
  projectId: "chatapp-b96c9",
  storageBucket: "chatapp-b96c9.appspot.com",
  messagingSenderId: "647477643821",
  appId: "1:647477643821:web:8aca9f4bdff84bcb6c06a4",
  measurementId: "G-D1KPDKZVHW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();