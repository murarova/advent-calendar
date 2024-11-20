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
import { TASK_CATEGORY, TASK_OUTPUT_TYPE } from "../../../constants/constants";
import isEmpty from "lodash/isEmpty";

import { removeTask, saveMoodTask } from "../../../services/services";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { ActionButtons, AnimatedView, ImagePicker, Loader } from "../../common";
import { ImageBackground } from "@gluestack-ui/themed";
import { useImage } from "../../../hooks/useImage";

export function MoodTask({ data, setData, removeGrade, day, taskOutputType }) {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const { saveImage, setImage, image, isLoading, setIsLoading } = useImage();

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
      setImage(data?.image);
    }
  }, [data]);

  async function handleTaskRemove() {
    try {
      await removeTask({
        category: TASK_CATEGORY.MOOD,
        context: null,
      });
      await removeGrade({ category: TASK_CATEGORY.MOOD });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(null);
      setText("");
      setImage(null);
    }
  }

  async function onTaskSubmit() {
    const id = data?.id ?? uuid.v4();

    let updatedData = {
      id,
      text,
      image,
    };

    if (image || text) {
      setEdit(false);
      try {
        if (image) {
          const newImage = await saveImage();
          updatedData = {
            ...updatedData,
            image: newImage,
          };
        }
        await saveMoodTask({
          category: TASK_CATEGORY.MOOD,
          data: updatedData,
          day,
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
          {(taskOutputType === TASK_OUTPUT_TYPE.TEXT ||
            taskOutputType === TASK_OUTPUT_TYPE.TEXT_PHOTO) && (
            <>
              <Textarea width="100%" mb="$4">
                <TextareaInput
                  onChangeText={setText}
                  defaultValue={text}
                  placeholder={t("screens.tasksOfTheDay.textareaPlaceholder")}
                />
              </Textarea>
            </>
          )}

          {(taskOutputType === TASK_OUTPUT_TYPE.IMAGE ||
            taskOutputType === TASK_OUTPUT_TYPE.TEXT_PHOTO) && (
            <ImagePicker
              setIsImageLoading={setIsLoading}
              isImageLoading={isLoading}
              edit={edit}
              setImage={setImage}
              image={image}
            />
          )}

          {taskOutputType && (
            <Button onPress={onTaskSubmit} mt="$2" borderRadius="$lg">
              <ButtonText>
                {t("screens.tasksOfTheDay.submitBtnText")}
              </ButtonText>
            </Button>
          )}
        </>
      ) : (
        <Box>
          {data?.text && (
            <Box mb="$2">
              <Text>{data?.text}</Text>
            </Box>
          )}
          {image && (
            <Box flex={1}>
              {isLoading && (
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
              <AnimatedView style={{ zIndex: 1 }} show={!isLoading}>
                <Box height={300} width="100%" flex={1}>
                  <ImageBackground
                    style={{ flex: 1, justifyContent: "center" }}
                    src={image?.uri}
                  />
                </Box>
              </AnimatedView>
            </Box>
          )}
          <ActionButtons
            onEdit={() => setEdit(true)}
            onDelete={handleTaskRemove}
          />
        </Box>
      )}
    </Box>
  );
}
