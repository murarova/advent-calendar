import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { ImagePicker } from "./image-picker";
import { YoutubePlayer } from "./youtube-player";

export function DayGoalsItem({
  videoText,
  videoId,
  dayTitle,
  dayText,
  dayMoodText,
  dayMoodTitle,
  pickImage,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {videoText && <Text style={styles.introduction}>{videoText}</Text>}
          {videoId && <YoutubePlayer videoId={videoId} />}

          {dayTitle && <Text style={styles.title}>{dayTitle}</Text>}
          {dayText && <Text style={styles.introduction}>{dayText}</Text>}

          {dayMoodTitle && <Text style={styles.title}>{dayMoodTitle}</Text>}
          {dayMoodText && (
            <Text style={styles.introduction}>{dayMoodText}</Text>
          )}
          {pickImage && <ImagePicker />}
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
