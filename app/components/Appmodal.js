/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import colors from "../content/colors";
import content from "../content/content";
import { info as i } from "../redux/reducer";
import Appcontactitem from "./Appcontactitem";
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
  const [load, setLoad] = useState(true);
  const call = useCallback(
    ({ item }) => (
      <Appcontactitem
        item={item}
        data={data}
        setLoading={(e) => setLoading(e)}
        setvisible={(e) => setvisible(e)}
        chosen={chosen}
      />
    ),
    [info]
  );
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
          setSize(size + 10);
          backendfuncs.handle(
            (i) => setorigin(i),
            (i) => setinfo(i),
            size
          );
        }}
        onEndReachedThreshold={0.01}
        initialNumToRender={7}
        removeClippedSubviews={true}
        data={info}
        keyExtractor={(item) => item.id}
        legacyImplementation={true}
        renderItem={call}
      />
    </Modal>
  );
};

export default Appmodal;

const styles = StyleSheet.create({});
