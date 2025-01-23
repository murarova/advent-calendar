import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import { YoutubePlayer } from "./common";
import { TaskItem } from "./task-item";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function TasksList({
  videoText,
  videoId,
  dayTaskConfig,
  moodTaskConfig,
  currentDay,
}) {
  return (
    <KeyboardAwareScrollView extraScrollHeight={160}>
      <ScrollView>
        <Box pb={30}>
          {videoText && <Text pb="$4">{videoText}</Text>}
          {videoId && <YoutubePlayer videoId={videoId} />}

          {dayTaskConfig && (
            <TaskItem currentDay={currentDay} taskConfig={dayTaskConfig} />
          )}
          {moodTaskConfig && (
            <TaskItem currentDay={currentDay} taskConfig={moodTaskConfig} />
          )}
        </Box>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
