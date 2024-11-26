import { Box, Text, ScrollView } from "@gluestack-ui/themed";
import { YoutubePlayer } from "./common";
import { TaskItem } from "./task-item";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    <KeyboardAwareScrollView extraScrollHeight={160}>
      <ScrollView>
        <Box>
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
    </KeyboardAwareScrollView>
  );
}
