import { useEffect, useLayoutEffect, useState } from "react";
import { TasksList } from "../components/tasks-list";
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
import { LANGUAGES, TASK_CATEGORY, YEAR } from "../constants/constants";
import { CompletedTaskModal } from "../components/modals/completed-task-modal";
import {
  getComplited,
  getConfiguration,
  removeComplited,
  setComplited,
} from "../services/services";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getProgressColorByValue } from "../utils/utils";
import { Loader } from "../components/common";

function DayOverviewScreen({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const [dayTasks, setDayTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentDay = route.params.currentDay;
  const day = moment(currentDay).format("DD");
  // const month = moment(currentDay)
  //   .locale(LANGUAGES[i18n.resolvedLanguage].moment)
  //   .format("MMMM");

  useEffect(() => {
    setIsLoading(true);
    getConfiguration(YEAR, day, i18n.resolvedLanguage)
      .then((config) => {
        setDayTasks(config);
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  // const dayTasks = getDayTasks(day, i18n.resolvedLanguage);
  const [showComplitedModal, setShowComplitedModal] = useState(false);
  const [complitedTasks, setComplitedTasks] = useState(null);
  const [grade, setGrade] = useState({
    [TASK_CATEGORY.MOOD]: 0,
    [TASK_CATEGORY.SUMMARY]: 0,
    [TASK_CATEGORY.MONTH_PHOTO]: 0,
    [TASK_CATEGORY.PLANS]: 0,
  });
  const isFocused = useIsFocused();
  const total = getTotalGrade();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: moment(currentDay).format("DD.MM.YYYY"),
    });
  }, [currentDay, navigation]);

  useEffect(() => {
    async function getComplitedTasks() {
      try {
        const data = await getComplited();
        setComplitedTasks(data ?? []);
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      }
    }
    if (isFocused) {
      getComplitedTasks();
    }
  }, [isFocused]);

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
    const updatedComplited = complitedTasks.filter((item) => item !== day);
    setComplitedTasks(updatedComplited);
    removeComplited({ day });
  }

  if (isLoading) {
    return <Loader />;
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
                <ProgressFilledTrack bg={getProgressColorByValue(total)} />
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
          <Text fontSize="$xl">{t("common.empty")}</Text>
        </Center>
      )}
      {showComplitedModal && (
        <CompletedTaskModal setShowModal={setShowComplitedModal} />
      )}
    </Box>
  );
}

export default DayOverviewScreen;
