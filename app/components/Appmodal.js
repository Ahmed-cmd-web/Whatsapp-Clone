/** @format */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { colors as c } from "react-native-elements";
import { SearchBar, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";
import content from "../content/content";
import { info as i } from "../redux/reducer";
import Loading from "./Loading";

const Appmodal = ({
  visible,
  setvisible,
  origin,
  info: ind,
  chosen = null,
}) => {
  const [info, setinfo] = useState(ind);
  const [value, setvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const data = useSelector(i);
  useEffect(() => setinfo(ind), [ind]);
  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="formSheet"
    >
      <Loading visible={loading} />
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: content.globalfontsize,
            color: data.darkmode ? colors.dark.white : colors.light.black,
          }}
        >
          {content.newchattitle}
        </Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 15,
            fontSize: content.globalfontsize,
            color: colors.light.CheckmarkBlue,
          }}
          onPress={() => setvisible(false)}
        >
          <Text
            style={{
              fontSize: content.globalfontsize,
              color: colors.light.CheckmarkBlue,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
        <SearchBar
          lightTheme={true}
          round={true}
          placeholder="Search"
          platform="ios"
          inputContainerStyle={{ borderRadius: 15 }}
          containerStyle={{
            backgroundColor: data.darkmode
              ? colors.dark.lightblack
              : colors.light.background,
          }}
          cancelButtonTitle="cancel"
          onChangeText={(e) =>
            backendfuncs.handlesearch(
              e,
              (i) => setvalue(i),
              origin,
              (s) => setinfo(s)
            )
          }
          value={value}
        />
      <ScrollView
        style={{
          paddingBottom: 30,
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
        }}
      >
        {info?.map((l, i) => {
          return (
            <ListItem
              key={i}
              onPress={() => {
                if (l.phoneNumbers) {
                  if (chosen) return chosen(l);
                  return backendfuncs.addtochats(
                    l.phoneNumbers[0].number,
                    data?.user[0]?.number,
                    (e) => setLoading(e),
                    (i) => setvisible(i)
                  );
                }
                return;
              }}
              bottomDivider
              containerStyle={{
                backgroundColor: data.darkmode
                  ? colors.dark.lightblack
                  : colors.light.background,
              }}
              style={{ paddingHorizontal: 30 }}
            >
              {l.imageAvailable && <Avatar source={{ uri: l.image }} />}
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: data.darkmode
                      ? colors.dark.white
                      : colors.light.black,
                  }}
                >
                  {l.name
                    ? l.name
                    : l.phoneNumbers
                    ? l.phoneNumbers[0].number
                    : l.id}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: c.greyOutline }}>
                  {l.phoneNumbers ? l.phoneNumbers[0].number : l.id}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </Modal>
  );
};

export default Appmodal;

const styles = StyleSheet.create({});
