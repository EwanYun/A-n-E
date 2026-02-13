import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase config from Firebase Console
// You'll get this when you create a Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAt2fEUd2QxWRsHhpzfGrrEPjmxo0rLdUA",
  authDomain: "a-n-e-d947a.firebaseapp.com",
  projectId: "a-n-e-d947a",
  storageBucket: "a-n-e-d947a.firebasestorage.app",
  messagingSenderId: "309050151737",
  appId: "1:309050151737:web:e2e9e91eeb09e1fd6c8ee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
