// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGshRSaGQ6cSRG-fkWe0vjPuk6BLt9H1M",
  authDomain: "airdrop-event.firebaseapp.com",
  projectId: "airdrop-event",
  storageBucket: "airdrop-event.appspot.com",
  messagingSenderId: "1004502902677",
  appId: "1:1004502902677:web:ee070038e1f37ec84cf89c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const auth_ = getAuth();
