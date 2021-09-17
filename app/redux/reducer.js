/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  darkmode: false,
  chats: [],
  wallpaper: null,
  navigationstate: "Status",
};

const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.user = [action.payload];
      return state;
    },
    setchats: (state, action) => {
      state.chats = [...state.chats, action.payload];
      state.chats = state.chats.filter(
        (e, i, a) => i === a.findIndex((t) => t.data.number === e.data.number)
      );
      return state;
    },
    deletechat: (state, action) => {
      state.chats = state.chats.filter((e) => e.data.number !== action.payload);
      return state;
    },
    clearchatbody: (state) => {
      state.chats = [];
      return state;
    },
    setrecieved: (state, action) => {
      var index = state.chats.findIndex(
        (i) => i.data.number === action.payload.id
      );
      state.chats[index].recieved = [action.payload.data];
      return state;
    },
    setsent: (state, action) => {
      var index = state.chats.findIndex(
        (i) => i.data.number === action.payload.id
      );

      state.chats[index].sent = [action.payload.data];
      return state;
    },
    setnav: (state, action) => {
      state.navigationstate = action.payload;
      return state;
    },
    clearchats: (state) => {
      state.chats.forEach((i) => {
        i.recieved = [];
        i.sent = [];
      });
      return state;
    },
    setdarkmode: (state, action) => {
      state.darkmode = action.payload;
      return state;
    },
    setwallpaper: (state, action) => {
      state.wallpaper = action.payload;
      return state;
    },
    resetwallpaper: (state) => {
      state.wallpaper = null;
      return state;
    },
    clear: (state) => {
      state = {
        user: [],
        messages: [],
        chats: [],
      };
      return state;
    },
  },
});

export const {
  setuser,
  setrecieved,
  setsent,
  setchats,
  clear,
  clearchats,
  deletechat,
  setwallpaper,
  setnav,
  clearchatbody,
  setdarkmode,
  resetwallpaper,
} = reducer.actions;
export const info = (state) => state;
export default reducer.reducer;
