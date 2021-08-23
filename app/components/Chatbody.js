/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { ListItem, Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { info, setchats, deletechat } from "../redux/reducer";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../content/colors";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
import backendfuncs from "../backend/backendfuncs";

const Chatbody = () => {
  const data = useSelector(info);
  const dispatch = useDispatch();
  const [overlay, setOverlay] = useState(false);
  const { type } = useNetInfo();
  const [internet, setInternet] = useState(type !== "none");
  const [typing, setTyping] = useState(false);
  const ref = useRef();
  useEffect(() => {
    setInternet(type !== "none");
    if (!internet) return;
    backendfuncs.getusers(
      (e) => setOverlay(e),
      data?.user[0].number,
      (i) => dispatch(setchats(i))
    );
    backendfuncs.checktyping((e) => setTyping(e), data?.user[0]?.number);
  }, []);
  const navigation = useNavigation();
  return (
    <ScrollView
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: data.darkmode
          ? colors.dark.background
          : colors.light.background,
      }}
    >
      <Loading visible={overlay} />
      {data.chats.map((l, i) => (
        <SafeAreaView key={i}>
          <Swipeable
            ref={ref}
            containerStyle={{ height: 70 }}
            renderRightActions={() => (
              <View style={{ width: "15%" }}>
                <Button
                  onPress={() =>
                    Alert.alert(
                      "Warning",
                      `Are you sure you want to remove ${l?.data?.name} from your chats ?`,
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            backendfuncs.deletechats(
                              l?.data?.number,
                              data?.user[0]?.number,
                              (i) => setOverlay(i)
                            );
                            dispatch(deletechat(l?.data?.number));
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
                      `Are you sure you want to remove ${l?.data?.name} from your chats ?`,
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            dispatch(deletechat(l?.data?.number));
                            console.log(l.data);
                            backendfuncs.deletechats(
                              l?.data?.number,
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
                  uri: l?.data?.profilepic,
                  name: l?.data?.name,
                  number: l?.data?.number,
                  token: l?.data?.token,
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
              {l?.data?.profilepic.length > 10 ? (
                <Avatar
                  source={{
                    uri: `data:image/gif;base64,${l?.data?.profilepic}`,
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
                  {l?.data?.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    color: colors.light.grey,
                  }}
                >
                  {typing ? "typing..." : l?.data?.number}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </Swipeable>
        </SafeAreaView>
      ))}
    </ScrollView>
  );
};

export default Chatbody;

const styles = StyleSheet.create({});
