/** @format */

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../content/colors";
import { info } from "../redux/reducer";
import Messagecontact from "./Messagecontact";
import Messagemap from "./Messagemap";

const Appmessageitem = ({ message, timestamp, who, type }) => {
  const data = useSelector(info);
  var time = new Date(timestamp?.seconds * 1000).toUTCString();
  var d = new Date(timestamp?.seconds * 1000);
  var timeRegex = /(\d\d):(\d\d):(\d\d)/;
  const newtime =
    timeRegex.exec(time)[1] >= 12
      ? `${timeRegex.exec(time)[1] - 12}:${timeRegex.exec(time)[2]} AM`
      : `${timeRegex.exec(time)[1]}:${timeRegex.exec(time)[2]} PM`;
  const which = (type) => {
    switch (type) {
      case "text":
        return (
          <Text
            style={{
              padding: 10,
              color: data.darkmode ? colors.light.white : colors.dark.black,
            }}
          >
            {message}
          </Text>
        );
        break;
      case "image":
        return (
          <View
            style={{
              height: 300,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Image
              source={{ uri: `data:image/gif;base64,${message}` }}
              style={{ flex: 1, width: 250, borderRadius: 3 }}
              resizeMode={"stretch"}
              progressiveRenderingEnabled={true}
            />
          </View>
        );
      case "location":
        return (
         <Messagemap message={message} />
        );
      case "contact":
        return (
          <Messagecontact
            message={message}
            color={
              data.darkmode ? colors.light.black : colors.light.background
            }
            text={data.darkmode ? colors.light.white : colors.dark.black}
          />
        );

      default:
        break;
    }
  };
  return (
    <View
      style={[
        styles.con,
        {
          backgroundColor:
            who === "sent"
              ? data.darkmode
                ? colors.light.darktea
                : colors.light.ChatBubble
              : data.darkmode
              ? colors.dark.black
              : colors.light.white,
          alignSelf: who === "sent" ? "flex-end" : "flex-start",
          left: who === "sent" ? undefined : 10,
          right: who === "sent" ? 10 : undefined,
        },
      ]}
    >
      <View style={styles.d}>
        {which(type)}
        <Text
          style={[
            styles.time,
            {
              color:
                type === "image" ? colors.light.white : colors.light.lightgrey,
            },
          ]}
        >
          {newtime}
        </Text>
      </View>
      <View
        style={[
          styles.tip,
          {
            borderTopColor:
              who === "sent"
                ? data.darkmode
                  ? colors.light.darktea
                  : colors.light.ChatBubble
                : data.darkmode
                ? colors.dark.black
                : colors.light.white,
            left: who === "sent" ? undefined : -5,
            right: who === "sent" ? -5 : undefined,
            transform: [{ rotate: who === "sent" ? "270deg" : "180deg" }],
          },
        ]}
      ></View>
    </View>
  );
};

export default Appmessageitem;

const styles = StyleSheet.create({
  con: {
    padding: 5,
    margin: 5,
    minWidth: 90,
    maxWidth: 300,
    borderRadius: 5,
  },
  tip: {
    width: 0,
    height: 0,
    bottom: 2,
    position: "absolute",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 10,
    borderTopWidth: 10,
    zIndex: -99,
    borderRightColor: "transparent",
  },
  d: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 300,
  },
  time: {
    fontSize: 9,
    alignSelf: "flex-end",
    position: "absolute",
    right: 0,
  },
});
