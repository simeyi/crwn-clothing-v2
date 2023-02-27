import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrr-rPp9Ht9J6MfqHMqmp6EqUhuKYDqNc",
  authDomain: "crown-clothing-b1783.firebaseapp.com",
  projectId: "crown-clothing-b1783",
  storageBucket: "crown-clothing-b1783.appspot.com",
  messagingSenderId: "446507515209",
  appId: "1:446507515209:web:58843ecbd2d4968c7dae98",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);