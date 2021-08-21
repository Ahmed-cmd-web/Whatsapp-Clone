/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../content/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import Appbottomsheet from "./Appbottomsheet";
import Appmic from "./Appmic";
import Appcamicon from "./Appcamicon";
import { useSelector } from "react-redux";
import { info } from "../redux/reducer";
import backendfuncs from "../backend/backendfuncs";
import {
  useDeviceOrientation,
  useKeyboard,
} from "@react-native-community/hooks";

const Chatinput = (user) => {
  const [visible, setvisible] = useState(false);
  const ref = useRef();
  const data = useSelector(info);
  const [flex, setflex] = useState(0.7);
  const [text, settext] = useState("");
  const keyboard = useKeyboard();

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
    backendfuncs.settyping(
      text.length > 0 && keyboard.keyboardShown,
      user?.user,
      data?.user[0]?.number
    );
    if (text.length > 0) return setflex(1);
    setflex(0.7);
  }, [text]);
  const { landscape } = useDeviceOrientation();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "android" || landscape ? 40 : 70}
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <View
        style={[
          styles.con,
          {
            backgroundColor: data.darkmode
              ? colors.dark.lightblack
              : colors.light.white,
          },
        ]}
      >
        <TouchableOpacity onPress={() => setvisible(true)}>
          <MaterialCommunityIcons
            name="plus"
            size={35}
            color={colors.light.CheckmarkBlue}
          />
        </TouchableOpacity>
        <Input
          ref={ref}
          enablesReturnKeyAutomatically={true}
          inputContainerStyle={styles.inputcon2}
          keyboardAppearance={data.darkmode ? "dark" : "light"}
          inputStyle={{
            color: data.darkmode ? colors.dark.white : colors.light.black,
          }}
          containerStyle={[
            styles.inputcon,
            {
              flex: flex,
              backgroundColor: data.darkmode
                ? colors.dark.background
                : colors.light.background,
              borderColor: data.darkmode
                ? colors.dark.white
                : colors.light.grey,
            },
          ]}
          rightIcon={{
            name: "sticker-outline",
            color: colors.light.CheckmarkBlue,
            size: 20,
            type: "material-community",
          }}
          onChangeText={(e) => settext(e)}
        />
        {text.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              ref.current.clear();
              settext("");
              return backendfuncs.send(text, "text", user?.user, data);
            }}
          >
            <MaterialIcons
              name="send"
              size={22}
              style={{
                marginHorizontal: 10,
                borderRadius: 18,
                alignItems: "center",
                borderWidth: 1,
                padding: 5,
                backgroundColor: colors.light.CheckmarkBlue,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                borderColor: colors.light.CheckmarkBlue,
              }}
              color={colors.light.white}
            />
          </TouchableOpacity>
        ) : (
          <Appcamicon />
        )}

        {!text.length > 0 && <Appmic />}
        <Appbottomsheet
          visible={visible}
          setvisisble={() => setvisible(false)}
          rec={user?.user}
          sender={data}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chatinput;

const styles = StyleSheet.create({
  con: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
    width: "100%",
    height: Platform.OS === "android" ? 60 : 80,
    paddingBottom: Platform.OS === "android" ? 10 : 30,
    justifyContent: "space-evenly",
  },
  inputcon: {
    borderWidth: 0.3,
    height: 30,
    borderRadius: 15,
    justifyContent: "flex-start",
  },
  inputcon2: {
    borderBottomWidth: 0,
    height: 30,
    paddingVertical: 15,
  },
});
