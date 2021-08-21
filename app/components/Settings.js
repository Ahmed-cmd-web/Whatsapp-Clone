/** @format */

import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Header } from "react-native-elements";
import { useSelector } from "react-redux";
import colors from "../content/colors";
import settingscontent from "../content/settingscontent";
import { info } from "../redux/reducer";
import Appflatlist from "./Appflatlist";

const Settings = () => {
  const data = useSelector(info);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: data.darkmode
          ? colors.dark.background
          : colors.light.gainsboro,
      }}
    >
      <Header
        centerComponent={{
          text: "Settings",
          style: {
            fontSize: 17,
            color: data.darkmode ? colors.dark.white : colors.light.black,
          },
        }}
        containerStyle={{
          height: 100,
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
        }}
      />

      <SafeAreaView
        style={{
          height: 80,
          width: "100%",
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 0.5,
          borderTopWidth: 0.5,
          borderColor: data.darkmode
            ? colors.dark.bordercolor
            : colors.light.gainsboro,
        }}
      >
        {data?.user[0] && data?.user[0]?.profilepic.length > 10 ? (
          <Avatar
            rounded
            source={{
              uri: `data:image/gif;base64,${data?.user[0]?.profilepic}`,
            }}
            imageProps={{ resizeMode: "cover" }}
            size={65}
          />
        ) : (
          <Icon
            name="user-circle"
            size={65}
            type="font-awesome"
            color={
              data.darkmode ? colors.dark.gainsboro : colors.light.gainsboro
            }
          />
        )}
        <View style={{ alignItems: "flex-start", marginHorizontal: 30 }}>
          <Text
            style={{
              color: data.darkmode ? colors.dark.white : colors.light.black,
              fontSize: 30,
            }}
          >
            {data?.user[0] && data?.user[0].name}
          </Text>
          <Text
            style={{
              color: colors.light.lightgrey,
              fontSize: 17,
            }}
          >
            Hey there! Am using WhatsApp
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView>
        {settingscontent.map((i, index) => (
          <View
            key={index}
            style={{
              marginVertical: 10,
              borderTopWidth: 0.5,
              borderColor: data.darkmode
                ? colors.dark.bordercolor
                : colors.light.gainsboro,
            }}
          >
            <Appflatlist data={i} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
