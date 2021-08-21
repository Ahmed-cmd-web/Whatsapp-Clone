/** @format */

import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Userchatscreen from "../screens/Userchatscreen";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import colors from "../content/colors";
import { useDispatch, useSelector } from "react-redux";
import Cam from "../components/Cam";
import Appvideo from "../components/Appvideo";
import { Icon } from "react-native-elements";
import { clearchats, info } from "../redux/reducer";
import Apptabs from "./Apptabs";
import { useDeviceOrientation } from "@react-native-community/hooks";
import Appmap from "../components/Appmap";
import backendfuncs from "../backend/backendfuncs";
const Stack = createStackNavigator();

const Chatsstack = () => {
  const dispatch = useDispatch();
  const data = useSelector(info);
  const [typing, setTyping] = useState(false);
  const { landscape } = useDeviceOrientation();
  useEffect(() => {
    backendfuncs.checktyping((e) => setTyping(e), data?.user[0]?.number);
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        options={{
          headerShown: false,
        }}
        component={Apptabs}
      />
      <Stack.Screen
        name="room"
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            height: landscape
              ? Platform.OS === "android"
                ? 80
                : 50
              : undefined,
            backgroundColor: data.darkmode
              ? colors.dark.lightblack
              : colors.light.white,
          },
          headerTitleAlign: "left",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 100,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="videocam-outline"
                  size={28}
                  color={colors.light.CheckmarkBlue}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather
                  name="phone"
                  size={22}
                  color={colors.light.CheckmarkBlue}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => {
            const navigation = useNavigation();
            const route = useRoute();

            return (
              <Icon
                name="chevron-back"
                type="ionicon"
                size={35}
                style={{ marginLeft: 10 }}
                onPress={() => {
                  dispatch(clearchats());
                  backendfuncs.settyping(
                    false,
                    route.params.number,
                    data?.user[0]?.number
                  );
                  navigation.goBack();
                }}
                color={colors.light.CheckmarkBlue}
              />
            );
          },
          headerTitle: () => {
            const route = useRoute();

            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {route.params.uri.length > 10 ? (
                  <Avatar
                    rounded
                    source={{
                      uri: `data:image/gif;base64,${route.params.uri}`,
                    }}
                    size={45}
                  />
                ) : (
                  <Avatar
                    rounded
                    containerStyle={{ height: 60, width: 45 }}
                    icon={{
                      name: "account-circle",
                      type: "materialcommunityicons",
                      color: colors.light.grey,
                      size: 45,
                    }}
                  />
                )}
                <View style={{ marginLeft: 5 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: data.darkmode
                        ? colors.dark.white
                        : colors.light.black,
                    }}
                  >
                    {route.params.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.light.grey,
                    }}
                  >
                    {typing ? "typing..." : route.params.number}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          },
        }}
        component={Userchatscreen}
      />
      <Stack.Screen
        name="camera"
        options={{ headerShown: false }}
        component={Cam}
      />
      <Stack.Screen
        name="Video"
        component={Appvideo}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Map" component={Appmap} />
    </Stack.Navigator>
  );
};

export default Chatsstack;

const styles = StyleSheet.create({});
