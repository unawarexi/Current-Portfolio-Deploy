// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIHkarOQvXvd_VHZnbnlqgCvYOJXG3Glw",
  authDomain: "portfolio-53005.firebaseapp.com",
  databaseURL: "https://portfolio-53005-default-rtdb.firebaseio.com",
  projectId: "portfolio-53005",
  storageBucket: "portfolio-53005.firebasestorage.app",
  messagingSenderId: "617232540992",
  appId: "1:617232540992:web:bc9ca1c76397807c7306a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };