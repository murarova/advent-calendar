import { useMemo } from "react";
import { enumerateDaysBetweenDates } from "../utils/utils";
import { END_DAY, SCREENS, START_DAY } from "../constants/constants";
import { Box, SafeAreaView } from "@gluestack-ui/themed";
import moment from "moment";
import { Calendar } from "../components/calendar";

function PeriodOverviewScreen({ navigation }) {
  const currentDate = moment();

  const days = useMemo(() => {
    return enumerateDaysBetweenDates(START_DAY, END_DAY);
  }, [START_DAY, END_DAY]);

  function pressHandler({ dateString }) {
    navigation.navigate(SCREENS.DAY_OVERVIEW, {
      currentDay: dateString,
    });
  }

  return (
    <SafeAreaView flex={1}>
      <Box mt={10}>
        <Calendar
          pressHandler={pressHandler}
          currentDate={currentDate}
          days={days}
        />
      </Box>
    </SafeAreaView>
  );
}

export default PeriodOverviewScreen;
