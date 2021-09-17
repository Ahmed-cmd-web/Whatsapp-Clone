/** @format */

import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import FlashMessage from "react-native-flash-message";
import colors from "../content/colors";
import { info } from "../redux/reducer";
import Appformik from "./Appformik";
import Icon from "react-native-vector-icons/FontAwesome";
import Loading from "./Loading";
import * as yup from "yup";
import Appinput from "./Appinput";
import content from "../content/content";
import Appavatar from "./Appavatar";
import { Divider } from "react-native-elements";
import Appbutton from "./Appbutton";
import backendfuncs from "../backend/backendfuncs";
import { useNavigation } from "@react-navigation/core";
const Changeaccount = () => {
  const data2 = useSelector(info);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const ref = useRef();
  const schema = yup.object().shape({
    originalnumber: yup
      .string()
      .min(10)
      .max(10)
      .label("Original Phone Number")
      .typeError("Must be 10 numbers exactly")
      .required(),
    name: yup
      .string()
      .min(3, "too short for a name don't you think ?")
      .label("Name")
      .required(),
    number: yup
      .string()
      .typeError("Must be 10 numbers exactly")
      .min(10)
      .max(10)
      .label("Phone Number")
      .required(),
    profilepic: yup.string().label("Image"),
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: data2.darkmode
          ? colors.dark.background
          : colors.light.gainsboro,
        paddingHorizontal: 10,
      }}
    >
      <FlashMessage ref={ref} position="top" icon='danger' />
      <Loading visible={loading} />
      <Appformik
        schema={schema}
        initialvalues={{
          name: "",
          number: "",
          profilepic: "",
          originalnumber: "",
        }}
        submit={async (v) => {
           ref.current.showMessage({
            message: "Failed",
            description: "Failed to change number",
            type: "danger",
          })

        }}
      >
        <Appinput
          name="originalnumber"
          textContentType="telephoneNumber"
          keyboardType="number-pad"
          placeholder={content.originalnumberplaceholder}
          leftIcon={<Icon name="mobile" size={20} color="lightgray" />}
        />
        <Divider />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Appavatar name="profilepic" />
          <Appinput
            textContentType="name"
            name="name"
            placeholder={content.namefieldplaceholder}
            width="90%"
            leftIcon={<Icon name="user" size={20} color="lightgray" />}
          />
        </View>
        <Appinput
          name="number"
          textContentType="telephoneNumber"
          keyboardType="number-pad"
          placeholder={content.phonenumberplaceholder}
          leftIcon={<Icon name="mobile" size={20} color="lightgray" />}
        />
        <Appbutton
          placeholder={content.changeaccountinfobuttontitle}
          bg={data2.darkmode ? colors.light.darktea : colors.light.darktea}
        />
      </Appformik>
    </SafeAreaView>
  );
};

export default Changeaccount;

const styles = StyleSheet.create({});
