import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDdZFRGlpOZQKWMjjmFgXMWi2qTbOgJXDc",
    authDomain: "crud-firebase-e33d3.firebaseapp.com",
    databaseURL: "https://crud-firebase-e33d3.firebaseio.com",
    projectId: "crud-firebase-e33d3",
    storageBucket: "crud-firebase-e33d3.appspot.com",
    messagingSenderId: "65146548061",
    appId: "1:65146548061:web:cd40f0af75ea7976b3c2b4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {firebase, db, auth}
