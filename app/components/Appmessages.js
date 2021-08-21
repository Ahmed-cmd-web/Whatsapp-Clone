/** @format */

import React, { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Appmessageitem from "./Appmessageitem";
const Appmessages = ({ sent, recieved }) => {
  const [messages, setmessages] = useState([]);
  useLayoutEffect(() => {
    let mes = [];
    sent.forEach((i) => mes.push({ who: "sent", data: i }));
    recieved.forEach((e) => mes.push({ who: "recieved", data: e }));
    mes.sort((a, b) => a.data.timestamp.seconds - b.data.timestamp.seconds);
    setmessages(mes);
  }, [sent, recieved]);
  const ref = useRef();
  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.con}
      onContentSizeChange={() => ref.current.scrollToEnd()}
    >
      <SafeAreaView style={styles.con2}>
        {messages.map((i, e) => (
          <Appmessageitem
            message={i.data.message}
            timestamp={i.data.timestamp}
            key={e}
            who={i.who}
            type={i.data.type}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Appmessages;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    width: "100%",
  },
  con2: {
    flex: 1,
    width: "100%",
    bottom: Platform.OS === "android" ? 0 : -25,
  },
});
