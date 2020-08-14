import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

 
  
  const firebaseConfig = {
    apiKey: "AIzaSyA7tqvpJ7hJqWQr-XLcdFAPt82Ogwhoof4",
    authDomain: "journalapp-eb757.firebaseapp.com",
    databaseURL: "https://journalapp-eb757.firebaseio.com",
    projectId: "journalapp-eb757",
    storageBucket: "journalapp-eb757.appspot.com",
    messagingSenderId: "163182679565",
    appId: "1:163182679565:web:a80be2bf361db3dfba2744"
  };
   
  firebase.initializeApp(firebaseConfig);


  const db  = firebase.firestore();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

   export {
       db,
       googleAuthProvider,
       firebase
   }


  
 