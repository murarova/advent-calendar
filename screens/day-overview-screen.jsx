import { useEffect, useLayoutEffect, useState } from "react";
import { TasksList } from "../components";
import { getDayTasks } from "../config/day-tasks-config";
import { Box, Text, Center } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { LANGUAGES, TASK_TYPE } from "../constants/constants";

import {
  getCurrentUser,
  getUserDayTasks,
  saveTaskByType,
  saveUserTask,
} from "../services/services";
import { Alert } from "react-native";

function DayOverviewScreen({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const currentDay = route.params.currentDay;
  const day = moment(currentDay).format("DD");
  const month = moment(currentDay)
    .locale(LANGUAGES[i18n.resolvedLanguage].moment)
    .format("MMMM");
  const dayTasks = getDayTasks(day, i18n.resolvedLanguage);
  const currentUser = getCurrentUser();

  const [doneTask, setDoneTask] = useState(null);

  useEffect(() => {
    async function getDayTasks() {
      const doneTask = await getUserDayTasks(currentUser, day);
      if (doneTask) {
        setDoneTask(doneTask);
      }
    }
    getDayTasks();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${day} of ${month}`,
    });
  }, [currentDay, navigation, month]);

  const [grade, setGrade] = useState({
    day: 0,
    mood: 0,
  });

  function getTotalGrade() {
    return Object.values(grade).reduce(
      (taskGrade, total) => taskGrade + total,
      0
    );
  }

  const submitForCompletion = async ({ text, taskType, type }) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const sessionId = Date.now();
      const task = {
        text,
        date: sessionId,
      };
      try {
        saveUserTask({ type, task, currentUser, day });
        //TODO: do we need summary for mood tasks?
        if (taskType.type !== TASK_TYPE.MOOD) {
          saveTaskByType({ currentUser, taskType, task });
        }
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      }
    }
  };

  async function onTaskDataUpdate({ text, images, taskType, type }) {
    //TODO: save text or images to the DB. Once it set - change the grade
    if (text?.trim() || images) {
      await submitForCompletion({ text, taskType, type });
      setGrade((prevValue) => ({
        ...prevValue,
        [taskType]: 50,
      }));
    } else {
      setGrade((prevValue) => ({
        ...prevValue,
        [taskType]: 0,
      }));
    }
  }

  return (
    <Box p="$2" flex={1}>
      {dayTasks ? (
        <>
          <Box my="$2.5">
            <Text size="md" color="$red600">
              {t("screens.processText", { grade: getTotalGrade() })}
            </Text>
          </Box>
          <TasksList
            {...dayTasks}
            doneTask={doneTask}
            onTaskDataUpdate={onTaskDataUpdate}
          />
        </>
      ) : (
        <Center flex={1}>
          <Text fontSize="$xl">{t("screens.emptyScreen")}</Text>
        </Center>
      )}
    </Box>
  );
}

export default DayOverviewScreen;
