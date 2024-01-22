import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors } from "./styles/colors";
import PeriodOverviewScreen from "./screens/period-overview-screen";
import DayOverviewScreen from "./screens/day-overview-screen";
import TasksOfTheDay from "./screens/task-of-the-day-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primaryColor },
            headerTintColor: colors.darkColor,
            contentStyle: { backgroundColor: colors.lightColor },
          }}
        >
          <Stack.Screen
            name="PeriodOverview"
            component={PeriodOverviewScreen}
            options={{
              title: "Your current path",
            }}
          />
          <Stack.Screen
            name="DayOverview"
            component={DayOverviewScreen}
            options={{
              title: "Goals for today",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="TasksOfTheDay"
            component={TasksOfTheDay}
            options={{
              title: "Task for today",
              headerBackTitle: "Back",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
