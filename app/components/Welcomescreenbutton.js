/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

const Welcomescreenbutton = ({ bg, title, onclick }) => {
  return (
    <Button
      buttonStyle={{
        backgroundColor: bg,
        borderRadius: 100,
        marginVertical: 10,
      }}
      onPress={onclick}
      title={title}
    />
  );
};

export default Welcomescreenbutton;

const styles = StyleSheet.create({});
