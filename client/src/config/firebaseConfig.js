import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBailygshZZXq7wXfrPsNHKrF5HwtgqENo",
    authDomain: "communities-f033b.firebaseapp.com",
    projectId: "communities-f033b",
    storageBucket: "communities-f033b.appspot.com",
    messagingSenderId: "53727045275",
    appId: "1:53727045275:web:aa36f0fe3858335353083e",
    measurementId: "G-LE7XKDSSZS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);