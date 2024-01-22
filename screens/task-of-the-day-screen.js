import { View, StyleSheet, Text } from "react-native";
import { ImagePicker } from "../components/image-picker";

function TasksOfTheDay({ route }) {
  const { dayText, pickImage } = route.params.dayTasksConfig;

  return (
    <View style={styles.container}>
      <Text>{dayText}</Text>
      {pickImage && (
        <View style={styles.imagePickerContainer}>
          <ImagePicker />
        </View>
      )}
    </View>
  );
}

export default TasksOfTheDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imagePickerContainer: {
    marginVertical: 10
  }
});
