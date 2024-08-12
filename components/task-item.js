import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  ChevronUpIcon,
  ChevronDownIcon,
  Box,
  Text,
  Textarea,
  TextareaInput,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { ImagePicker } from "./common";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { TASK_OUTPUT_TYPE, TASK_TYPE } from "../constants/constants";
import isEmpty from "lodash/isEmpty";

export function TaskItem({ taskConfig, onTaskDataUpdate }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [edit, setEdit] = useState(true);

  function onTaskSubmit() {
    if (taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT && text.trim()) {
      onTaskDataUpdate({
        text,
        taskOutputType: taskConfig.taskOutputType,
        taskType: taskConfig.taskType,
      });
      setEdit(false);
    }

    if (
      taskConfig.taskOutputType === TASK_OUTPUT_TYPE.IMAGE &&
      !isEmpty(images)
    ) {
      onTaskDataUpdate({
        images,
        taskOutputType: taskConfig.taskOutputType,
        taskType: taskConfig.taskType,
      });
      setEdit(false);
    }
  }

  return (
    <Accordion size="md" my="$2" variant="filled" type="single">
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>
                    {taskConfig.taskType === TASK_TYPE.DAY
                      ? t("screens.tasksOfTheDay.dayTitle")
                      : t("screens.tasksOfTheDay.moodTitle")}
                  </AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} ml="$3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} ml="$3" />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Box>
            <Text fontWeight="bold" pb="$2">{taskConfig.title}</Text>
            <Text>{taskConfig.text}</Text>
          </Box>
          <Box pt="$4">
            {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.IMAGE && (
              <Box>
                <ImagePicker
                  edit={edit}
                  images={images}
                  setImages={setImages}
                />
                {!isEmpty(images) && edit && (
                  <Button onPress={onTaskSubmit}>
                    <ButtonText>
                      {t("screens.tasksOfTheDay.submitBtnText")}
                    </ButtonText>
                  </Button>
                )}
              </Box>
            )}
            {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT && edit ? (
              <Box>
                <Textarea width="100%">
                  <TextareaInput
                    onChangeText={setText}
                    value={text}
                    placeholder={t("screens.tasksOfTheDay.textareaPlaceholder")}
                  />
                </Textarea>
                <Button onPress={onTaskSubmit} mt="$2">
                  <ButtonText>
                    {t("screens.tasksOfTheDay.submitBtnText")}
                  </ButtonText>
                </Button>
              </Box>
            ) : (
              <Box>
                <Text>{text}</Text>
              </Box>
            )}
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
