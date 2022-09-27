// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6qk5K77xWOtyGvwB3qgigD92SXk8uQsU",
  authDomain: "nitter-515fa.firebaseapp.com",
  projectId: "nitter-515fa",
  storageBucket: "nitter-515fa.appspot.com",
  messagingSenderId: "136108327054",
  appId: "1:136108327054:web:039bfb63ad31fd7ddec9df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebase.initializeApp(firebaseConfig);