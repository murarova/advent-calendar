import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import { colors } from "./styles/colors";
import PeriodOverviewScreen from "./screens/period-overview-screen";
import DayOverviewScreen from "./screens/day-overview-screen";
import TasksOfTheDay from "./screens/task-of-the-day-screen";
import { SCREENS } from "./constants/constants";
import "./i18n/i18n";
import { useTranslation } from "react-i18next";
import { LanguageMenu } from "./components";

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: config.tokens.colors.green200 },
            headerTintColor: config.tokens.colors.primary600,
            contentStyle: { backgroundColor: colors.lightColor },
          }}
        >
          <Stack.Screen
            name="PeriodOverview"
            component={PeriodOverviewScreen}
            options={{
              title: t("screens.periodOverview.title"),
              headerRight: LanguageMenu,
            }}
          />
          <Stack.Screen
            name={SCREENS.DAY_OVERVIEW}
            component={DayOverviewScreen}
            options={{
              headerBackTitle: t("common.back"),
              headerRight: LanguageMenu,
            }}
          />
          <Stack.Screen
            name={SCREENS.TASKS_OF_THE_DAY}
            component={TasksOfTheDay}
            options={{
              title: t("screens.tasksOfTheDay.title"),
              headerBackTitle: t("common.back"),
              headerRight: LanguageMenu,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
