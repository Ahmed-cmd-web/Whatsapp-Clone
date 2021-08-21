/** @format */

import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import Spinner from "react-native-loading-spinner-overlay";

const Loading = ({ visible }) => {
   return (
    <View style={styles.con}>
      <Spinner
        visible={visible}
        customIndicator={
          <LottieView
            source={require("../animations/loading.json")}
            autoPlay={true}
            loop={true}
            style={{
              width: 200,
              height: 200,
              transform:
                Platform.OS === "android" ? [{ scale: 2 }] : [{ scale: 1 }],
            }}
          />
        }
        overlayColor={"rgba(255, 255, 255, 0.7)"}
        color={"white"}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    width: "100%",
    position: "absolute",

    zIndex: 99,
  },
});
