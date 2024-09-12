import { useEffect, useLayoutEffect, useState } from "react";
import { TasksList } from "../components";
import { getDayTasks } from "../config/day-tasks-config";
import { Box, Text, Center } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { LANGUAGES, TASK_CONTEXT } from "../constants/constants";

import {
  getUserDayTasks,
  getUserPlans,
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

  const saveTaskData = async ({ text, category, context, type }) => {
    const sessionId = Date.now();
    const task = {
      text,
      date: sessionId,
    };
    try {
      saveUserTask({ type, task, day, category });

      //TODO: do we need summary for mood tasks?
      if (category !== TASK_CONTEXT.MOOD) {
        saveTaskByType({ category, task, context });
      }
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    }
  };

  async function onTaskDataUpdate({ text, images, category, context, type }) {
    //TODO: save text or images to the DB. Once it set - change the grade
    if (text?.trim() || images) {
      await saveTaskData({ text, category, context, type });
      setGrade((prevValue) => ({
        ...prevValue,
        [category]: 50,
      }));
    } else {
      setGrade((prevValue) => ({
        ...prevValue,
        [category]: 0,
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
          <TasksList {...dayTasks} day={day} onTaskDataUpdate={onTaskDataUpdate} />
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
