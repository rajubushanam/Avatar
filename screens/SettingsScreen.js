import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button
} from "react-native";
import Touchable from "react-native-platform-touchable";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  handleProfile = () => {
    const { navigate } = this.props.navigation;
    console.log("navigate", navigate);
    
    return navigate("Profile", {name: "Hello"});
  };

  render() {
    return (
      <ScrollView style={styles}>
        <TouchableOpacity style={styles.list} onPress={this.handleProfile}>
          <View style={{ flexDirection: "row" }}>
            <Text>My Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}>
          <View style={{ flexDirection: "row" }}>
            <Text>Log Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  list: {
    backgroundColor: "#fdfdfd",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ededed",
    paddingHorizontal: 15,
    paddingVertical: 15
  }
});
