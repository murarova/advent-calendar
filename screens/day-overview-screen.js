import { useLayoutEffect, useState } from "react";
import { Tasks } from "../components";
import { getDayTasks } from "../config/day-tasks-config";
import { Box, Text, Center } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { LANGUAGES } from "../constants/constants";

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
    dayTask: 0,
    moodTask: 0,
  });

  function getTotalGrade() {
    return Object.values(grade).reduce(
      (taskGrade, total) => taskGrade + total,
      0
    );
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
          <Tasks {...dayTasks} setGrade={setGrade} />
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
