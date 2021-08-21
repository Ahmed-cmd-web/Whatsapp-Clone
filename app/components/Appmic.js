/** @format */

import React, { useRef, useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Tooltip } from "react-native-elements";
import colors from "../content/colors";
import backendfuncs from "../backend/backendfuncs";
import Micpopover from "./Micpopover";

const Appmic = () => {
  const ref = useRef();
  const [rec, setRec] = useState();
  const [mes, setMes] = useState("Hold to record,release to send.");
  return (
    <Tooltip
      ref={ref}
      withOverlay={false}
      width={300}
      backgroundColor={colors.light.CheckmarkBlue}
      popover={<Micpopover mes={mes} refrence={ref} />}
    >
      <TouchableHighlight
        style={{ padding: 10 }}
        underlayColor={"rgba(255,255,255,0)"}
        activeOpacity={0.2}
        onPress={() => ref.current.toggleTooltip()}
        delayLongPress={1000}
        onLongPress={async () => {
          try {
            if (!(await backendfuncs.takeaudiopermission())) return;
            setMes("Recording started...");
            ref.current.toggleTooltip();
            backendfuncs.startrecording((e) => setRec(e));
          } catch (error) {
            console.log(error);
          }
        }}
        onHideUnderlay={async () => {
          if (!rec || mes.startsWith("H")) return;
          try {
            ref.current.toggleTooltip();
            backendfuncs.stoprecording(rec);
            setMes("Hold to record,release to send.");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <SimpleLineIcons
          name="microphone"
          size={20}
          color={colors.light.CheckmarkBlue}
        />
      </TouchableHighlight>
    </Tooltip>
  );
};

export default Appmic;

const styles = StyleSheet.create({});
