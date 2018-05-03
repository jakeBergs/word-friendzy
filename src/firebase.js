import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB614QSAYjX_HUSuAmFOVSdej8nTaRmhns",
  authDomain: "word-friendzy.firebaseapp.com",
  databaseURL: "https://word-friendzy.firebaseio.com",
  projectId: "word-friendzy",
  storageBucket: "word-friendzy.appspot.com",
  messagingSenderId: "330820800995"
};
firebase.initializeApp(config);

const database = firebase.database()

export default database;
