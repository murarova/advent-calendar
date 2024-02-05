import { FlatList } from "react-native";
import { DayIcon } from "../components";
import moment from "moment";
import { useMemo } from "react";
import { enumerateDaysBetweenDates } from "../utils/utils";
import { END_DAY, SCREENS, START_DAY } from "../constants/constants";
import { Box } from "@gluestack-ui/themed";

function PeriodOverviewScreen({ navigation }) {
  const days = useMemo(() => {
    return enumerateDaysBetweenDates(START_DAY, END_DAY);
  }, [START_DAY, END_DAY]);

  function renderDayItem(itemData) {
    function pressHandler() {
      navigation.navigate(SCREENS.DAY_OVERVIEW, {
        currentDay: moment(itemData.item).format("YYYY-MM-DD"),
      });
    }

    return <DayIcon date={itemData.item} onPress={pressHandler} />;
  }

  return (
    <Box p="$2">
      <FlatList data={days} renderItem={renderDayItem} numColumns={3} />
    </Box>
  );
}

export default PeriodOverviewScreen;
