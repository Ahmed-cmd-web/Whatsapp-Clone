/** @format */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors as c } from "react-native-elements";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";
import content from "../content/content";
import { info as i } from "../redux/reducer";
import Loading from "./Loading";

const Appmodal = ({
  visible,
  setvisible,
  origin: o,
  info: ind,
  chosen = null,
}) => {
  const [info, setinfo] = useState(ind);
  const [value, setvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [origin, setorigin] = useState(o);
  const [size, setSize] = useState(15);
  const [vis, setVis] = useState(false);
  const [load, setLoad] = useState(true);
  const data = useSelector(i);
  useEffect(() => {
    setinfo(ind);
    setorigin(o);
  }, [ind, o]);

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
        onBlur={() => setLoad(true)}
        onCancel={() => setLoad(true)}
        onChangeText={(e) => {
          setLoad(false);
          backendfuncs.handlesearch(
            e,
            (i) => setvalue(i),
            origin,
            (s) => setinfo(s)
          );
        }}
        value={value}
      />

      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{
          backgroundColor: data.darkmode
            ? colors.dark.lightblack
            : colors.light.background,
        }}
        onEndReached={() => {
          if (!load) return;
          setVis(true);
          setSize(size + 10);
          backendfuncs.handle(
            (i) => setorigin(i),
            (i) => setinfo(i),
            size
          );
        }}
        onContentSizeChange={() => setVis(false)}
        onScrollBeginDrag={() => setVis(false)}
        onEndReachedThreshold={0}
        data={info}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          try {
            if (!item) return;
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
                bottomDivider
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
                      color: data.darkmode
                        ? colors.dark.white
                        : colors.light.black,
                    }}
                  >
                    {item?.name
                      ? item?.name
                      : item?.phoneNumbers
                      ? item?.phoneNumbers[0]?.number
                      : item?.id}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ color: c.greyOutline }}>
                    {item?.phoneNumbers
                      ? item?.phoneNumbers[0]?.number
                      : item?.id}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          } catch (error) {
            console.log(error);
          }
        }}
      />
      {vis && (
        <ActivityIndicator
          size="large"
          style={{
            alignSelf: "center",
            width: "100%",
            backgroundColor: data.darkmode
              ? colors.dark.lightblack
              : colors.light.background,
          }}
        />
      )}
    </Modal>
  );
};

export default Appmodal;

const styles = StyleSheet.create({});
