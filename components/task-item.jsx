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
import isEmpty from "lodash/isEmpty";
import { EditIcon, Trash2 } from "lucide-react-native";
import { AddPlanModal } from "./add-plan-modal";
import { ListItems } from "./list-items";
import {
  getUserDayTasks,
  saveTaskByType,
  saveUserTask,
} from "../services/services";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

export function TaskItem({ taskConfig, onTaskDataUpdate, day }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [plans, setPlans] = useState([]);
  const [images, setImages] = useState([]);
  const [edit, setEdit] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState(null);

  const type =
    taskConfig.category === TASK_CATEGORY.MOOD
      ? TASK_CATEGORY.MOOD
      : TASK_CATEGORY.DAY;

  useEffect(() => {
    async function getDayData() {
      const task = await getUserDayTasks(day);
      if (task) {
        setTask(task);
      }
    }
    getDayData();
  }, []);

  useEffect(() => {
    if (task) {
      if (!isEmpty(task?.day?.plans)) {
        setPlans(task?.day?.plans);
      }
      setText(task?.text);
      setEdit(false);
    }
  }, [task]);

  function onTaskSubmit() {
    if (taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT && text.trim()) {
      onTaskDataUpdate({
        text,
        taskOutputType: taskConfig.taskOutputType,
        type,
        category: taskConfig.category,
        context: taskConfig.context,
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
        category: taskConfig.category,
        context: taskConfig.context,
      });
      setEdit(false);
    }
  }

  async function handleAddPlan(text) {
    const id = uuid.v4();
    try {
      const updatedPlans = [
        ...plans,
        {
          id,
          text,
        },
      ];

      await saveTaskByType({
        category: taskConfig.category,
        task: updatedPlans,
        context: taskConfig.context,
      });
      await saveUserTask({
        type,
        task: updatedPlans,
        day,
        category: taskConfig.category,
      });

      setPlans(updatedPlans);
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    }
  }

  return (
    <>
      <Accordion size="md" my="$2" variant="filled" type="single">
        <AccordionItem value="a">
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
              {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.LIST && (
                <Box>
                  <Box alignItems="center">
                    <Button onPress={() => setShowModal(true)}>
                      <ButtonText>
                        {t("screens.tasksOfTheDay.addPlanItem")}
                      </ButtonText>
                    </Button>
                  </Box>
                  {!isEmpty(plans) && <ListItems plans={plans} />}
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
      {showModal && (
        <AddPlanModal
          setShowModal={setShowModal}
          handleAddPlan={handleAddPlan}
        />
      )}
    </>
  );
}
