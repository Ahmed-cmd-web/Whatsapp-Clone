/** @format */

import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import Welcomescreenbutton from "../components/Welcomescreenbutton";
import colors from "../content/colors";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import welcomescreencontent from "../content/welcomescreencontent";
const Welcomescreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      <Text h2>Welcome to whatsapp</Text>
      <View style={{ flex: 1, width: "100%" }}>
        <LottieView
          source={require("../animations/welcomeanimation.json")}
          loop={true}
          speed={1.1}
          autoPlay={true}
          style={{
            transform: [
              Platform.OS === "android" ? { scale: 1.5 } : { scale: 1 },
            ],
          }}
        />
      </View>

      <View style={{ width: "100%" }}>
        {welcomescreencontent.map((e, i) => (
          <Welcomescreenbutton
            key={i}
            title={e.title}
            bg={e.bg}
            onclick={() => navigation.navigate(e.goto)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Welcomescreen;

const styles = StyleSheet.create({});
