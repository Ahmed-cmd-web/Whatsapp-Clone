/** @format */

import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_mOVszo6rlkJcHcc7Te9NCS3eYOFGvRA",
  authDomain: "whatsapp-clone-d0ab4.firebaseapp.com",
  projectId: "whatsapp-clone-d0ab4",
  storageBucket: "whatsapp-clone-d0ab4.appspot.com",
  messagingSenderId: "397951204788",
  appId: "1:397951204788:web:ae2a52665604a8ded006e1",
  measurementId: "G-0XG8VMBTJP",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
