import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DaysOverviewScreen from './screens/days-overview-screen.js';
import DayOverviewScreen from './screens/day-overview-screen';
import { colors } from './styles/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={ {
            headerStyle: { backgroundColor: colors.primaryColor },
            headerTintColor: colors.darkColor,
            contentStyle: { backgroundColor: colors.lightColor },
          } }
        >
          <Stack.Screen
            name="DaysOverview"
            component={ DaysOverviewScreen }
            options={ {
              title: 'Your current path',
            } }
          />
          <Stack.Screen
            name="DayOverview"
            component={ DayOverviewScreen }
            options={ {
              title: 'Goals for today',
              headerBackTitle: "Back"
            } }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
