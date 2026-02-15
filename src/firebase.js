import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase config from Firebase Console
// You'll get this when you create a Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAOqmWHHNxChnrWJhY-xdQGzPDnr9VnqqY",
  authDomain: "a-and-e-830ab.firebaseapp.com",
  projectId: "a-and-e-830ab",
  storageBucket: "a-and-e-830ab.firebasestorage.app",
  messagingSenderId: "657854266376",
  appId: "1:657854266376:web:1ef093a261d1f75e02a5bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
