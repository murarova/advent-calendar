import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import { YoutubePlayer } from "./common";
import { TaskItem } from "./task-item";

export function TasksList({
  videoText,
  videoId,
  dayTaskConfig,
  moodTaskConfig,
  updateGrade,
  removeGrade,
  day,
}) {
  return (
    <ScrollView>
      <Box pb={60}>
        {videoText && <Text pb="$4">{videoText}</Text>}
        {videoId && <YoutubePlayer videoId={videoId} />}

        {dayTaskConfig && (
          <TaskItem
            taskConfig={dayTaskConfig}
            updateGrade={updateGrade}
            removeGrade={removeGrade}
          />
        )}
        {moodTaskConfig && (
          <TaskItem
            day={day}
            taskConfig={moodTaskConfig}
            updateGrade={updateGrade}
            removeGrade={removeGrade}
          />
        )}
      </Box>
    </ScrollView>
  );
}
