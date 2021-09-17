/** @format */

import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "./app/content/colors";
import { info, setnav } from "./app/redux/reducer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Chatsstack from "./app/navigation/Chatsstack";
import { LogBox } from "react-native";
import Accountstack from "./app/navigation/Accountstack";

LogBox.ignoreLogs(["Setting a timer"]);

const Index = () => {
  const data = useSelector(info);
  const dispatch = useDispatch();
  const [nouser, setnouser] = useState(!data?.user[0]);

  useEffect(() => {
    setnouser(!data?.user[0]);
  }, [data?.user[0]]);

  return (
    <View
      style={[
        styles.con,
        {
          backgroundColor: data.darkmode
            ? colors.dark.background
            : colors.light.background,
        },
      ]}
    >
      {nouser ? (
        <NavigationContainer>
          <Accountstack />
        </NavigationContainer>
      ) : (
        <NavigationContainer
          onStateChange={(s) =>
            dispatch(
              setnav(s.routes[0].state.routeNames[s.routes[0].state.index])
            )
          }
        >
          <Chatsstack />
        </NavigationContainer>
      )}
      <StatusBar style={data.darkmode ? "light" : "dark"} />
    </View>
  );

};

export default Index;

const styles = StyleSheet.create({
  con: {
    backgroundColor: colors.light.background,
    flex: 1,
  },
});
