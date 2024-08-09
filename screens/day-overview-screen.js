import { useLayoutEffect, useState } from "react";
import { TasksList } from "../components";
import { getDayTasks } from "../config/day-tasks-config";
import { Box, Text, Center } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { LANGUAGES, TASK_OUTPUT_TYPE, TASK_TYPE } from "../constants/constants";

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

  console.log("grade", grade);

  function getTotalGrade() {
    return Object.values(grade).reduce(
      (taskGrade, total) => taskGrade + total,
      0
    );
  }

  function onTaskDataUpdate({ text, images, taskOutputType, taskType }) {
    //TODO: save text or images to the DB. Once it set - change the grade
    if (text?.trim() || images) {
      setGrade((prevValue) => ({
        ...prevValue,
        [taskType]: 30,
      }));
    } else {
      setGrade((prevValue) => ({
        ...prevValue,
        [taskType]: 0,
      }));
    }
  }

  return (
    <Box p="$2" flex="1">
      {dayTasks ? (
        <>
          <Box my="$2.5">
            <Text size="md" color="$red600">
              {t("screens.processText", { grade: getTotalGrade() })}
            </Text>
          </Box>
          <TasksList {...dayTasks} onTaskDataUpdate={onTaskDataUpdate} />
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
