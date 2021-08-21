/** @format */

import colors from "./colors";
export default [
  [
    {
      icon: "star",
      type: "material-community",
      bg: colors.light.yellow,
      title: "Starred Messages",
    },
    {
      icon: "laptop-chromebook",
      type: "material-community",
      bg: colors.light.tea,
      title: "Linked Devices",
    },
  ],
  [
    {
      icon: "key",
      type: "font-awesome-5",
      bg: colors.light.CheckmarkBlue,
      title: "Account",
    },
    {
      icon: "whatsapp",
      type: "font-awesome-5",
      bg: colors.light.lighttea,
      title: "Chat Wallpaper",
      onpress: "change",
    },
    {
      icon: "notification",
      type: "entypo",
      bg: colors.light.red,
      title: "Notifications",
    },
    {
      icon: "database",
      type: "entypo",
      bg: colors.light.lighttea,
      title: "Storage and Data",
    },
  ],
  [
    {
      icon: "info",
      type: "antdesign",
      bg: colors.light.CheckmarkBlue,
      title: "Help",
    },
    {
      icon: "heart",
      type: "antdesign",
      bg: colors.light.red,
      title: "Tell a Friend",
    },
    {
      icon: "moon",
      type: "ionicon",
      title: "Dark Mode",
      isswitch: true,
      bg: colors.light.black,
    },
    {
      icon: "logout",
      type: "simple-line-icon",
      title: "Log-out",
      bg: colors.light.yellow,
      onpress: "clear",
    },
  ],
];
