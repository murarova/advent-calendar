import { useLayoutEffect, useState } from "react";
import moment from "moment";
import { Tasks } from "../components";
import { getDayTasks } from "../config/day-tasks-config";
import { Box, Text, Center } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

function DayOverviewScreen({ route, navigation }) {
  const currentDay = route.params.currentDay;
  const day = moment(currentDay).format("DD");
  const month = moment(currentDay).format("MMMM");
  const config = getDayTasks(day);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${day} of ${month}`,
    });
  }, [currentDay, navigation]);

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
    <Box bg="$primary100" p="$2" flex="1">
      {config ? (
        <>
          <Box my="$2.5">
            <Text size="md" color="$red600">
              Ти виконав: {getTotalGrade()}% завдань
            </Text>
          </Box>
          <Tasks {...config} setGrade={setGrade} />
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
