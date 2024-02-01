import { useState } from "react";
import { Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { Box, ButtonText, Button, Image } from "@gluestack-ui/themed";

export function ImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("Canceled");
    }
  };

  return (
    <Box>
      <Button onPress={pickImage}>
        <ButtonText>Вибери фото</ButtonText>
      </Button>
      {image && (
        <Box mt="$4">
          <Image
            alt="user photo"
            source={{ uri: image }}
            width="100%"
            height={200}
          />
        </Box>
      )}
    </Box>
  );
}
