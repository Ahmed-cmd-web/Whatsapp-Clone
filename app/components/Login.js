/** @format */

import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Appformik from "./Appformik";
import * as yup from "yup";
import Appinput from "./Appinput";
import Appbutton from "./Appbutton";
import Icon from "react-native-vector-icons/FontAwesome";
import content from "../content/content";
import colors from "../content/colors";
import backendfuncs from "../backend/backendfuncs";
import { useDispatch } from "react-redux";
import {  setuser } from "../redux/reducer";
import Loading from "./Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    number: yup
      .string()
      .min(9, "the number should not be shorter than 9 characters long")
      .label("Phone Number")
      .required(),
  });
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Loading visible={loading} />
      <Appformik
        initialvalues={{
          number: "",
        }}
        schema={schema}
        submit={async (v) => {
          setLoading(true);
          try {
            const res = await backendfuncs.login(v);
            setLoading(false);
            if (res) return dispatch(setuser(res[0]));
            return Alert.alert("Error", content.errormessageifdoesnotexist);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Appinput
          name="number"
          placeholder="Phone number"
          keyboardType="numeric"
          textContentType="telephoneNumber"
          leftIcon={<Icon name="mobile" size={20} color="lightgray" />}
        />
        <Appbutton
          placeholder={content.loginbuttontitle}
          bg={colors.light.darktea}
        />
      </Appformik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
