import { Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import {
  Box,
  ButtonText,
  Button,
  Image,
  VStack,
  ScrollView,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import isEmpty from "lodash/isEmpty";

export function ImagePicker({ images, setImages, edit }) {
  const { t } = useTranslation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setImages(result.assets);
    } else {
      Alert.alert("Canceled");
    }
  };
  console.log("images", images);
  return (
    <Box>
      {edit && (
        <Button onPress={pickImage}>
          <ButtonText>
            {!isEmpty(images) ? t("common.pickAnother") : t("common.pickPhoto")}
          </ButtonText>
        </Button>
      )}
      {!isEmpty(images) && (
        <Box maxHeight="$80" justifyContent="center" my="$2">
          <ScrollView>
            <VStack space="md" reversed={false}>
              {images.map(({ uri, assetId }) => (
                <Image
                  key={assetId}
                  alt="user photo"
                  source={{ uri }}
                  width="100%"
                  height={200}
                />
              ))}
            </VStack>
          </ScrollView>
        </Box>
      )}
    </Box>
  );
}
