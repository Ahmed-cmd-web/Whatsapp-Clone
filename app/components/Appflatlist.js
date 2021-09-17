/** @format */

import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clear, info, setdarkmode, setwallpaper } from "../redux/reducer";
import Applist from "./Applist";

const Appflatlist = ({ data }) => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector(info);
  const { navigate } = useNavigation();
  const whattodo = async (press) => {
    switch (press) {
      case "clear":
        dispatch(clear());
        break;
      case "change":
        navigate("Chat Wallpaper");
        break;
      case "Update":
        navigate("Account");
        break;
      default:
        break;
    }
  };
  return (
    <View>
      {data.map((item, index) => (
        <Applist
          key={index}
          title={item.title}
          bg={item.bg}
          icon={item.icon}
          type={item.type}
          isswitch={item.isswitch ? item.isswitch : false}
          switchvalue={darkmode}
          valuechanged={
            item.isswitch
              ? (e) => {
                  dispatch(setdarkmode(e));
                }
              : () => null
          }
          onpress={() => whattodo(item.onpress)}
        />
      ))}
    </View>
  );
};

export default Appflatlist;
