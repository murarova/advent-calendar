import { ImagePicker } from "../components/common";
import { Box, Text } from "@gluestack-ui/themed";

function TasksOfTheDay({ route }) {
  const { dayText, pickImage } = route.params.dayTaskConfig;

  return (
    <Box flex={1} p="$4">
      <Text>{dayText}</Text>

      {pickImage && (
        <Box my="$4">
          <ImagePicker />
        </Box>
      )}
    </Box>
  );
}

export default TasksOfTheDay;
