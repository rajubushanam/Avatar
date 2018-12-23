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
let configJSON = require('./../config.json')

export default class LoginScreen extends React.Component {
  handleGooglePlus = () => {
    Expo.Google.logInAsync({
      behavior: "web",
      androidClientId:
        configJSON.androidClientId,
      iosClientId:
        configJSON.iosClientId,
      scopes: ["profile", "email"]
    })
      .then(result => {
        if (result.type === "success") {
          AsyncStorage.setItem("userToken", result.accessToken);
          this.props.navigation.navigate("Main");
          //return result.accessToken;
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
