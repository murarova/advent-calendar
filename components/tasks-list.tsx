import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import { YoutubePlayer } from "./common";
import { TaskItem } from "./task-item";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TaskConfig } from "../types/types";

interface TaskListProps {
  videoText: string;
  videoId: string;
  dayTaskConfig: TaskConfig;
  moodTaskConfig: TaskConfig;
  currentDay: string;
}

export function TasksList({
  videoText,
  videoId,
  dayTaskConfig,
  moodTaskConfig,
  currentDay,
}: TaskListProps) {
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
