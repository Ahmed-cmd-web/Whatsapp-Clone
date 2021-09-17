/** @format */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Changeaccount from "../components/Changeaccount";
import Changebg from "../components/Changebg";
import Settings from "../components/Settings";
import colors from "../content/colors";
import { info } from "../redux/reducer";

const Stack = createStackNavigator();

const Settingsstack = () => {
  const data2 = useSelector(info);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={Settings}
        name="Settings"
      />
      <Stack.Screen
        component={Changebg}
        options={{
          headerStyle: {
            backgroundColor: data2.darkmode
              ? colors.dark.background
              : colors.light.background,
          },
          headerTitleStyle: {
            color: data2.darkmode ? colors.dark.white : colors.light.black,
          },
        }}
        name="Chat Wallpaper"
      />
      <Stack.Screen
        name="Account"
        options={{
          headerStyle: {
            backgroundColor: data2.darkmode
              ? colors.dark.background
              : colors.light.background,
          },
          headerTitleStyle: {
            color: data2.darkmode ? colors.dark.white : colors.light.black,
          },
        }}
        component={Changeaccount}
      />
    </Stack.Navigator>
  );
};

export default Settingsstack;

const styles = StyleSheet.create({});
