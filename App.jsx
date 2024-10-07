import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import DayOverviewScreen from "./screens/day-overview-screen";
import { SCREENS } from "./constants/constants";
import "./i18n/i18n";
import { useTranslation } from "react-i18next";
import { AppMenu } from "./components/app-menu";
import { RegisterScreen } from "./screens/register-screen";
import { LoadingScreen } from "./screens/loading-screen";
import { LoginScreen } from "./screens/login-screen";
import { HomeScreen } from "./screens/home-screen";
import { config } from "./config/gluestack-ui.config";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#292524",
    background: "#ffffff",
    card: "#ffffff",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer theme={MyTheme}>
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
