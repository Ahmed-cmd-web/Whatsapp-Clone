/** @format */

import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import Appmessages from "../components/Appmessages";
import Chatinput from "../components/Chatinput";
import Loading from "../components/Loading";
import { info, setsent } from "../redux/reducer";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  useAppState,
  useDeviceOrientation,
} from "@react-native-community/hooks";
const Userchatscreen = ({ route }) => {
  const data = useSelector(info);
  const dispatch = useDispatch();
  const { landscape, portrait } = useDeviceOrientation();
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mes, setMes] = useState([]);
  const current = useAppState();
  const or = async () => await ScreenOrientation.unlockAsync();
  useEffect(() => {
    let mount = true;
    if (mount) {
      backendfuncs.getdata(
        data,
        route,
        (e) => {
          if (mount) return setLoading(e);
        },
        (e) => {
          if (mount) return setMes(e);
        },
        (e) => {
          if (mount) return setSent(e);
        }
      );
    }
    return () => (mount = false);
  }, []);

  useEffect(() => {
    or();
  }, [landscape, portrait]);

  useEffect(() => {
    dispatch(
      setsent({
        id: route?.params?.number,
        data: sent,
      })
    );
    dispatch(
      setsent({
        id: route?.params?.number,
        data: mes,
      })
    );
  }, [mes, sent]);
  useEffect(() => {
    if (current === "inactive" || current === "background") {
      backendfuncs.settyping(false, route.params.number, data?.user[0]?.number);
      return;
    }
    return;
  }, [current]);
  return (
    <View style={styles.con}>
      <Loading visible={loading} />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={styles.con}
      >
        <ImageBackground
          source={
            data.wallpaper
              ? { uri: data.wallpaper }
              : data.darkmode
              ? require("../assets/darkchatback.png")
              : require("../assets/chat.png")
          }
          style={styles.background}
          resizeMode={"cover"}
        >
          {!loading && <Appmessages recieved={mes} sent={sent} />}
          <Chatinput user={route?.params?.number} />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Userchatscreen;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
});
