let firebase = require("firebase");
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
    console.log("I am here");
    
    firebase.initializeApp(config);
}
