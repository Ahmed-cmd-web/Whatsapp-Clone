/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../content/colors";
const Call = ({ color }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
      }}
    >
      <Text style={{ color: colors.light.grey, fontSize: 23 }}>
        This page is for design purposes only.
      </Text>
    </View>
  );
};

export default Call;

const styles = StyleSheet.create({});
