/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../content/colors";
import Timer from "./Timer";
import { Ionicons } from "@expo/vector-icons";

const Micpopover = ({ mes, refrence }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {!mes.startsWith("H") && <Timer />}
      <Text
        style={{ color: colors.light.white, fontSize: 15, fontWeight: "600" }}
      >
        {mes}
      </Text>
      {mes.startsWith("H") && (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 30,
            backgroundColor: "white",
            overflow: "hidden",
            height: 20,
            width: 20,
            alignItems: "center",
            justifyContent: "center",
            borderColor: colors.light.CheckmarkBlue,
            marginHorizontal: 10,
          }}
        >
          <Ionicons
            name="close"
            size={15}
            color={colors.light.CheckmarkBlue}
            onPress={() => refrence.current.toggleTooltip()}
          />
        </View>
      )}
    </View>
  );
};

export default Micpopover;

const styles = StyleSheet.create({});
