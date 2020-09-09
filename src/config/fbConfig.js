import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    //Initialize firebase
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId:"",
    appId: "",
    measurementId: ""
  };
  
  firebase.initializeApp(firebaseConfig);
  

export default firebase;