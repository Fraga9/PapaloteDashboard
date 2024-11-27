// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC45hhJEJEh0vLU3ODJbcwJbi5Lfz4jC2s",
  authDomain: "museopapalote-2b346.firebaseapp.com",
  databaseURL: "https://museopapalote-2b346-default-rtdb.firebaseio.com",
  projectId: "museopapalote-2b346",
  storageBucket: "museopapalote-2b346.firebasestorage.app",
  messagingSenderId: "614309434319",
  appId: "1:614309434319:web:25a984538cd22a6a3b78ba",
  measurementId: "G-FZLQZST9CH"
};
// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (conditionally for supported environments)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Export app, db, and analytics
export { app, db, analytics };