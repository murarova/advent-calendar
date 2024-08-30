// @ts-nocheck
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { SCREENS } from "../constants/constants";
import { Box, Spinner } from "@gluestack-ui/themed";

export const LoadingScreen = () => {
  const nav = useNavigation();

  function onAuthStateChanged(user) {
    if (user) {
      nav.replace(SCREENS.HOME);
    } else {
      nav.replace(SCREENS.LOGIN);
    }
  }

  useEffect(() => {
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, []);

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bgColor="whiter">
      <Spinner size="large" />
    </Box>
  );
};
