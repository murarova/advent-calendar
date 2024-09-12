import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import { YoutubePlayer } from "./common";
import { TaskItem } from "./task-item";

export function TasksList({
  videoText,
  videoId,
  dayTaskConfig,
  moodTaskConfig,
  onTaskDataUpdate,
  day,
}) {
  return (
    <ScrollView>
      <Box pb={60}>
        {videoText && <Text pb="$4">{videoText}</Text>}
        {videoId && <YoutubePlayer videoId={videoId} />}

        {dayTaskConfig && (
          <TaskItem
            day={day}
            taskConfig={dayTaskConfig}
            onTaskDataUpdate={onTaskDataUpdate}
          />
        )}
        {moodTaskConfig && (
          <TaskItem
            day={day}
            taskConfig={moodTaskConfig}
            onTaskDataUpdate={onTaskDataUpdate}
          />
        )}
      </Box>
    </ScrollView>
  );
}
