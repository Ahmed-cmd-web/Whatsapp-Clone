/** @format */

import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as yup from "yup";
import Appinput from "./Appinput";
import Appavatar from "./Appavatar";
import Appbutton from "./Appbutton";
import Appformik from "./Appformik";
import colors from "../content/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import content from "../content/content";
import backendfuncs from "../backend/backendfuncs";
import { useDispatch, useSelector } from "react-redux";
import { setuser, info } from "../redux/reducer";
import Loading from "./Loading";

const Register = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "too short for a name don't you think ?")
      .label("Name")
      .required(),
    number: yup.string().min(10).max(10).label("Phone Number").required(),
    profilepic: yup.string().label("Image"),
  });
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, margin: 10, justifyContent: "center" }}>
      <Loading visible={loading} />
      <Appformik
        schema={schema}
        initialvalues={{
          name: "",
          number: "",
          profilepic: "",
        }}
        submit={async (v) => {
          setLoading(true);
          try {
            const res = await backendfuncs.register(v, (e) => setLoading(e));
            if (res) {
              if (!res.ok)
                return Alert.alert("Error", content.errormessageifexists, [
                  {
                    text: "ok",
                    onPress: () => setLoading(false),
                  },
                ]);
              setLoading(false);
              return dispatch(setuser(res.data));
            }
          } catch (error) {
            setLoading(false);

            console.log(error);
          }
        }}
      >
        <View>
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
            placeholder={content.registerbuttontitle}
            bg={colors.light.tea}
          />
        </View>
      </Appformik>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
