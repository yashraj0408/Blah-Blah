// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDul-W1zf1juo2m1hxrCY22ZN9W4nsv5MU",
  authDomain: "blah-blah-c85cd.firebaseapp.com",
  projectId: "blah-blah-c85cd",
  storageBucket: "blah-blah-c85cd.appspot.com",
  messagingSenderId: "1031856115519",
  appId: "1:1031856115519:web:75ef0f3f43f96500bd4d8a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();