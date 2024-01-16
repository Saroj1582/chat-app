import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyClzNGeeXrBQwG05xEhWCIu9jkjDOG9lmE",
  authDomain: "chat-app-9bc1d.firebaseapp.com",
  projectId: "chat-app-9bc1d",
  storageBucket: "chat-app-9bc1d.appspot.com",
  messagingSenderId: "39610108829",
  appId: "1:39610108829:web:dfd2588102054f1470bd74",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
