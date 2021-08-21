/** @format */

import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Loading from "./Loading";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { useDeviceOrientation } from "@react-native-community/hooks";

const Cam = ({ navigation }) => {
  const ref = useRef();
  const [video, setvideo] = useState(null);
  const [pic, setpic] = useState(null);
  const [type, settype] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [mounted, setmounted] = useState(false);
  const [status, setStatus] = useState("light");
  const or = async () =>
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  const { landscape, portrait } = useDeviceOrientation();

  useEffect(() => {
    setmounted(true);
    if (mounted) {
      setLoading(false);
      if (video || pic) {
        setvideo(null);
        setpic(null);
        navigation.navigate("Video", {
          viduri: video,
          pic: pic,
        });
      }
      setmounted(false);
    }
  }, [video, pic]);

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
          navigation.goBack();
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
          onLongPress={() => {
            setStatus("auto");
            backendfuncs.takephotoorvid(
              "video",
              (e, i) => {
                setvideo(e);
                setLoading(i);
              },
              ref
            );
          }}
          onHideUnderlay={async () => ref.current.stopRecording()}
          delayPressIn={1000}
          onPress={() => {
            setStatus("auto");
            backendfuncs.takephotoorvid(
              "photo",
              (e, i) => {
                setpic(e);
                setLoading(i);
              },
              ref
            );
          }}
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
