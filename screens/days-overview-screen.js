import { FlatList } from 'react-native';
import { DayIconItem } from '../components/day-icon-item';
import moment from "moment";
import { useMemo } from 'react';
import { enumerateDaysBetweenDates } from '../utils/utils';
import { END_DAY, START_DAY } from '../constants/constants';

function DaysOverviewScreen({ navigation }) {
  const days = useMemo(() => {
    return enumerateDaysBetweenDates(START_DAY, END_DAY)
  }, [ START_DAY, END_DAY ])

  function renderDayItem(itemData) {
    function pressHandler() {
      navigation.navigate('DayOverview', {
        currentDay: moment(itemData.item).format('YYYY-MM-DD'),
      });
    }

    return (
      <DayIconItem
        date={ itemData.item }
        onPress={ pressHandler }
      />
    );
  }

  return (
    <FlatList
      data={ days }
      renderItem={ renderDayItem }
      numColumns={ 3 }
    />
  );
}

export default DaysOverviewScreen;
