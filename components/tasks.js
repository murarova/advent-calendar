import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/constants";
import {
  Box,
  Text,
  ScrollView,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Checkbox,
  CheckIcon,
  Divider,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { YoutubePlayer } from "./common";
import { TasksOfTheDay } from "./task-of-the-day";

export function Tasks({
  videoText,
  videoId,
  dayTaskConfig,
  moodTaskConfig,
  setGrade,
}) {
  const { t } = useTranslation();

  return (
    <Box safeArea flex={1}>
      <ScrollView>
        <Box>
          {videoText && <Text pb="$4">{videoText}</Text>}
          {videoId && <YoutubePlayer videoId={videoId} />}

          {dayTaskConfig && <TasksOfTheDay dayTaskConfig={dayTaskConfig} />}
          <Divider />
          {moodTaskConfig && <TasksOfTheDay dayTaskConfig={moodTaskConfig} />}
        </Box>
      </ScrollView>
    </Box>
  );
}
