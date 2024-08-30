import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, NotebookTabs, SquareChartGantt } from "lucide-react-native";
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
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => <House />,
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
          tabBarIcon: () => <NotebookTabs />,
        }}
      />
      <Tab.Screen
        name={SCREENS.PLANS}
        component={PlansScreen}
        options={{
          tabBarLabel: t("common.plans"),
          title: t("common.plans"),
          tabBarIcon: () => <SquareChartGantt />,
        }}
      />
    </Tab.Navigator>
  );
};
