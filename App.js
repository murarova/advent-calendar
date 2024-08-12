import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import PeriodOverviewScreen from "./screens/period-overview-screen";
import DayOverviewScreen from "./screens/day-overview-screen";
import { SCREENS } from "./constants/constants";
import "./i18n/i18n";
import { useTranslation } from "react-i18next";
import { LanguageMenu } from "./components/common";
import { AppMenu } from "./components";
import { Register } from "./screens/register";

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: config.tokens.colors.primary0 },
            headerTintColor: config.tokens.colors.primary600,
            contentStyle: { backgroundColor: config.tokens.colors.primary0 },
          }}
        >
          <Stack.Screen
            name={SCREENS.PERIOD_OVERVIEW}
            component={PeriodOverviewScreen}
            options={{
              title: t("screens.periodOverview.title"),
              headerRight: AppMenu,
            }}
          />
          <Stack.Screen
            name={SCREENS.DAY_OVERVIEW}
            component={DayOverviewScreen}
            options={{
              headerBackTitle: t("common.back"),
              headerRight: AppMenu,
            }}
          />
          <Stack.Screen
            name={SCREENS.REGISTER}
            component={Register}
            options={{
              headerRight: AppMenu,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
