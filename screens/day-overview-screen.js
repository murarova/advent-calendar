import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.gradeContainer}>
        <Text style={styles.gradeText}>
          Ти виконав: {getTotalGrade()}% завдань
        </Text>
      </View>
      <Tasks {...config} setGrade={setGrade} />
    </View>
  );
}

export default DayOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gradeContainer: {
    paddingVertical: 10,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
