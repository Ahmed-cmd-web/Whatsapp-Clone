/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import colors from "../content/colors";

const Messagecontact = ({ message, color, text }) => {
  const styles = StyleSheet.create({
    con: {
      width: "100%",
      height: 100,
      backgroundColor: color,
      padding: 5,
      borderRadius: 10,
    },
    con2: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: { color: text },
  });
  return (
    <View style={styles.con}>
      <View style={styles.con2}>
        {message.image ? (
          <Avatar
            source={{ uri: message.image }}
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
        <Text style={styles.text}>{message.name}</Text>
      </View>
      <Text style={[styles.text, { top: 5 }]}>{message.number}</Text>
    </View>
  );
};

export default Messagecontact;
