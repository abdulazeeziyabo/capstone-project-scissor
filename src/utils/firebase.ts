// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4MhOAJcXUqR0wFA20RVb8k1ozE491-bA",
  authDomain: "scissors-2d360.firebaseapp.com",
  databaseURL: "https://scissors-2d360-default-rtdb.firebaseio.com",
  projectId: "scissors-2d360",
  storageBucket: "scissors-2d360.appspot.com",
  messagingSenderId: "1057894724873",
  appId: "1:1057894724873:web:cd9b7bf5872755a2148fd8",
  measurementId: "G-Y5V98FF2BB"
};

// Initialize Firebase
export const Firebase: FirebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(Firebase
 );
export const auth = getAuth(Firebase);
export const database = getDatabase(Firebase);
