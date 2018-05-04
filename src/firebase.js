import firebase from 'firebase';
const uuidv1 = require('uuid/v1');

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

// create unique game
export const createGame = () => {
  const gameID = uuidv1();
  const letters = letterGenerator();
  database.ref(`games/${gameID}`).set({
    players: { player1: 0 },
    letters
  })
  return gameID;
}

const letterGenerator = () => {
  const possible = "aeioubcdfghjklmnpqrstvwxyz";
  let letters = {};
  let curr;
  for (let i = 0; i < 9; i++) {
    // generate a letter
    if (i < 2) {
      curr = possible.charAt(Math.floor(Math.random() * 5));
    }  else if (i < 4) {
      curr = possible.charAt(5 + Math.floor(Math.random() * 21));
    }
    else {
      curr = possible.charAt(Math.floor(Math.random() * 26));
    }

    if (letters[curr]) {
      letters[curr]++;
    } else {
      letters[curr] = 1;
    }
  }
  return letters;
}

export default database;

/*

Game : {
  Players: {

  },
  Letters: {
    same notation as state
  },
  Words: {
    same notation as state
  },
  Timer?
}

*/
