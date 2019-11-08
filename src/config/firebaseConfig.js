import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDGwHQUdc6FNs6rMo9xyznAZzTUbjHezvo",
    authDomain: "todo-hw3-316-2571b.firebaseapp.com",
    databaseURL: "https://todo-hw3-316-2571b.firebaseio.com",
    projectId: "todo-hw3-316-2571b",
    storageBucket: "todo-hw3-316-2571b.appspot.com",
    messagingSenderId: "1084286086854",
    appId: "1:1084286086854:web:e301f5bcd48f5412f4f1c7",
    measurementId: "G-F7RRJ9S4J1"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;