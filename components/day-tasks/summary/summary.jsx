import {
  Box,
  Text,
  Textarea,
  TextareaInput,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TASK_CATEGORY } from "../../../constants/constants";
import uuid from "react-native-uuid";
import { saveTaskByCategory } from "../../../services/services";
import { Alert } from "react-native";
import isEmpty from "lodash/isEmpty";
import { HappySlider } from "./happy-slider";

export function Summary({ context, data, setData }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [rate, setRate] = useState(50);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEmpty(data)) {
      setEdit(true);
    } else {
      setEdit(false);
    }

    if (data.text) {
      setText(data.text);
    }
    if (data.rate) {
      setRate(data.rate);
    }
  }, [data]);

  function onTaskSubmit() {
    const id = data.id ?? uuid.v4();
    const updatedSummary = {
      id,
      text,
      rate,
    };
    try {
      saveTaskByCategory({
        category: TASK_CATEGORY.SUMMARY,
        data: updatedSummary,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(updatedSummary);
      setEdit(false);
    }
  }

  return (
    <Box>
      <HappySlider rate={rate} setRate={setRate} isDisabled={!edit} />
      {edit ? (
        <>
          <Textarea width="100%">
            <TextareaInput
              onChangeText={setText}
              defaultValue={text}
              placeholder={t("screens.tasksOfTheDay.textareaPlaceholder")}
            />
          </Textarea>
          <Button onPress={onTaskSubmit} mt="$2" borderRadius="$lg">
            <ButtonText>{t("screens.tasksOfTheDay.submitBtnText")}</ButtonText>
          </Button>
        </>
      ) : (
        <Box>
          <Box mb="$2">
            <Text>{data?.text || t("common.empty")}</Text>
          </Box>
          <Button onPress={() => setEdit(true)} mt="$2" borderRadius="$lg">
            <ButtonText>{t("screens.tasksOfTheDay.editBtnText")}</ButtonText>
          </Button>
        </Box>
      )}
    </Box>
  );
}
