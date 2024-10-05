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
  Heading,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  TASK_OUTPUT_TYPE,
  TASK_CONTEXT,
  TASK_CATEGORY,
} from "../constants/constants";

import { getUserDayTasks } from "../services/services";
import { Plans } from "./day-tasks/plans/plans";
import { Summary } from "./day-tasks/summary/summary";
import { MonthPhoto } from "./day-tasks/month-photo/month-photo";
import { Alert } from "react-native";
import { MoodTask } from "./day-tasks/mood/mood-task";

export function TaskItem({ taskConfig, updateGrade, removeGrade }) {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getDayData() {
      try {
        const data = await getUserDayTasks(
          taskConfig.category,
          taskConfig.context
        );
        if (data) {
          setData(data);
        }
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      }
    }
    getDayData();
  }, []);

  useEffect(() => {
    if (data) {
      updateGrade({
        category: taskConfig.category,
        grade: taskConfig.grade,
      });
    }
  }, [data]);

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
                      {taskConfig.category === TASK_CATEGORY.MOOD
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
                  removeGrade={removeGrade}
                />
              )}
              {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.TEXT &&
                taskConfig.category === TASK_CATEGORY.SUMMARY && (
                  <Summary
                    context={taskConfig.context}
                    data={data}
                    setData={setData}
                    removeGrade={removeGrade}
                  />
                )}
              {taskConfig.taskOutputType === TASK_OUTPUT_TYPE.IMAGE && (
                <MonthPhoto
                  data={data}
                  setData={setData}
                  context={taskConfig.context}
                  removeGrade={removeGrade}
                />
              )}
              {taskConfig.category === TASK_CATEGORY.MOOD && (
                <MoodTask
                  data={data}
                  setData={setData}
                  removeGrade={removeGrade}
                />
              )}
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}