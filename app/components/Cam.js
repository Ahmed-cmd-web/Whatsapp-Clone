/** @format */

import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Loading from "./Loading";
import colors from "../content/colors";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { useDeviceOrientation } from "@react-native-community/hooks";

const Cam = ({ navigation, backto = null }) => {
  const ref = useRef();
  const [type, settype] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("light");
  const or = async () =>
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  const { landscape, portrait } = useDeviceOrientation();

  useEffect(() => {
    or();
  }, [landscape, portrait]);
  return (
    <View style={styles.con}>
      <StatusBar style={status} />
      <Loading visible={loading} />
      <AntDesign
        name="close"
        size={24}
        color={colors.light.white}
        style={{ left: 20, top: 40 }}
        onPress={async () => {
          await ScreenOrientation.unlockAsync();
          setStatus("auto");
          backto ? navigation.navigate(backto) : navigation.goBack();
        }}
      />
      <Camera
        flashMode={Camera.Constants.FlashMode.auto}
        ref={ref}
        ratio={"16:9"}
        type={type}
        defaultVideoQuality={Camera.Constants.VideoQuality["1080p"]}
        style={{
          flex: 0.9,
          width: "100%",
          marginTop: 50,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
        useCamera2Api={true}
      >
        <FontAwesome name="photo" size={35} color={colors.light.white} />
        <TouchableHighlight
          style={{ borderRadius: 55, bottom: -20 }}
          activeOpacity={0.8}
          underlayColor={colors.light.red}
        >
          <Entypo
            name="circle"
            size={70}
            color={colors.light.white}
            style={{ padding: 20 }}
          />
        </TouchableHighlight>
        <Ionicons
          name="camera-reverse-outline"
          size={40}
          color={colors.light.white}
          onPress={() =>
            settype(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        />
      </Camera>
      <Text
        style={{
          color: colors.light.white,
          fontWeight: "bold",
          alignSelf: "center",
          top: 30,
        }}
      >
        Hold for video, tap for photo
      </Text>
    </View>
  );
};

export default Cam;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.light.black,
  },
});
