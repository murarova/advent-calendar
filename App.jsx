import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, ButtonText, GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import PeriodOverviewScreen from "./screens/period-overview-screen";
import DayOverviewScreen from "./screens/day-overview-screen";
import { SCREENS } from "./constants/constants";
import "./i18n/i18n";
import { useTranslation } from "react-i18next";
import { AppMenu } from "./components";
import { RegisterScreen } from "./screens/register-screen";
import { LoadingScreen } from "./screens/loading-screen";
import { LoginScreen } from "./screens/login-screen";
import { HomeScreen } from "./screens/home-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={SCREENS.LOADING}
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SCREENS.LOGIN}
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SCREENS.REGISTER}
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SCREENS.HOME}
            component={HomeScreen}
            options={{
              headerShown: false,
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
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
