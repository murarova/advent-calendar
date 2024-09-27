import {
  Box,
  Button,
  ButtonText,
  Text,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TASK_CATEGORY } from "../../../constants/constants";
import isEmpty from "lodash/isEmpty";

import {
  getImageUrl,
  removeTask,
  saveImage,
  saveTaskByCategory,
} from "../../../services/services";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { AnimatedView, ImagePicker, Loader } from "../../common";
import { ImageBackground } from "@gluestack-ui/themed";

export function MonthPhoto({ context, data, setData }) {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);

  useEffect(() => {
    if (isEmpty(data)) {
      setEdit(true);
    } else {
      setEdit(false);
    }
    if (data?.text) {
      setText(data.text);
    }
    if (data?.image) {
      setUploadedImg({
        id: data.image.id,
        img: {
          uri: data.image.uri,
        },
      });
    }
  }, [data]);

  async function saveUserImage() {
    try {
      setIsImageLoading(true);
      await saveImage(uploadedImg);
      const uri = await getImageUrl(uploadedImg.id);
      return uri;
    } catch (error) {
      Alert.alert("Oops", "Image was not saved");
    } finally {
      setIsImageLoading(false);
    }
  }

  async function handleTaskRemove() {
    try {
      await removeTask({
        category: TASK_CATEGORY.MONTH_PHOTO,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(null);
      setText("");
      setUploadedImg(null);
    }
  }

  async function onTaskSubmit() {
    if (uploadedImg) {
      setEdit(false);
      const id = data?.id ?? uuid.v4();
      try {
        const uri = await saveUserImage();
        if (!uri) {
          setEdit(true);
          return;
        }
        const updatedData = {
          id,
          text,
          image: {
            id: uploadedImg.id,
            uri,
            width: uploadedImg.img.width,
            height: uploadedImg.img.height,
          },
        };
        await saveTaskByCategory({
          category: TASK_CATEGORY.MONTH_PHOTO,
          data: updatedData,
          context,
        });
        setData(updatedData);
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      }
    } else {
      Alert.alert("Помилка", "Будь ласка додайте фото");
    }
  }

  return (
    <Box>
      {edit ? (
        <>
          <Textarea width="100%" mb="$4">
            <TextareaInput
              onChangeText={setText}
              defaultValue={text}
              placeholder={t("screens.tasksOfTheDay.textareaPlaceholder")}
            />
          </Textarea>
          <ImagePicker
            setIsImageLoading={setIsImageLoading}
            isImageLoading={isImageLoading}
            edit={edit}
            setUploadedImg={setUploadedImg}
            uploadedImg={uploadedImg}
          />
          <Button onPress={onTaskSubmit} mt="$2" borderRadius="$lg">
            <ButtonText>{t("screens.tasksOfTheDay.submitBtnText")}</ButtonText>
          </Button>
        </>
      ) : (
        <Box>
          <Box mb="$2">
            <Text>{data?.text || t("common.empty")}</Text>
          </Box>
          {uploadedImg?.img?.uri && (
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
              <AnimatedView style={{ zIndex: 1 }} show={isImageLoading}>
                <Box height={300} width="100%" flex={1}>
                  <ImageBackground
                    style={{ flex: 1, justifyContent: "center" }}
                    src={uploadedImg?.img?.uri}
                    onLoadStart={() => setIsImageLoading(true)}
                    onLoadEnd={() => setIsImageLoading(false)}
                  />
                </Box>
              </AnimatedView>
            </Box>
          )}
          <Button onPress={() => setEdit(true)} mt="$2" borderRadius="$lg">
            <ButtonText>{t("screens.tasksOfTheDay.editBtnText")}</ButtonText>
          </Button>
          <Button onPress={handleTaskRemove} mt="$2" borderRadius="$lg">
            <ButtonText>{t("common.delete")}</ButtonText>
          </Button>
        </Box>
      )}
    </Box>
  );
}
