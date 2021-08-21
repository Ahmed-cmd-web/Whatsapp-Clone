/** @format */

import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";

const Appinput = ({ name, placeholder, width, ...p }) => {
  const { handleChange, errors, touched, setFieldTouched } = useFormikContext();
  return (
    <View style={styles.con}>
      <Input
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...p}
        containerStyle={{ width: width ? width : "100%", position: "relative" }}
      />
      {errors[name] && touched[name] && (
        <Text style={{ fontSize: 15, color: "red", marginHorizontal: 5 }}>
          {errors[name]}
        </Text>
      )}
    </View>
  );
};

export default Appinput;

const styles = StyleSheet.create({
  con: {
    marginBottom: 10,
    position: "relative",
    width: "100%",
  },
});
