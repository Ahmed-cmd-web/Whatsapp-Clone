/** @format */

import { useFormikContext } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const Appavatar = ({ name }) => {
  const { setFieldValue, errors, values } = useFormikContext();
  const [pic, setpic] = useState(null);
  const handlepress = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) return console.log("permission denied");
      const selected = await ImagePicker.launchImageLibraryAsync({
        quality: 0.5,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64:true
      });
      if (!selected.cancelled) {
        setpic(selected.base64);
        return setFieldValue(name, selected.base64);
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      {pic && pic.length > 10 ? (
        <Avatar
          rounded={true}
          overlayContainerStyle={{ backgroundColor: "lightgray" }}
          title={"Select image"}
          titleStyle={{
            fontSize: 9,
            color: "blue",
            padding: 10,
          }}
          size="medium"
          source={{ uri: `data:image/gif;base64,${pic}` }}
          imageProps={{ resizeMode: "cover" }}
          onPress={handlepress}
        />
      ) : (
        <Avatar
          rounded={true}
          overlayContainerStyle={{ backgroundColor: "lightgray" }}
          title={"Select image"}
          titleStyle={{
            fontSize: 9,
            color: "blue",
            padding: 10,
          }}
          size="medium"
          imageProps={{ resizeMode: "cover" }}
          onPress={handlepress}
        />
      )}

      {errors[name] && (
        <Text style={{ fontSize: 18, color: "red", marginBottom: 10 }}>
          {errors[name]}
        </Text>
      )}
    </View>
  );
};

export default Appavatar;

const styles = StyleSheet.create({});
