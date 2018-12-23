import React from "react";
import { ScrollView, ActivityIndicator, StatusBar, View, AsyncStorage } from "react-native";
import "../firebase/firebase";

export default class AuthLoadingScrenn extends React.Component {
  constructor(props) {
    super(props);
    this.checkForToken(this.props.navigation.navigate);
  }
  checkForToken = async navigate => {
    const userToken = await AsyncStorage.getItem("userToken");
    navigate(userToken ? "Main" : "Login");
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
