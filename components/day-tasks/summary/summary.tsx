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
import { removeTask, saveTaskByCategory } from "../../../services/services";
import { Alert } from "react-native";
import isEmpty from "lodash/isEmpty";
import { HappySlider } from "./happy-slider";
import { ActionButtons } from "../../common";
import { SummaryData } from "../../../types/types";

interface SummaryProps {
  context: string;
  data: SummaryData | null;
  setData: (data: SummaryData | null) => void;
  handleAddProgress: () => void;
  handleRemoveProgress: () => void;
}

export function Summary({
  context,
  data,
  setData,
  handleAddProgress,
  handleRemoveProgress,
}: SummaryProps) {
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

    if (data?.text) {
      setText(data.text);
    }
    if (data?.rate) {
      setRate(data.rate);
    }
  }, [data]);

  function onTaskSubmit() {
    const id = data?.id ?? uuid.v4();
    if (!text.trim()) {
      Alert.alert("Oops", "Please add some text");
      return;
    }
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
      handleAddProgress();
      setEdit(false);
    }
  }

  async function handleTaskRemove() {
    try {
      await removeTask({
        category: TASK_CATEGORY.SUMMARY,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(null);
      setText("");
      setRate(50);
      handleRemoveProgress();
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
          <ActionButtons
            onEdit={() => setEdit(true)}
            onDelete={handleTaskRemove}
          />
        </Box>
      )}
    </Box>
  );
}
