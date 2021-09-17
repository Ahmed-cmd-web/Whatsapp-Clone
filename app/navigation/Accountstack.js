/** @format */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import colors from "../content/colors";
import Welcomescreen from "../screens/Welcomescreen";

const Stack = createStackNavigator();

const Accountstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: colors.light.background } }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        component={Welcomescreen}
        name="Welome"
      />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Registeration" />
    </Stack.Navigator>
  );
};

export default Accountstack;
