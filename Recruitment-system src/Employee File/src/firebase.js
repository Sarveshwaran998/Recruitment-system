import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyB6nv6EiPR09vVXgTzqaJNqJlmPfOiwvQw",
    authDomain: "recruitment-system-3bf33.firebaseapp.com",
    projectId: "recruitment-system-3bf33",
    storageBucket: "recruitment-system-3bf33.appspot.com",
    messagingSenderId: "1019809175316",
    appId: "1:1019809175316:web:9b559fe05b701dd0b2d401",
    measurementId: "G-G84F3WDX55"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage };