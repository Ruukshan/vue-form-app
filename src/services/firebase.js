// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0xLWy1oL5lVD6Jtbct-43E-JjFIthMwQ",
  authDomain: "vue-form-app-13761.firebaseapp.com",
  projectId: "vue-form-app-13761",
  storageBucket: "vue-form-app-13761.firebasestorage.app",
  messagingSenderId: "934703435134",
  appId: "1:934703435134:web:16c65867a338ee77b5772f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };