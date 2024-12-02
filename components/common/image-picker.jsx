import { Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { Box, ButtonText, Button } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { ImageBackground } from "@gluestack-ui/themed";
import uuid from "react-native-uuid";
import { Loader } from "./loader";
import { AnimatedView } from "./animated-view";

export function ImagePicker({
  image,
  setImage,
  edit,
  setIsImageLoading,
  isImageLoading,
}) {
  const { t } = useTranslation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
      const id = image?.id ?? uuid.v4();

      const newImage = {
        id,
        uri: result.assets[0].uri,
        width: result.assets[0].width,
        height: result.assets[0].height,
      };
      setImage(newImage);
    } else {
      Alert.alert("Canceled");
    }
  };

  return (
    <Box>
      {image && (
        <Box flex={1}>
          {isImageLoading && (
            <Box
              position="absolute"
              backgroundColor="$blueGray100"
              opacity="$60"
              top="$0"
              bottom="$0"
              left="$0"
              right="$0"
              zIndex={2}
            >
              <Loader size="large" />
            </Box>
          )}
          <AnimatedView style={{ zIndex: 2 }} show={!isImageLoading}>
            <Box height={300} width="100%" flex={1}>
              <ImageBackground
                style={{ flex: 1, justifyContent: "center" }}
                source={{ uri: image.uri }}
                resizeMode="contain"
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
            {image ? t("common.pickAnother") : t("common.pickPhoto")}
          </ButtonText>
        </Button>
      )}
    </Box>
  );
}
