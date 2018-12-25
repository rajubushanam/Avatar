import React from "react";
import {
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Expo from "expo";
import {db} from "./../firebase/firebase";
let configJSON = require("./../config.json");
import firebase from "firebase";
require("firebase/firestore")

let userDetails = firebase.auth().onAuthStateChanged(user => {
  if (user !== null) {
    console.log("Authenticated!");
    return user;
  }
  return null;
});

function loginWithGoogle(token) {
  const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
  console.log("Credential", credential);

  return firebase
    .auth()
    .signInAndRetrieveDataWithCredential(credential)
    .catch(error => {
      console.log("Firebase 1 Error", error);
      return error;
    });
}

export default class LoginScreen extends React.Component {
  handleGooglePlus = () => {
    Expo.Google.logInAsync({
      behavior: "web",
      androidClientId: configJSON.androidClientId,
      iosClientId: configJSON.iosClientId,
      scopes: ["profile", "email"]
    })
      .then(result => {
        if (result.type === "success") {
          console.log("Result", result);
          loginWithGoogle(result.accessToken)
            .then(firebaseResult => {
              console.log("Firebase 2 Result", firebaseResult);
              if (userDetails() !== null) {
                console.log("User object", result);
                const { email, familyName, givenName, photoUrl } = result.user;

                db.collection("users").doc(firebaseResult.user.uid)
                  .set({
                    email: email,
                    lastName: givenName,
                    firstName: familyName,
                    photoUrl: photoUrl
                  })
                  .then(() => {
                    AsyncStorage.setItem("userToken", result.accessToken).then(
                      () => {
                        this.props.navigation.navigate("Main");
                      }
                    );
                  });
              } else {
                console.log("Not Authenticated");
              }
            })
            .catch(e => {
              console.log("error", e);

              return { error: true };
            });
        } else {
          return { cancelled: true };
        }
      })
      .catch(e => {
        return { error: true };
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleGooglePlus} title="Google Plus Login" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 50
  }
});
