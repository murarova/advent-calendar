import { useEffect, useMemo, useRef, useState } from "react";
import { enumerateDaysBetweenDates } from "../utils/utils";
import { END_DAY, SCREENS, START_DAY } from "../constants/constants";
import { Box, SafeAreaView } from "@gluestack-ui/themed";
import moment from "moment";
import { Calendar } from "../components/calendar";
import { AppState } from "react-native";

function PeriodOverviewScreen({ navigation }) {
  const appState = useRef(AppState.currentState);
  const [currentDate, setCurrentDay] = useState(moment());

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setCurrentDay(moment());
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
