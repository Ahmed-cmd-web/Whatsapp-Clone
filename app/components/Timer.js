/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useStopwatch } from "react-timer-hook";
import colors from "../content/colors";
import LottieView from "lottie-react-native";

const Timer = () => {
  const { seconds, minutes } = useStopwatch({
    autoStart: true,
  });

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <LottieView
        source={require("../animations/recording2.json")}
        loop={true}
        autoPlay={true}
        style={{ width: 30, height: 30 }}
      />
      <Text
        style={{
          color: colors.light.white,
          fontSize: 15,
          marginHorizontal: 5,
          fontWeight: "600",
        }}
      >{`${minutes}:${seconds}`}</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({});
