/** @format */

import db from "./firebase";
import * as Contacts from "expo-contacts";
import { Alert } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import firebase from "firebase/app";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import {
  INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  INTERRUPTION_MODE_IOS_DUCK_OTHERS,
} from "expo-av/build/Audio";
var v = [];
var data = [];
const getbookednums = async () => {
  await db
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        v.push(doc.id);
        return v;
      });
    })
    .catch((e) => console.log(e));
  return v;
};
const register = async (v) => {
  try {
    const res = await getbookednums();
    if (res.findIndex((i) => i === v.number) === -1) {
      return await db
        .doc(`users/${v.number}`)
        .set(v)
        .then(() => {
          db.doc(`users/${v.number}/chats/45`).set({});
          return {
            ok: true,
            data: v,
          };
        })
        .catch((e) =>
          Alert.alert(
            "Warning",
            "Internet connection is not stable.\n Try again later."
          )
        );
    }
    return {
      ok: false,
    };
  } catch (error) {
    Alert.alert(
      "Warning",
      "Internet connection is not stable.\n Try again later."
    );
  }
};
const login = async (v) => {
  try {
    const res = await getbookednums();
    if (res.findIndex((i) => i === v.number) === -1) return false;
    return await db
      .doc(`users/${v.number}`)
      .get()
      .then((v) => {
        data.push(v.data());
        return data;
      })
      .catch((e) => console.log(e));
  } catch (error) {
    Alert.alert(
      "Warning",
      "Internet connection is not stable.\n Try again later.",
      [
        {
          text: "ok",
          onPress: () => setloading(false),
        },
      ]
    );
  }
};
const handlesearch = (e, setvalue, origin, setinfo) => {
  setvalue(e);
  if (e === "") return setinfo(origin);
  setinfo(
    origin.filter((i) => {
      if (i.name === undefined) return false;
      return i.name.startsWith(e);
    })
  );
};

const handle = async (setorigin, setinfo, size = 10) => {
  try {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (!granted) return;
    const { data } = await Contacts.getContactsAsync({
      pageSize: size,
    });
    setorigin(data);
    setinfo(data);
  } catch (error) {
    console.log(error);
  }
};
const deletechats = async (target, user, setloading) => {
  setloading(true);
  try {
    await db.doc(`users/${user}/chats/${target}`).delete();
    await db.doc(`users/${target}/chats/${user}`).delete();
  } catch (error) {
    console.log(error);
  }
  setloading(false);
};
const addtochats = async (v, user, setloading, setvisible) => {
  try {
    setloading(true);
    const res = await getbookednums();
    const trimmed = v.replace(/\D/g, "");
    if (res.findIndex((i) => i === trimmed) === -1) {
      return Alert.alert(
        "User not found",
        "This user is not on whatsApp clone yet...",
        [
          {
            text: "ok",
            onPress: () => setloading(false),
          },
        ]
      );
    }

    db.doc(`users/${user}/chats/${trimmed}`).set({});
    db.doc(`users/${trimmed}/chats/${user}`).set({});
    db.collection(`users/${user}/chats/${trimmed}/sent`).add({});
    db.collection(`users/${user}/chats/${trimmed}/recieved`).add({});
    db.collection(`users/${trimmed}/chats/${user}/sent`).add({});
    db.collection(`users/${trimmed}/chats/${user}/recieved`).add({});
    setloading(false);
    return setvisible(false);
  } catch (error) {
    console.log(error);
  }
};

const takephotopermission = async () => {
  try {
    const { granted } = await Camera.requestPermissionsAsync();
    if (!granted) return false;

    return true;
  } catch (error) {
    console.log(error);
  }
};
const takeaudiopermission = async () => {
  try {
    const { granted } = await Audio.requestPermissionsAsync();
    return granted;
  } catch (error) {
    console.log(error);
  }
};

