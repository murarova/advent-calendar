import { SCREENS } from "../constants/constants";
import { Box, SafeAreaView } from "@gluestack-ui/themed";
import { Calendar } from "../components/calendar";
import { Loader } from "../components/common";

import { useDaysConfiguration } from "../providers/day-config-provider";

function PeriodOverviewScreen({ navigation }) {
  const { isLoading } = useDaysConfiguration();

  function pressHandler({ dateString }) {
    navigation.navigate(SCREENS.DAY_OVERVIEW, {
      currentDay: dateString,
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView flex={1}>
      <Box mt={10}>
        <Calendar pressHandler={pressHandler} />
      </Box>
    </SafeAreaView>
  );
}

export default PeriodOverviewScreen;
