import { useState } from "react";
import { YoutubePlayer } from "./youtube-player";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/constants";
import {
  Box,
  Text,
  Button,
  ScrollView,
  ButtonText,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Checkbox,
  CheckIcon,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

export function Tasks({
  videoText,
  videoId,
  dayTitle,
  dayText,
  dayTaskConfig,
  moodTaskConfig,
  setGrade,
}) {
  const [isMoodTaskDone, setIsMoodTaskDone] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleDayMoodTaskProgress = (value) => {
    const moodTaskGrade = value ? moodTaskConfig.grade : 0;
    setIsMoodTaskDone(value);
    setGrade((grade) => ({ ...grade, moodTask: moodTaskGrade }));
  };

  function handleDayTaskBtnPress() {
    navigation.navigate(SCREENS.TASKS_OF_THE_DAY, {
      dayTaskConfig,
    });
  }

  return (
    <Box safeArea flex={1}>
      <ScrollView>
        <Box>
          {videoText && <Text pb="$4">{videoText}</Text>}
          {videoId && <YoutubePlayer videoId={videoId} />}

          <Box p="$4" bg="$yellow100" rounded="$md" mb="$3">
            {dayTitle && (
              <Text py="$2" bold>
                {dayTitle}
              </Text>
            )}
            {dayText && <Text pb="$4">{dayText}</Text>}
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button onPress={handleDayTaskBtnPress}>
                <ButtonText>Just do it</ButtonText>
              </Button>
            </Box>
          </Box>

          {moodTaskConfig && (
            <Box p="$4" bg="$yellow100" rounded="$md" mb="$3">
              {moodTaskConfig.dayTitle && (
                <Text py="$2" bold>
                  {moodTaskConfig.dayTitle}
                </Text>
              )}
              <Text pb="$4">{moodTaskConfig.dayText}</Text>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Checkbox
                  value={isMoodTaskDone}
                  onChange={handleDayMoodTaskProgress}
                  size="lg"
                  aria-label={t("common.done")}
                >
                  <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel color="$primary500">
                    {t("common.done")}
                  </CheckboxLabel>
                </Checkbox>
              </Box>
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
