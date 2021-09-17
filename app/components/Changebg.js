/** @format */

import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";
import { info, resetwallpaper, setwallpaper } from "../redux/reducer";
import FlashMessage from "react-native-flash-message";
import Applist from "./Applist";

const Changebg = () => {
  const dispatch = useDispatch();
  const data2 = useSelector(info);
  const ref = useRef();
  const data = [
    {
      title: "Change Wallpaper",
      onpress: async () => {
        try {
          const res = await backendfuncs.imageselector();
          dispatch(setwallpaper(res.uri));
          ref.current.showMessage({
            message: "Success",
            description: "You've successfully changed your wallpaper",
            type: "success",
          });
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      title: "Reset Wallpaper",
      onpress: () => {
        dispatch(resetwallpaper());
        ref.current.showMessage({
          message: "Success",
          description: "You've successfully reset your wallpaper",
          type: "success",
        });
      },
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: data2.darkmode
          ? colors.dark.background
          : colors.light.gainsboro,
      }}
    >
      {data.map((e, i) => (
        <Applist title={e.title} key={i} onpress={e.onpress} />
      ))}
      <FlashMessage ref={ref} position="top" icon="success" />
    </View>
  );
};

export default Changebg;

const styles = StyleSheet.create({});
