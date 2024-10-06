import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  House,
  Compass,
  SquareChartGantt,
  Medal,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { SCREENS } from "../constants/constants";
import PeriodOverviewScreen from "./period-overview-screen";
import { AppMenu } from "../components";
import { SummaryScreen } from "./summary-screen";
import { PlansScreen } from "./plans-screen";

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
            <Compass color={focused ? "#fe434c" : "#999999"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
