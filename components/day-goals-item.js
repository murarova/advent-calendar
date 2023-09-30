import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

function DayGoalsItem() {
  return (
    <View style={ styles.container }>
      <Text>This is your plan for today</Text>
    </View>
  );
}

export default DayGoalsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
