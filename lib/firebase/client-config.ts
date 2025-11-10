// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4U2XJpoYh73EBlcCKD1FnDIDjDnyrSrQ",
  authDomain: "landing-page-ai-f944f.firebaseapp.com",
  projectId: "landing-page-ai-f944f",
  storageBucket: "landing-page-ai-f944f.firebasestorage.app",
  messagingSenderId: "431355059243",
  appId: "1:431355059243:web:b3ecb1b88efb6516df9e6e",
  measurementId: "G-DLCQGX24L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };