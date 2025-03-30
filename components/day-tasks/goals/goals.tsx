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
import { ActionButtons } from "../../common";
import { TextData } from "../../../types/types";

interface GoalsProps {
  context: string;
  data: TextData | null;
  setData: (data: TextData | null) => void;
  handleAddProgress: () => void;
  handleRemoveProgress: () => void;
}

export function Goals({
  context,
  data,
  setData,
  handleAddProgress,
  handleRemoveProgress,
}: GoalsProps) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
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
  }, [data]);

  function onTaskSubmit() {
    const id = data?.id ?? uuid.v4();
    if (!text.trim()) {
      Alert.alert("Oops", "Please add some text");
      return;
    }
    const updatedGoal = {
      id,
      text,
    };
    try {
      saveTaskByCategory({
        category: TASK_CATEGORY.GOALS,
        data: updatedGoal,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(updatedGoal);
      setEdit(false);
      handleAddProgress();
    }
  }

  async function handleTaskRemove() {
    try {
      await removeTask({
        category: TASK_CATEGORY.GOALS,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(null);
      setText("");
      handleRemoveProgress();
    }
  }

  return (
    <Box>
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
