/** @format */

import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { colors as c } from "react-native-elements";
import { useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";
import { info } from "../redux/reducer";

const Appcontactitem = ({
  item,
  data,
  setLoading,
  setvisible,
  chosen = null,
}) => {
  const { params } = useRoute();
  const d = useSelector(info);
  return (
    <ListItem
      onPress={() => {
        if (item?.phoneNumbers) {
          setvisible(false);
          if (chosen === "contact") {
            return backendfuncs.send(
              {
                name: item?.name,
                number: item?.phoneNumbers[0].number,
                image: item?.imageAvailable && e?.image,
              },
              "contact",
              params.number,
              d
            );
          }
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
