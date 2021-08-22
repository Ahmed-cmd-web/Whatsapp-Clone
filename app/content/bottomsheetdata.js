/** @format */

import * as Location from "expo-location";
import backendfuncs from "../backend/backendfuncs";

export default [
  {
    title: "Camera",
    icon: "camera",
    type: "simple-line-icon",
    onpress: (e) => e.navigate("camera"),
    size: 25,
  },

  {
    title: "Photo & Video Library",
    icon: "photo",
    type: "font-awesome",
    onpress: async (e, rec, sender) => {
      try {
        const res = await backendfuncs.imageselector();
        return backendfuncs.send(res.base64, "image", rec, sender);
      } catch (error) {
        console.log(error);
      }
    },
    size: 25,
  },
  {
    title: "Room",
    icon: "ios-videocam-outline",
    type: "ionicon",
    onpress: (e) => e.navigate("camera"),
    size: 30,
  },
  {
    title: "Document",
    icon: "document-outline",
    type: "ionicon",
    onpress: () => null,
    size: 25,
  },
  {
    title: "Location",
    icon: "location",
    type: "evilicon",
    onpress: async (e, rec, sender) => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return granted;
        e.navigate("Map", {
          rec: rec,
          sender: sender,
        });
        return granted;
      } catch (error) {
        console.log(error);
      }
    },
    size: 32,
  },
  {
    title: "Contacts",
    icon: "user-circle",
    type: "font-awesome-5",
    onpress: async (e, rec, sender, setinfo, setorigin) => {
      backendfuncs.handle(
        (i) => setorigin(i),
        (i) => setinfo(i)
      );
    },
    size: 25,
  },
];
