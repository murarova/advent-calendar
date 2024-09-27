import { Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import {
  Box,
  ButtonText,
  Button,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { ImageBackground } from "@gluestack-ui/themed";
import uuid from "react-native-uuid";
import { Loader } from "./loader";
import { AnimatedView } from "./animated-view";

export function ImagePicker({
  uploadedImg,
  setUploadedImg,
  edit,
  setIsImageLoading,
  isImageLoading,
}) {
  const { t } = useTranslation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    setIsImageLoading(true);
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
      const id = uploadedImg?.id ?? uuid.v4();
      const newImage = {
        id,
        img: result.assets[0],
      };
      setUploadedImg(newImage);
      setIsImageLoading(false);
    } else {
      Alert.alert("Canceled");
    }
  };

  return (
    <Box>
      {uploadedImg && (
        <Box flex={1}>
          <Box
            position="absolute"
            top="$0"
            bottom="$0"
            left="$0"
            right="$0"
            zIndex={1}
          >
            <Loader size="large" />
          </Box>
          <AnimatedView style={{ zIndex: 2 }} show={isImageLoading}>
            <Box height={300} width="100%" flex={1}>
              <ImageBackground
                style={{ flex: 1, justifyContent: "center" }}
                source={{ uri: uploadedImg.img.uri }}
                onLoadStart={() => setIsImageLoading(true)}
                onLoadEnd={() => setIsImageLoading(false)}
              />
            </Box>
          </AnimatedView>
        </Box>
      )}
      {edit && (
        <Button variant="link" onPress={pickImage}>
          <ButtonText>
            {uploadedImg ? t("common.pickAnother") : t("common.pickPhoto")}
          </ButtonText>
        </Button>
      )}
    </Box>
  );
}
