import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDam5Pjqulkvcnv4e5l_pw8QlNLthiA3yM",
    authDomain: "todo-hw3-316-301d1.firebaseapp.com",
    databaseURL: "https://todo-hw3-316-301d1.firebaseio.com",
    projectId: "todo-hw3-316-301d1",
    storageBucket: "todo-hw3-316-301d1.appspot.com",
    messagingSenderId: "496980375208",
    appId: "1:496980375208:web:ffd32e964bb013e850349d",
    measurementId: "G-15D1LVQPHM"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;