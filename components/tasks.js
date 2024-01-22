import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
} from "react-native";
import { YoutubePlayer } from "./youtube-player";
import { colors } from "../styles/colors";
import { useNavigation } from '@react-navigation/native';

export function Tasks({
  videoText,
  videoId,
  dayTitle,
  dayText,
  dayTasksConfig,
  dayMoodText,
  dayMoodTitle,
}) {
  const navigation = useNavigation();

  function handlePress() {
    navigation.navigate("TasksOfTheDay", {
      dayTasksConfig,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {videoText && <Text style={styles.introduction}>{videoText}</Text>}
          {videoId && <YoutubePlayer videoId={videoId} />}

          <View style={styles.sectionContainer}>
            {dayTitle && <Text style={styles.title}>{dayTitle}</Text>}
            {dayText && <Text style={styles.introduction}>{dayText}</Text>}
            <View style={styles.sectionButton}>
              <Button onPress={handlePress} title="Just do it" />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            {dayMoodTitle && <Text style={styles.title}>{dayMoodTitle}</Text>}
            {dayMoodText && (
              <Text style={styles.introduction}>{dayMoodText}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  sectionContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.accentColor,
    marginBottom: 20,
  },
  sectionButton: {
    flexDirection: "row",
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
});
