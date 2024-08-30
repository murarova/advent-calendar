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
  Heading,
  HStack,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { ImagePicker } from "./common";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { TASK_OUTPUT_TYPE, TASK_TYPE } from "../constants/constants";
import isEmpty from "lodash/isEmpty";
import { EditIcon, Trash2 } from "lucide-react-native";

export function TaskItem({ taskConfig, type, onTaskDataUpdate, doneTask }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (doneTask) {
      setText(doneTask?.text);
      setEdit(false);
    }
  }, [doneTask]);

  function onTaskSubmit() {
    if (taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT && text.trim()) {
      onTaskDataUpdate({
        text,
        taskOutputType: taskConfig.taskOutputType,
        type,
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
        type,
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
                    {type === TASK_TYPE.MOOD
                      ? t("screens.tasksOfTheDay.moodTitle")
                      : t("screens.tasksOfTheDay.dayTitle")}
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
            <Heading size="sm" pb="$2">
              {taskConfig.title}
            </Heading>
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
            {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT &&
              (edit ? (
                <Box>
                  <Textarea width="100%">
                    <TextareaInput
                      onChangeText={setText}
                      value={text}
                      placeholder={t(
                        "screens.tasksOfTheDay.textareaPlaceholder"
                      )}
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
                  <Heading size="sm" pb="$2">
                    {t("screens.tasksOfTheDay.taskResult")}
                  </Heading>
                  <Text>{text}</Text>
                  <HStack
                    space="md"
                    height={60}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Button borderRadius="$full" size="lg">
                      <ButtonIcon as={EditIcon} />
                    </Button>

                    <Button borderRadius="$full" size="lg">
                      <ButtonIcon as={Trash2} />
                    </Button>
                  </HStack>
                </Box>
              ))}
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
