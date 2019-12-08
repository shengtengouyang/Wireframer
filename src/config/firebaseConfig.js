import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAqRrnHx2GLf-yXXrJKYtU4x-ujiQV2V4Y",
    authDomain: "final-project-316-3b0f6.firebaseapp.com",
    databaseURL: "https://final-project-316-3b0f6.firebaseio.com",
    projectId: "final-project-316-3b0f6",
    storageBucket: "final-project-316-3b0f6.appspot.com",
    messagingSenderId: "664268614721",
    appId: "1:664268614721:web:9de21cf7b1943ccdb9eac0",
    measurementId: "G-9DZE5MGWNT"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;