import app from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAt9_gm1AbeiM2xtAQW7DzXYywlbziQ5MU",
    authDomain: "job-listing-b3611.firebaseapp.com",
    projectId: "job-listing-b3611",
    storageBucket: "job-listing-b3611.appspot.com",
    messagingSenderId: "184955846350",
    appId: "1:184955846350:web:3a65d38e61a4ac9cc85a9f"
  };
  // Initialize Firebase
  const firebase = app.initializeApp(firebaseConfig, "secondary");
  const firestore = firebase.firestore();

  export { firebase, firestore, app};