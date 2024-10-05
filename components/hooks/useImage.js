import { useState } from "react";
import { getImageUrl, saveImage } from "../../services/services";
import { Alert } from "react-native";

export function useImage() {
  const [image, setImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  async function saveUserImage() {
    if (!image) return;
    try {
      setIsImageLoading(true);
      await saveImage(image);
      const uri = await getImageUrl(image.id);
      const newImage = {
        ...image,
        uri,
      };
      setImage(newImage);
      return newImage;
    } catch (error) {
      Alert.alert("Oops", "Image was not saved");
    } finally {
      setIsImageLoading(false);
    }
  }
  function removeImage() {}

  return {
    saveImage: saveUserImage,
    removeImage,
    image,
    setImage,
    setIsLoading: setIsImageLoading,
    isLoading: isImageLoading,
  };
}