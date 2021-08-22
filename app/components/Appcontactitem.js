/** @format */

import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { colors as c } from "react-native-elements";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";

const Appcontactitem = ({
  item,
  data,
  setLoading,
  setvisible,
  chosen = null,
}) => {
  return (
    <ListItem
      onPress={() => {
        if (item?.phoneNumbers) {
          if (chosen) return chosen(item);
          return backendfuncs.addtochats(
            item?.phoneNumbers[0]?.number,
            data?.user[0]?.number,
            (e) => setLoading(e),
            (i) => setvisible(i)
          );
        }
        return;
      }}
      bottomDivider={true}
      containerStyle={{
        backgroundColor: data.darkmode
          ? colors.dark.lightblack
          : colors.light.background,
      }}
      style={{ paddingHorizontal: 30 }}
    >
      {item.imageAvailable ? (
        <Avatar
          source={{
            uri: item.image,
          }}
          rounded={true}
          size={55}
          imageProps={{ resizeMode: "cover" }}
        />
      ) : (
        <Avatar
          rounded
          containerStyle={{ height: 60, width: 65 }}
          icon={{
            name: "account-circle",
            type: "materialcommunityicons",
            color: colors.light.grey,
            size: 65,
          }}
        />
      )}
      <ListItem.Content>
        <ListItem.Title
          style={{
            color: data.darkmode ? colors.dark.white : colors.light.black,
          }}
        >
          {item?.name
            ? item?.name
            : item?.phoneNumbers
            ? item?.phoneNumbers[0]?.number
            : item?.id}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: c.greyOutline }}>
          {item?.phoneNumbers ? item?.phoneNumbers[0]?.number : item?.id}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default Appcontactitem;

const styles = StyleSheet.create({});
