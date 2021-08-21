/** @format */

import React from "react";
import {  StyleSheet,  View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../components/Login";
import Register from "../components/Register";

const Accountscreen = ({token=null}) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        <Register token={token} />
        <View
          style={{ backgroundColor: "lightgray", width: "100%", height: 1 }}
        />
        <Login />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accountscreen;

const styles = StyleSheet.create({});
