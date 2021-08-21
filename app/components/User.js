/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import colors from "../content/colors";
import { info } from "../redux/reducer";

const User = () => {
  const data = useSelector(info);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: data.darkmode
          ? colors.dark.background
          : colors.light.gainsboro,
      }}
    >
      <Header
        centerComponent={{
          text: "Status",
          style: {
            fontSize: 17,
            color: data.darkmode ? colors.dark.white : colors.light.black,
          },
        }}
        leftComponent={{
          text: "Privacy",
          style: { color: colors.light.CheckmarkBlue },
        }}
        containerStyle={{
          height: 90,
          backgroundColor: data.darkmode
            ? colors.dark.background
            : colors.light.background,
        }}
      />
      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
          marginVertical: 100,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        <Icon
          name="user-circle"
          size={65}
          type="font-awesome"
          color={data.darkmode ? colors.dark.gainsboro : colors.light.gainsboro}
        />
        <Text
          style={{
            color: data.darkmode ? colors.dark.white : colors.light.black,
            marginHorizontal: 20,
            fontSize: 20,
          }}
        >
          User
        </Text>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
