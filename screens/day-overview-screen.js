import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { Tasks } from "../components/tasks";
import { getDayTasks } from "../config/day-tasks-config";

function DayOverviewScreen({ route, navigation }) {
  const currentDay = route.params.currentDay;
  const day = moment(currentDay).format("DD");
  const month = moment(currentDay).format("MMMM");

  const config = getDayTasks(day);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${day} of ${month}`,
    });
  }, [currentDay, navigation]);

  return (
    <View style={styles.container}>
      <Tasks {...config} />
    </View>
  );
}

export default DayOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
