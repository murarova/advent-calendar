import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from "moment";
import { DayGoalsItem } from '../components/day-goals-item';
import { getDayGoalsConfig } from '../config/dayGoalsConfig';

function DayOverviewScreen({ route, navigation }) {
  const currentDay = route.params.currentDay;
  const day = moment(currentDay).format('DD');
  const month = moment(currentDay).format('MMMM');

  const config = getDayGoalsConfig(day);

  useLayoutEffect(() => {

    navigation.setOptions({
      title: `${ day } of ${ month }`,
    });
  }, [ currentDay, navigation ]);

  return (
    <View style={ styles.container }>
      <DayGoalsItem {...config} />
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
