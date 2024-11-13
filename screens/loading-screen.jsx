// @ts-nocheck
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { SCREENS } from "../constants/constants";
import { Loader } from "../components/common";

export const LoadingScreen = () => {
  const nav = useNavigation();

  function onAuthStateChanged(user) {
    if (user) {
      nav.replace(SCREENS.HOME);
    } else {
      nav.replace(SCREENS.INTRO);
    }
  }

  useEffect(() => {
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, []);

  return <Loader />;
};
