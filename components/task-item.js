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
import { TASK_OUTPUT_TYPE } from "../constants/constants";

export function TaskItem({ taskConfig, onTaskDataUpdate }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  function onTaskSubmit() {
    onTaskDataUpdate({
      text,
      image,
      taskOutputType: taskConfig.taskOutputType,
      taskType: taskConfig.taskType,
    });
  }

  return (
    <Accordion size="md" my="$2" variant="filled" type="single">
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>{taskConfig.title}</AccordionTitleText>
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
            <Text>{taskConfig.text}</Text>
          </Box>
          <Box pt="$4">
            {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.IMAGE && (
              <Box>
                <ImagePicker image={image} setImage={setImage} />
                {image && (
                  <Button onPress={onTaskSubmit} mt="$4">
                    <ButtonText>
                      {t("screens.tasksOfTheDay.submitBtnText")}
                    </ButtonText>
                  </Button>
                )}
              </Box>
            )}
            {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT && (
              <Box>
                <Textarea width="100%">
                  <TextareaInput
                    onChangeText={setText}
                    value={text}
                    placeholder={t("screens.tasksOfTheDay.textareaPlaceholder")}
                  />
                </Textarea>
                <Button onPress={onTaskSubmit} mt="$4">
                  <ButtonText>
                    {t("screens.tasksOfTheDay.submitBtnText")}
                  </ButtonText>
                </Button>
              </Box>
            )}
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
