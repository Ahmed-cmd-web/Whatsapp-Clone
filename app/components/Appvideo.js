/** @format */

import React from "react";
import { Image,  StyleSheet,  View } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../content/colors";
import { AntDesign } from "@expo/vector-icons";
import { info } from "../redux/reducer";
import { useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import { StatusBar } from "expo-status-bar";

const Appvideo = ({ route, navigation }) => {
  const data = useSelector(info);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 60,
          marginBottom: 10,
          paddingHorizontal: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AntDesign
          onPress={() => navigation.navigate("camera")}
          name="close"
          size={24}
          color="black"
          style={{}}
        />
        <View style={styles.v}>
          <MaterialIcons
            name="send"
            size={22}
            onPress={() => {
              navigation.navigate("room");
              if (route.params.viduri) return;
              backendfuncs.send(
                route.params.pic.base64,
                "image",
                data?.chats[0]?.data?.number,
                data
              );
            }}
            color={data.darkmode ? colors.dark.white : colors.light.white}
          />
        </View>
      </View>
      {route.params.viduri ? (
        <VideoPlayer
          style={{ height: 900 }}
          videoProps={{
            shouldPlay: true,
            source: { uri: route.params.viduri },
            resizeMode: Video.RESIZE_MODE_STRETCH,
          }}
          slider={{
            style: {
              height: 100,
            },
          }}
        />
      ) : (
        <Image
          source={{ uri: `data:image/gif;base64,${route.params.pic.base64}` }}
          style={{
            width: "90%",
            height: "80%",
          }}
          resizeMode="stretch"
        />
      )}
      <StatusBar style={"dark"} />
    </View>
  );
};

export default Appvideo;

const styles = StyleSheet.create({
  v: {
    width: 40,
    height: 40,
    borderRadius: 35,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.light.CheckmarkBlue,
    backgroundColor: colors.light.CheckmarkBlue,
  },
});
