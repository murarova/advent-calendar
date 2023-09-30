import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from "moment";

import DayGoalsItem from '../components/day-goals-item';

function DayOverviewScreen({ route, navigation }) {
  const currentDay = route.params.currentDay;

  useLayoutEffect(() => {
    const day = moment(currentDay).format('DD');
    const month = moment(currentDay).format('MMMM');

    navigation.setOptions({
      title: `Today ${ day } of ${ month }`,
    });
  }, [ currentDay, navigation ]);

  return (
    <View style={ styles.container }>
      <DayGoalsItem />
    </View>
  );
}

export default DayOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
