/** @format */

import React, { useRef } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Tooltip } from "react-native-elements";
import { useSelector } from "react-redux";
import colors from "../content/colors";
import { info } from "../redux/reducer";
import Messagecontact from "./Messagecontact";
import Messagemap from "./Messagemap";
import { AntDesign } from "@expo/vector-icons";
import backendfuncs from "../backend/backendfuncs";
import { useRoute } from "@react-navigation/core";
const Appmessageitem = ({ message, timestamp, who, type, id }) => {
  const data = useSelector(info);
  const ref = useRef();
  const route = useRoute();
  var time = new Date(timestamp?.seconds * 1000).toUTCString();
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
        return <Messagemap message={message} />;
      case "contact":
        return (
          <Messagecontact
            message={message}
            color={data.darkmode ? colors.light.black : colors.light.background}
            text={data.darkmode ? colors.light.white : colors.dark.black}
          />
        );

      default:
        break;
    }
  };
  return (
    <TouchableOpacity
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
      onLongPress={() => {
        who === "sent" ? ref.current.toggleTooltip() : null;
      }}
      delayLongPress={500}
    >
      <Tooltip
        ref={ref}
        withOverlay={false}
        backgroundColor={colors.light.background}
        width={100}
        toggleOnPress={false}
        popover={
          <TouchableOpacity
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
            }}
            onPress={() =>
              Alert.alert(
                "Warning",
                "Are you sure you want to delete this message?\nThis message will be deleted for you only.",
                [
                  {
                    text: "No",
                    onPress: () => null,
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      backendfuncs.deletemessage(
                        data?.user[0]?.number,
                        route?.params?.number,
                        id
                      );
                      ref.current.toggleTooltip();
                    },
                  },
                ]
              )
            }
          >
            <AntDesign name="delete" size={20} color={colors.light.red} />
            <Text style={{ color: colors.light.red, fontSize: 15 }}>
              Delete
            </Text>
          </TouchableOpacity>
        }
      >
        <View style={styles.d}>
          {which(type)}
          <Text
            style={[
              styles.time,
              {
                color:
                  type === "image"
                    ? colors.light.white
                    : colors.light.lightgrey,
              },
            ]}
          >
            {newtime}
          </Text>
        </View>
      </Tooltip>
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
    </TouchableOpacity>
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
