import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import { YoutubePlayer } from "./common";
import { TaskItem } from "./task-item";

export function TasksList({
  videoText,
  videoId,
  dayTaskConfig,
  moodTaskConfig,
  onTaskDataUpdate,
  doneTask,
}) {
  return (
    <ScrollView>
      <Box pb={60}>
        {videoText && <Text pb="$4">{videoText}</Text>}
        {videoId && <YoutubePlayer videoId={videoId} />}

        {dayTaskConfig && (
          <TaskItem
            doneTask={doneTask?.day}
            taskConfig={dayTaskConfig}
            type="day"
            onTaskDataUpdate={onTaskDataUpdate}
          />
        )}
        {moodTaskConfig && (
          <TaskItem
            doneTask={doneTask?.mood}
            taskConfig={moodTaskConfig}
            type="mood"
            onTaskDataUpdate={onTaskDataUpdate}
          />
        )}
      </Box>
    </ScrollView>
  );
}
