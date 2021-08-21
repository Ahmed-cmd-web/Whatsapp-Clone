/** @format */

import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet} from "react-native";
import { Button } from "react-native-elements";

const Appbutton = ({ bg = "black", placeholder }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      title={placeholder}
      onPress={handleSubmit}
      buttonStyle={{ backgroundColor: bg, borderRadius: 30 }}
    />
  );
};

export default Appbutton;

const styles = StyleSheet.create({});
