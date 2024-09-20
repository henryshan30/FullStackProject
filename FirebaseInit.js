// In this file we will initialize our firebase database

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: copy-paste the config variables found in your Firebase Project Settings!
const firebaseConfig = {
    apiKey: "AIzaSyBAL9b1fFBxKmpLG4kbN-FfrPOMcPacWWU",
    authDomain: "fullstackproject-2af0d.firebaseapp.com",
    projectId: "fullstackproject-2af0d",
    storageBucket: "fullstackproject-2af0d.appspot.com",
    messagingSenderId: "365751051757",
    appId: "1:365751051757:web:faa05212691c3a3c02f3e4",
    measurementId: "G-FM36GP2QP6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);