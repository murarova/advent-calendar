import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  House,
  // Compass,
  // Medal,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { SCREENS } from "../constants/constants";
import PeriodOverviewScreen from "./period-overview-screen";
import { AppMenu } from "../components/app-menu";
import { SummaryScreen } from "./summary-screen";
import { PlansScreen } from "./plans-screen";
import Medal from "../assets/svg/medal";
import Compas from "../assets/svg/compas";
import Album from "../assets/svg/album";
import { AlbumScreen } from "./album-screen";

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: AppMenu,
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        tabBarActiveTintColor: "#fe434c",
        tabBarInactiveTintColor: "#999999",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <House color={focused ? "#fe434c" : "#999999"} />
          ),
          title: t("screens.periodOverview.title"),
          tabBarLabel: t("common.home"),
        }}
        name={SCREENS.PERIOD_OVERVIEW}
        component={PeriodOverviewScreen}
      />
      <Tab.Screen
        name={SCREENS.SUMMARY}
        component={SummaryScreen}
        options={{
          title: t("common.summary"),
          tabBarLabel: t("common.summary"),
          tabBarIcon: ({ focused }) => (
            <Medal color={focused ? "#fe434c" : "#999999"} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.PLANS}
        component={PlansScreen}
        options={{
          tabBarLabel: t("common.plans"),
          title: t("common.plans"),
          tabBarIcon: ({ focused }) => (
            <Compas color={focused ? "#fe434c" : "#999999"} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.ALBUM}
        component={AlbumScreen}
        options={{
          tabBarLabel: t("common.album"),
          title: t("common.album"),
          tabBarIcon: ({ focused }) => (
            <Album color={focused ? "#fe434c" : "#999999"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
