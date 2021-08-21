/** @format */

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Offline = ({ text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"small"} color={text} animating={true} />
      <Text
        style={{
          textAlignVertical: "center",
          paddingLeft: 5,
          color: text,
          fontSize: 15,
        }}
      >
        Waiting for Connection
      </Text>
    </View>
  );
};

export default Offline;

const styles = StyleSheet.create({});
