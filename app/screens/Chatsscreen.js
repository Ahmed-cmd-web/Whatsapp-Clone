/** @format */

import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useSelector } from "react-redux";
import Appheader from "../components/Header";
import colors from "../content/colors";
import { info } from "../redux/reducer";
import Chatbody from "../components/Chatbody";

const Chatsscreen = () => {
  const data = useSelector(info);
  return (
    <View
      style={[
        styles.con,
        {
          backgroundColor: data.darkmode
            ? colors.dark.background
            : colors.light.background,
        },
      ]}
    >
      <Appheader />
      <SafeAreaView
        style={[
          styles.con2,
          {
            borderBottomColor: data.darkmode
              ? colors.dark.bordercolor
              : colors.light.gainsboro,
          },
        ]}
      >
        <Text h5 style={{ color: colors.light.CheckmarkBlue }}>
          Broadcast Lists
        </Text>
        <Text h5 style={{ color: colors.light.CheckmarkBlue }}>
          New Group
        </Text>
      </SafeAreaView>
      <Chatbody />
    </View>
  );
};

export default Chatsscreen;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.light.background,
  },
  con2: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