const takephotoorvid = async (type, set, ref) => {
  try {
    switch (type) {
      case "video":
        const vid = await ref.current.recordAsync({
          quality: 1,
          base64: true,
        });
        return set(vid.uri, true);

      case "photo":
        const pic = await ref.current.takePictureAsync({
          quality: 1,
          base64: true,
          exif: true,
        });
        return set(pic, true);
      default:
        return Alert.alert(
          "Not found",
          'This type of operation doesnot exist.Select either "video" or "photo" '
        );
    }
  } catch (error) {
    console.log(error);
  }
};

const startrecording = async (setRec) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    });
    const recording2 = new Audio.Recording();
    setRec(recording2);
    await recording2.prepareToRecordAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    await recording2.startAsync();
  } catch (error) {
    console.log(error);
  }
};

const stoprecording = async (rec) => {
  try {
    await rec.stopAndUnloadAsync();
    const uri = rec.getURI();
    console.log(uri);
    Alert.alert(
      "Message",
      "Are you sure you would like to send this voicenote?",
      [
        { text: "Yes", onPress: () => console.log(uri) },
        { text: "No", onPress: () => null },
      ]
    );
  } catch (error) {
    console.log(error);
  }
};
const send = (message, type, reciever, sender) => {
  db.collection(`users/${reciever}/chats/${sender?.user[0].number}/recieved`)
    .add({
      type: type,
      message: message,
      timestamp: firebase.firestore.Timestamp.now(),
    })
    .then(() =>
      db
        .collection(`users/${sender?.user[0].number}/chats/${reciever}/sent`)
        .add({
          type: type,
          message: message,
          timestamp: firebase.firestore.Timestamp.now(),
        })
        .then((r) => null)
        .catch((e) => Alert.alert(e))
    )
    .catch((e) => Alert.alert(e));
};

const getdata = async (data, route, setLoading, recieved, sent) => {
  setLoading(true);

  try {
    db.collection(
      `users/${data?.user[0].number}/chats/${route?.params?.number}/sent`
    )
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        sent(snapshot.docs.map((i) => i.data()));
      });
    db.collection(
      `users/${data?.user[0].number}/chats/${route?.params?.number}/recieved`
    )
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        recieved(snapshot.docs.map((i) => i.data()));
        setLoading(false);
      });
    return;
  } catch (error) {
    console.log(error);
  }
};
const getlocation = async () => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: 3 });
    return coords;
  } catch (error) {
    console.log(error);
  }
};
const getusers = async (setOverlay, user, setchats) => {
  setOverlay(true);
  db.collection(`users/${user}/chats`).onSnapshot((querySnapshot) => {
    if (querySnapshot.empty) return setOverlay(false);
    querySnapshot.docChanges().forEach(async (i) => {
      if (i.type === "modified") return;
      await db
        .doc(`users/${i.doc.id}`)
        .get()
        .then(async (i) => {
          setchats({ data: i.data(), sent: [], recieved: [] });
          setOverlay(false);
        })
        .catch((e) => console.log(e));
    });
  });
};
const imageselector = async () => {
  if (Platform.OS !== "web") {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;
    let { cancelled, base64, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.1,
      base64: true,
    });
    if (cancelled) return;
    return { base64, uri };
  }
};
const settyping = async (istyping, reciever, sender) => {
  try {
    await db.doc(`users/${reciever}/chats/${sender}`).set({
      typing: istyping,
    });
  } catch (error) {
    console.log(error);
  }
};
const checktyping = async (set, user) => {
  try {
    db.collection(`users/${user}/chats`).onSnapshot((e) =>
      e.forEach((i) => set(i.data().typing))
    );
  } catch (error) {
    console.log(error);
  }
};

export default {
  register,
  getbookednums,
  deletechats,
  addtochats,
  login,
  handlesearch,
  handle,
  takephotopermission,
  takephotoorvid,
  takeaudiopermission,
  startrecording,
  stoprecording,
  getdata,
  settyping,
  send,
  getlocation,
  imageselector,
  checktyping,
  getusers,
};
