import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  Switch,
} from "react-native";
import { useState } from "react";
import { YoutubePlayer } from "./youtube-player";
import { colors } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

export function Tasks({
  videoText,
  videoId,
  dayTitle,
  dayText,
  dayTaskConfig,
  moodTaskConfig,
  setGrade,
}) {
  const [isMoodTaskDone, setIsMoodTaskDone] = useState(false);

  const handleDayMoodSwitch = (value) => {
    const moodTaskGrade = value ? moodTaskConfig.grade : 0;
    setIsMoodTaskDone(value);
    setGrade((grade) => ({ ...grade, moodTask: moodTaskGrade }));
  };
  const navigation = useNavigation();

  function handleDayTaskBtnPress() {
    navigation.navigate("TasksOfTheDay", {
      dayTaskConfig,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {videoText && <Text style={styles.introduction}>{videoText}</Text>}
          {videoId && <YoutubePlayer videoId={videoId} />}

          <View style={styles.sectionContainer}>
            {dayTitle && <Text style={styles.title}>{dayTitle}</Text>}
            {dayText && <Text style={styles.introduction}>{dayText}</Text>}
            <View style={styles.sectionButton}>
              <Button onPress={handleDayTaskBtnPress} title="Just do it" />
            </View>
          </View>

          {moodTaskConfig && (
            <View style={styles.sectionContainer}>
              {moodTaskConfig.dayTitle && (
                <Text style={styles.title}>{moodTaskConfig.dayTitle}</Text>
              )}
              <Text style={styles.introduction}>{moodTaskConfig.dayText}</Text>
              <View style={styles.sectionButton}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isMoodTaskDone ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleDayMoodSwitch}
                  value={isMoodTaskDone}
                />
                <Text style={styles.dayMoodGrade}>Виконано</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 10,
  },
  sectionContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.accentColor,
    marginBottom: 20,
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    paddingBottom: 15,
  },
  introduction: {
    fontSize: 16,
    paddingBottom: 15,
  },
  dayMoodGrade: {
    paddingLeft: 5,
  },
});
