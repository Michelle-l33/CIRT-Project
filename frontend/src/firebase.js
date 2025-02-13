// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOJinXQrKVFBAQWV_5R_5NfKppXsY7peA",
  authDomain: "cirt-file-storage.firebaseapp.com",
  projectId: "cirt-file-storage",
  storageBucket: "cirt-file-storage.firebasestorage.app",
  messagingSenderId: "56261802725",
  appId: "1:56261802725:web:96068700051fe91827320c",
  measurementId: "G-HY44WKRVQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);