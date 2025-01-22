import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppMenu } from "./components/app-menu";
import { RegisterScreen } from "./screens/register-screen";
import { LoadingScreen } from "./screens/loading-screen";
import { LoginScreen } from "./screens/login-screen";
import { HomeScreen } from "./screens/home-screen";
import { IntroScreen } from "./screens/intro-screen";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";
import { SCREENS } from "./constants/constants";
import DayOverviewScreen from "./screens/day-overview-screen";
import { useTranslation } from "react-i18next";
import "./i18n/i18n";
import { DaysProvider } from "./providers/day-config-provider";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#292524",
    background: "#ffffff",
    card: "#ffffff",
  },
};

const Stack = createStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer theme={MyTheme}>
        <DaysProvider>
          <Stack.Navigator>
            <Stack.Screen
              name={SCREENS.LOADING}
              component={LoadingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={SCREENS.INTRO}
              component={IntroScreen}
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
        </DaysProvider>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
