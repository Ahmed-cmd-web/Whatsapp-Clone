/** @format */

import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import backendfuncs from "../backend/backendfuncs";
import { clear, info, setdarkmode, setwallpaper } from "../redux/reducer";
import Applist from "./Applist";

const Appflatlist = ({ data }) => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector(info);
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
          onpress={
            item.onpress === "clear"
              ? () => dispatch(clear())
              : async () => {
                  try {
                    const res = await backendfuncs.imageselector();
                    dispatch(setwallpaper(res.uri));
                  } catch (error) {
                    console.log(error);
                  }
                }
          }
        />
      ))}
    </View>
  );
};

export default Appflatlist;

const styles = StyleSheet.create({});
