/** @format */

import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { Switch } from "react-native-elements";
import { useSelector } from "react-redux";
import colors from "../content/colors";
import { info } from "../redux/reducer";

const Applist = ({
  icon,
  size = 20,
  type,
  bg = colors.light.tea,
  title,
  isswitch = false,
  switchvalue = false,
  valuechanged = () => null,
  bottomdivider = true,
  chevronsize = 15,
  onpress = () => null,
}) => {
  const data = useSelector(info);
  return (
    <TouchableHighlight
      onPress={onpress}
      underlayColor={
        data.darkmode ? colors.dark.gainsboro : colors.light.gainsboro
      }
      activeOpacity={1}
      style={[
        styles.con,
        {
          borderBottomWidth: bottomdivider && 0.5,
          borderColor: data.darkmode
            ? colors.dark.bordercolor
            : colors.light.gainsboro,
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
        },
      ]}
    >
      <SafeAreaView style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Icon
            name={icon}
            size={size}
            type={type}
            color={"white"}
            style={[styles.icon, { backgroundColor: bg }]}
          />
          <Text
            style={{
              left: 5,
              fontSize: 15,
              color: data.darkmode ? colors.dark.white : colors.light.black,
            }}
          >
            {title}
          </Text>
        </View>
        {isswitch ? (
          <Switch value={switchvalue} onValueChange={(e) => valuechanged(e)} />
        ) : (
          <Icon
            name="chevron-right"
            type={"entypo"}
            size={chevronsize}
            color={data.darkmode ? colors.dark.white : colors.light.black}
          />
        )}
      </SafeAreaView>
    </TouchableHighlight>
  );
};

export default Applist;

const styles = StyleSheet.create({
  icon: {
    borderRadius: 10,
    padding: 6,
    borderColor: "transparent",
  },
  con: {
    width: "100%",
    height: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
