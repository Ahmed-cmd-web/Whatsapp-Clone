/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { ListItem, Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector, useStore } from "react-redux";
import { info, setchats, deletechat, clearchatbody } from "../redux/reducer";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../content/colors";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
import backendfuncs from "../backend/backendfuncs";

const Chatbody = () => {
  const data = useSelector(info);
  const dispatch = useDispatch();
  const [overlay, setOverlay] = useState(false);
  const { type, isConnected } = useNetInfo();
  const [internet, setInternet] = useState(isConnected || type !== "none");
  const [typing, setTyping] = useState(false);
  const ref = useRef();
  useEffect(() => {
    setInternet(isConnected || type !== "none");
    if (!internet) return setOverlay(false);
    backendfuncs.getusers(
      (e) => setOverlay(e),
      data?.user[0].number,
      (i) => dispatch(setchats(i))
    );
    backendfuncs.checktyping((e) => setTyping(e), data?.user[0]?.number);
  }, [type]);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: data.darkmode
          ? colors.dark.background
          : colors.light.background,
      }}
    >
      <Loading visible={overlay} />
      <FlatList
        data={data.chats}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              backendfuncs.getusers(
                (e) => setOverlay(e),
                data?.user[0].number,
                (i) => dispatch(setchats(i))
              );
            }}
            tintColor={"gainsboro"}
            colors={[colors.light.CheckmarkBlue]}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SafeAreaView key={index}>
            <Swipeable
              ref={ref}
              containerStyle={{ height: 70 }}
              renderRightActions={() => (
                <View style={{ width: "15%" }}>
                  <Button
                    onPress={() =>
                      Alert.alert(
                        "Warning",
                        `Are you sure you want to remove ${item?.data?.name} from your chats ?`,
                        [
                          {
                            text: "Yes",
                            onPress: () => {
                              dispatch(deletechat(item?.data?.number));
                              backendfuncs.deletechats(
                                item?.data?.number,
                                data?.user[0]?.number,
                                (i) => setOverlay(i)
                              );
                            },
                          },
                          { text: "No", onPress: () => null },
                        ]
                      )
                    }
                    icon={{ name: "delete", color: "white" }}
                    buttonStyle={{
                      height: "100%",
                      backgroundColor: colors.light.red,
                    }}
                  />
                </View>
              )}
              renderLeftActions={() => (
                <View style={{ width: "15%" }}>
                  <Button
                    onPress={() =>
                      Alert.alert(
                        "Warning",
                        `Are you sure you want to remove ${item?.data?.name} from your chats ?`,
                        [
                          {
                            text: "Yes",
                            onPress: () => {
                              dispatch(deletechat(item?.data?.number));
                              backendfuncs.deletechats(
                                item?.data?.number,
                                data?.user[0]?.number,
                                (i) => setOverlay(i)
                              );
                            },
                          },
                          { text: "No", onPress: () => null },
                        ]
                      )
                    }
                    icon={{ name: "delete", color: "white" }}
                    buttonStyle={{
                      minHeight: "100%",
                      backgroundColor: colors.light.red,
                    }}
                  />
                </View>
              )}
            >
              <ListItem
                bottomDivider
                onPress={() =>
                  navigation.navigate("room", {
                    uri: item?.data?.profilepic,
                    name: item?.data?.name,
                    number: item?.data?.number,
                    token: item?.data?.token,
                  })
                }
                rightWidth={"15%"}
                leftWidth={"15%"}
                containerStyle={{
                  height: "100%",
                  backgroundColor: data.darkmode
                    ? colors.dark.background
                    : colors.light.background,
                }}
              >
                {item?.data?.profilepic.length > 10 ? (
                  <Avatar
                    source={{
                      uri: `data:image/gif;base64,${item?.data?.profilepic}`,
                    }}
                    rounded={true}
                    size={50}
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
                    {item?.data?.name}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      color: colors.light.grey,
                    }}
                  >
                    {typing[item?.data?.number]
                      ? "typing..."
                      : item?.data?.number}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </Swipeable>
          </SafeAreaView>
        )}
      />
    </View>
  );
};

export default Chatbody;

const styles = StyleSheet.create({});
