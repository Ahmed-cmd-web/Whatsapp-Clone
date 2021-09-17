/** @format */

import React from "react";
import { Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cam from "../components/Cam";
import { Icon } from "react-native-elements";
import colors from "../content/colors";
import Settings from "../components/Settings";
import Call from "../components/Call";
import User from "../components/User";
import { useSelector } from "react-redux";
import { info } from "../redux/reducer";
import Chatsscreen from "../screens/Chatsscreen";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Settingsstack from "./Settingsstack";

const Apptabs = () => {
  const Tabs = createBottomTabNavigator();
  const data = useSelector(info);
  return (
    <Tabs.Navigator
      initialRouteName={data.navigationstate}
      tabBarOptions={{
        activeTintColor: colors.light.CheckmarkBlue,
        style: {
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.gainsboro,
        },
      }}
    >
      <Tabs.Screen
        name="Status"
        component={User}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user-circle-o" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Calls"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon
              name="call-outline"
              type="ionicon"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => (
          <Call
            color={
              data.darkmode ? colors.dark.lightblack : colors.light.gainsboro
            }
          />
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Camera"
        options={{
          tabBarVisible: false,
          tabBarBadgeStyle: { marginHorizontal: 10 },
          tabBarIcon: ({ size, color }) => (
            <Icon
              name="camera"
              type="simple-line-icon"
              size={size}
              color={color}
              containerStyle={{ position: "absolute" }}
            />
          ),
        }}
      >
        {({ navigation }) => <Cam backto={"Chats"} navigation={navigation} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Chats"
        component={Chatsscreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settingsstack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon
              name="ios-settings-outline"
              type="ionicon"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default Apptabs;

const styles = StyleSheet.create({});
