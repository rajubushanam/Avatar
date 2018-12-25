import firebase from "firebase";
require("firebase/firestore");
let configJSON = require("./firebase-config.json");

let config = {
  apiKey: configJSON.apiKey,
  authDomain: configJSON.authDomain,
  databaseURL: configJSON.databaseURL,
  projectId: configJSON.projectId,
  storageBucket: configJSON.storageBucket,
  messagingSenderId: configJSON.messagingSenderId
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

module.exports = { db };
