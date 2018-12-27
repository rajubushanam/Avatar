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
import * as Expo from "expo";
import { db } from "./../firebase/firebase";
let configJSON = require("./../config.json");
import firebase from "firebase";
require("firebase/firestore");

let userDetails = firebase.auth().onAuthStateChanged(user => {
  if (user !== null) {
    console.log("Authenticated!");
    return user;
  }
  return null;
});

function loginWithGoogle(token) {
  const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
  return firebase
    .auth()
    .signInAndRetrieveDataWithCredential(credential)
    .catch(error => {
      return error;
    });
}

function loginWithFacebook(token) {
  const credential = firebase.auth.FacebookAuthProvider.credential(token);
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
          loginWithGoogle(result.accessToken)
            .then(firebaseResult => {
              console.log("Firebase 2 Result", firebaseResult);
              if (userDetails() !== null) {
                const { email, familyName, givenName, photoUrl } = result.user;

                db.collection("users")
                  .doc(firebaseResult.user.uid)
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

  handleFacebook = () => {
    Expo.Facebook.logInWithReadPermissionsAsync(configJSON.facebookAppId, {
      permissions: ["public_profile"]
    })
      .then(result => {
        if (result.type === "success") {
          fetch(`https://graph.facebook.com/me?access_token=${result.token}`)
            .then(response => {
              loginWithFacebook(result.token).then(facebookResult => {
                console.log("FB Init Response", response);
                console.log("FB Final Response", facebookResult);
              });
            })
            .catch(e => alert(`Could not Fetch Data: ${e}`));
        } else {
          return { cancelled: true };
        }
      })
      .catch(({ message }) => alert(`Facebook Login Error: ${message}`));
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleGooglePlus} title="Google Plus Login" />
        <Button onPress={this.handleFacebook} title="Facebook Login" />
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
