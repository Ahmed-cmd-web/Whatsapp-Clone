/** @format */

import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../content/colors";
import content from "../content/content";
import backendfuncs from "../backend/backendfuncs";
import { useSelector } from "react-redux";
import { info as i } from "../redux/reducer";
import Appmodal from "./Appmodal";
import { useNetInfo } from "@react-native-community/netinfo";
import Offline from "./Offline";
import { TouchableOpacity } from "react-native-gesture-handler";
const Appheader = () => {
  const [vis, setvis] = useState(false);
  const [origin, setorigin] = useState();
  const [info, setinfo] = useState();
  const [internet, setInternet] = useState(isInternetReachable);
  const data = useSelector(i);
  const { type, isInternetReachable } = useNetInfo();
  useEffect(() => {
    setInternet(isInternetReachable);
  }, [type, isInternetReachable]);
  return (
    <React.Fragment>
      <Header
        containerStyle={{
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
          height: 90,
          alignItems: "flex-end",
          borderBottomColor: "gray",
          paddingBottom: 10,
        }}
        leftComponent={{
          text: "Edit",
          style: { color: colors.light.CheckmarkBlue },
        }}
        centerComponent={
          internet ? (
            {
              text: content.chatstitle,
              style: {
                color: data.darkmode ? colors.dark.white : colors.light.black,
              },
            }
          ) : (
            <Offline
              text={data.darkmode ? colors.dark.white : colors.light.black}
            />
          )
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              if (!internet)
                return Alert.alert("Warning", "No internet connection");
              setvis(true);
              backendfuncs.handle(
                (i) => setorigin(i),
                (i) => setinfo(i)
              );
            }}
          >
            <FontAwesome
              name="pencil-square-o"
              size={20}
              color={colors.light.CheckmarkBlue}
            />
          </TouchableOpacity>
        }
      />
      <Appmodal
        visible={vis}
        setvisible={(i) => setvis(i)}
        info={info}
        origin={origin}
      />
    </React.Fragment>
  );
};

export default Appheader;

const styles = StyleSheet.create({});
