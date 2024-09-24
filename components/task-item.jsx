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
import {
  TASK_OUTPUT_TYPE,
  TASK_CONTEXT,
  TASK_CATEGORY,
} from "../constants/constants";

import {
  getUserDayTasks,
  saveTaskByCategory,
  saveUserTask,
} from "../services/services";
import { Plans } from "./plans";

export function TaskItem({ taskConfig, onTaskDataUpdate, day }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  // const [text, setText] = useState("");
  // const [images, setImages] = useState([]);
  // const [edit, setEdit] = useState(true);
  // const [task, setTask] = useState(null);

  // const type =
  //   taskConfig.category === TASK_CATEGORY.MOOD
  //     ? TASK_CATEGORY.MOOD
  //     : TASK_CATEGORY.DAY;

  useEffect(() => {
    async function getDayData() {
      const data = await getUserDayTasks(
        taskConfig.category,
        taskConfig.context
      );
      if (data) {
        setData(data);
      }
    }
    getDayData();
  }, []);

  // function onTaskSubmit() {
  //   if (taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT && text.trim()) {
  //     onTaskDataUpdate({
  //       text,
  //       taskOutputType: taskConfig.taskOutputType,
  //       type,
  //       category: taskConfig.category,
  //       context: taskConfig.context,
  //     });
  //     setEdit(false);
  //   }
  //   if (
  //     taskConfig.taskOutputType === TASK_OUTPUT_TYPE.IMAGE &&
  //     !isEmpty(images)
  //   ) {
  //     onTaskDataUpdate({
  //       images,
  //       taskOutputType: taskConfig.taskOutputType,
  //       type,
  //       category: taskConfig.category,
  //       context: taskConfig.context,
  //     });
  //     setEdit(false);
  //   }
  // }

  return (
    <>
      <Accordion
        size="md"
        my="$2"
        type="multiple"
        borderRadius="$lg"
        elevation="$0.5"
        shadowRadius="$1"
        shadowOpacity="$5"
      >
        <AccordionItem value="a" borderRadius="$lg">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      {taskConfig.category === TASK_CONTEXT.MOOD
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
              {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.LIST && (
                <Plans
                  context={taskConfig.context}
                  data={data}
                  setData={setData}
                />
              )}
              {/* {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.IMAGE && (
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
                ))} */}
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
