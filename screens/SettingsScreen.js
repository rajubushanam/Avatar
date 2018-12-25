import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  handleProfile = () => {
    const { navigate } = this.props.navigation;
    return navigate("Profile", { name: "Hello" });
  };

  handleLogout = () => {
    const { navigate } = this.props.navigation;
    AsyncStorage.clear().then(() => {
      navigate("Login");
    });
  };

  render() {
    return (
      <ScrollView style={styles}>
        <TouchableOpacity style={styles.list} onPress={this.handleProfile}>
          <View style={{ flexDirection: "row" }}>
            <Text>My Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={this.handleLogout}>
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
