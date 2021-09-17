/** @format */

import React, { useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";
import { useNavigation } from "@react-navigation/native";

const Appcamicon = ({ reciever, sender }) => {
  const navigation = useNavigation();
  const [pic, setPic] = useState(null);
  return (
    <TouchableHighlight
      style={{ padding: 5 }}
      underlayColor={"rgba(255,255,255,0)"}
      activeOpacity={0.2}
      onPress={async () => {
        try {
          const res = await backendfuncs.takephotopermission();
          if (!res) return;
          await backendfuncs.takephotoorvid((e) => setPic(e));
          if (pic) {
            backendfuncs.send(pic, "image", reciever, sender);
            navigation.navigate("room");
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <SimpleLineIcons
        name="camera"
        size={20}
        color={colors.light.CheckmarkBlue}
      />
    </TouchableHighlight>
  );
};

export default Appcamicon;

const styles = StyleSheet.create({});
