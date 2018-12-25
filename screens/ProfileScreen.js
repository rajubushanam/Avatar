import React from "react";
import { ScrollView, Image, View } from "react-native";
import { Avatar } from "react-native-elements";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ paddingTop: 100, flex: 1, alignItems: "center" }}>
          <Avatar
            large
            rounded
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
            onPress={() => {
              console.log("Open Camera");
            }}
            activeOpacity={0.7}
          />
        </View>
        <View />
      </ScrollView>
    );
  }
}
