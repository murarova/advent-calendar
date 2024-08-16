import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import { YoutubePlayer } from "./common";
import { TaskItem } from "./task-item";

export function TasksList({
  videoText,
  videoId,
  dayTaskConfig,
  moodTaskConfig,
  onTaskDataUpdate,
}) {
  return (
    <ScrollView>
      <Box pb={60}>
        {videoText && <Text pb="$4">{videoText}</Text>}
        {videoId && <YoutubePlayer videoId={videoId} />}

        {dayTaskConfig && (
          <TaskItem
            taskConfig={dayTaskConfig}
            onTaskDataUpdate={onTaskDataUpdate}
          />
        )}
        {moodTaskConfig && (
          <TaskItem
            taskConfig={moodTaskConfig}
            onTaskDataUpdate={onTaskDataUpdate}
          />
        )}
      </Box>
    </ScrollView>
  );
}
