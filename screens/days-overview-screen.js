import { FlatList } from 'react-native';
import DayGoalsItem from '../components/day-item';
import moment from "moment";
import { useMemo } from 'react';
import { enumerateDaysBetweenDates } from '../utils/utils';
import { END_DAY, START_DAY } from '../constants/constants';

function DaysOverviewScreen({ navigation }) {
  const days = useMemo(() => {
    return enumerateDaysBetweenDates(START_DAY, END_DAY)
  }, [ START_DAY, END_DAY ])

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('DayOverview', {
        currentDay: moment(itemData.item).format('YYYY-MM-DD'),
      });
    }
    const day = moment(itemData.item).format('DD');
    const dayOfWeek = moment(itemData.item).format('dddd');

    return (
      <DayGoalsItem
        day={ day }
        dayOfWeek={ dayOfWeek }
        onPress={ pressHandler }
      />
    );
  }

  return (
    <FlatList
      data={ days }
      renderItem={ renderCategoryItem }
      numColumns={ 3 }
    />
  );
}

export default DaysOverviewScreen;
