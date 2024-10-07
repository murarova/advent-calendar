import { useEffect, useLayoutEffect, useState } from "react";
import { TasksList } from "../components/tasks-list";
import { getDayTasks } from "../config/day-tasks-config";
import {
  Box,
  Text,
  Center,
  Progress,
  ProgressFilledTrack,
  HStack,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { LANGUAGES, TASK_CATEGORY } from "../constants/constants";
import { CompletedTaskModal } from "../components/completed-task-modal";
import {
  getComplited,
  removeComplited,
  setComplited,
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
  const [showComplitedModal, setShowComplitedModal] = useState(false);
  const [complitedTasks, setComplitedTasks] = useState(null);
  const [grade, setGrade] = useState({
    [TASK_CATEGORY.MOOD]: 0,
    [TASK_CATEGORY.SUMMARY]: 0,
    [TASK_CATEGORY.MONTH_PHOTO]: 0,
    [TASK_CATEGORY.PLANS]: 0,
  });

  const total = getTotalGrade();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${day} of ${month}`,
    });
  }, [currentDay, navigation, month]);

  useEffect(() => {
    async function getComplitedTasks() {
      try {
        const data = await getComplited();
        setComplitedTasks(data ?? []);
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      }
    }
    getComplitedTasks();
  }, []);

  useEffect(() => {
    if (Number(total) === 100 && complitedTasks) {
      const alreadyComplited = complitedTasks.find(
        (item) => Number(item) === Number(day)
      );
      if (!alreadyComplited) {
        setComplited({ day });
        setShowComplitedModal(true);
      }
    }
  }, [total, complitedTasks]);

  function getTotalGrade() {
    return Object.values(grade).reduce(
      (taskGrade, total) => taskGrade + total,
      0
    );
  }

  function updateGrade({ category, grade }) {
    setGrade((prevValue) => ({
      ...prevValue,
      [category]: grade,
    }));
  }

  async function removeGrade({ category }) {
    setGrade((prevValue) => ({
      ...prevValue,
      [category]: 0,
    }));
    removeComplited({ day });
  }

  return (
    <Box p="$2" flex={1}>
      {dayTasks ? (
        <>
          <Box my="$2.5">
            <HStack justifyContent="space-between">
              <Text size="md">{t("screens.processText")}</Text>
              <Text size="md">{total + "%"}</Text>
            </HStack>

            <Center my="$2.5" mb="$2.5">
              <Progress value={total} size="sm">
                <ProgressFilledTrack />
              </Progress>
            </Center>
          </Box>
          <TasksList
            {...dayTasks}
            day={day}
            updateGrade={updateGrade}
            removeGrade={removeGrade}
          />
        </>
      ) : (
        <Center flex={1}>
          <Text fontSize="$xl">{t("screens.emptyScreen")}</Text>
        </Center>
      )}
      {showComplitedModal && (
        <CompletedTaskModal setShowModal={setShowComplitedModal} />
      )}
    </Box>
  );
}

export default DayOverviewScreen;
