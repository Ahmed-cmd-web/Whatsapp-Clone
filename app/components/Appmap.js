/** @format */

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import backendfuncs from "../backend/backendfuncs";
import MapView, { Callout, Marker } from "react-native-maps";
import Mapconfig from "../content/Mapconfig";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../content/colors";

const Appmap = ({ route }) => {
  const [sent, setSent] = useState(false);
  const [loc, setLoc] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const getloc = async () => {
    try {
      const res = await backendfuncs.getlocation();
      setLoc(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getloc();
  }, []);

  return (
    <MapView
      customMapStyle={Mapconfig}
      style={{ flex: 1 }}
      region={{
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onMarkerDragEnd={(e) => setLoc(e.nativeEvent.coordinate)}
      loadingEnabled={true}
      showsTraffic={true}
      mapType="standard"
    >
      <Marker
        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
        draggable
      >
        <Callout
          tooltip={false}
          style={{
            alignItems: "center",
            backgroundColor: "white",
            flexDirection: "row",
          }}
          onPress={() => {
            setSent(true);
            backendfuncs.send(
              loc,
              "location",
              route.params.rec,
              route.params.sender
            );
          }}
        >
          {sent ? (
            <Text>Sent!</Text>
          ) : (
            <View
              style={{
                alignItems: "center",
                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <Text style={{ paddingHorizontal: 5 }}>Send this location</Text>
              <View style={styles.v}>
                <MaterialIcons
                  name="send"
                  size={12}
                  color={colors.dark.white}
                />
              </View>
            </View>
          )}
        </Callout>
      </Marker>
    </MapView>
  );
};

export default Appmap;

const styles = StyleSheet.create({
  v: {
    width: 20,
    height: 20,
    borderRadius: 35,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.light.CheckmarkBlue,
    backgroundColor: colors.light.CheckmarkBlue,
  },
});
