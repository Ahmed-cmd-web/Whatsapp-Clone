/** @format */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {  TouchableHighlight, View } from "react-native";
import { BottomSheet, Icon, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import bottomsheetdata from "../content/bottomsheetdata";
import colors from "../content/colors";
import { info } from "../redux/reducer";
import Appmodal from "./Appmodal";

const Appbottomsheet = ({ visible, setvisisble, rec, sender }) => {
  const nav = useNavigation();
  const data = useSelector(info);
  const [i, setI] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [vis, setVis] = useState(false);
  return (
    <BottomSheet
      isVisible={visible}
      modalProps={{ animationType: "slide" }}
      containerStyle={{
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          borderRadius: 14,
          width: "95%",
          overflow: "hidden",
          alignSelf: "center",
        }}
      >
        <Appmodal
          visible={vis}
          setvisible={(i) => setVis(i)}
          info={i}
          origin={origin}
          chosen={(e) => {
            backendfuncs.send(
              {
                name: e?.name,
                number: e?.phoneNumbers[0].number,
                image: e?.imageAvailable && e?.image,
              },
              "contact",
              rec,
              sender
            );
            setvisisble(false);
            setVis(false);
          }}
        />
        {bottomsheetdata.map((l, i) => (
          <TouchableHighlight
            key={i}
            activeOpacity={0.5}
            underlayColor={"whitesmoke"}
            onPress={async () => {
              await l.onpress(
                nav,
                rec,
                sender,
                (i) => setI(i),
                (i) => setOrigin(i)
              );
              if (l.title === "Contact") return setVis(true);
              return setvisisble(false);
            }}
            style={
              l.title === "Contacts"
                ? null
                : {
                    borderBottomColor: colors.light.grey,
                    borderBottomWidth: 0.9,
                  }
            }
          >
            <ListItem
              containerStyle={{
                flexDirection: "row",
                height: 60,
                justifyContent: "space-between",
                width: "100%",
                alignSelf: "center",
                backgroundColor: data.darkmode
                  ? colors.dark.black
                  : colors.light.white,
              }}
            >
              <ListItem.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Icon
                  name={l.icon}
                  type={l.type}
                  color={colors.light.CheckmarkBlue}
                  style={{ marginRight: 10 }}
                  size={l.size}
                />
                <ListItem.Title
                  style={[
                    l.titleStyle,
                    {
                      color: data.darkmode
                        ? colors.dark.white
                        : colors.light.black,
                    },
                  ]}
                >
                  {l.title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableHighlight>
        ))}
      </View>
      <ListItem
        onPress={() => setvisisble()}
        containerStyle={{
          backgroundColor: data.darkmode
            ? colors.dark.black
            : colors.light.white,
        }}
        style={{
          marginVertical: 10,
          borderRadius: 14,
          width: "95%",
          overflow: "hidden",
          alignSelf: "center",
          backgroundColor: data.darkmode
            ? colors.dark.white
            : colors.light.white,
        }}
        activeOpacity={0.8}
        underlayColor="gainsboro"
      >
        <ListItem.Content style={{ alignItems: "center" }}>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              color: colors.light.CheckmarkBlue,
              fontSize: 18,
            }}
          >
            Cancel
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </BottomSheet>
  );
};

export default Appbottomsheet;
