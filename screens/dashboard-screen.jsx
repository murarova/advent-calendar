import { useState, useLayoutEffect } from "react";
import { getUserPlans } from "../services/services";
import { EmptyScreen } from "../components/empty-screen";
import { Loader } from "../components/common";
import { useIsFocused } from "@react-navigation/native";
import { Alert, Dimensions } from "react-native";
import { Box, SafeAreaView, HStack, Text, VStack } from "@gluestack-ui/themed";
import CircularProgress from "react-native-circular-progress-indicator";
import { config } from "../config/gluestack-ui.config";
import { TASK_CONTEXT } from "../constants/constants";
import { DashboardContextSection } from "../components/dashboard-context-section";
import { ScrollView } from "@gluestack-ui/themed";

export function DashboardScreen() {
  const [contextData, setContextData] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  function calculateTotalData(taskData) {
    let totalTasks = 0;
    let doneTasks = 0;

    for (const context in taskData) {
      const tasks = taskData[context];
      totalTasks += tasks.length;
      doneTasks += tasks.filter((task) => task.isDone === true).length;
    }

    const donePercentage = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

    return {
      totalTasks,
      doneTasks,
      donePercentage: donePercentage.toFixed(0), // Format to 2 decimal places
    };
  }

  function calculateContextData(taskData) {
    const contextStats = {};

    for (const context in taskData) {
      const tasks = taskData[context];
      const totalTasks = tasks.length;
      const doneTasks = tasks.filter((task) => task.isDone === true).length;
      const donePercentage =
        totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

      contextStats[context] = {
        totalTasks,
        doneTasks,
        donePercentage: donePercentage.toFixed(0),
      };
    }

    return contextStats;
  }

  useLayoutEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      try {
        const plans = await getUserPlans();
        const totalData = calculateTotalData(plans);
        const contextData = calculateContextData(plans);
        setTotalData(totalData);
        setContextData(contextData);
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }
    if (isFocused) {
      getTasks();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loader />;
  }

  const isEmpty =
    !totalData ||
    (totalData.totalTasks === 0 &&
      totalData.doneTasks === 0 &&
      parseFloat(totalData.donePercentage) === 0);

  return (
    <>
      {!isEmpty ? (
        <SafeAreaView flex={1}>
          <HStack justifyContent="space-around" mt={20} pb="$4">
            <VStack justifyContent="center" alignItems="center">
              <Text
                size="xl"
                color={config.tokens.colors.warmGray900}
                fontWeight="bold"
              >
                {totalData.totalTasks}
              </Text>
              <Text color={config.tokens.colors.warmGray400}>Цілей</Text>
            </VStack>
            <CircularProgress
              value={totalData.donePercentage}
              progressValueColor={config.tokens.colors.warmGray800}
              activeStrokeColor={config.tokens.colors.progressGreen}
              inActiveStrokeColor={config.tokens.colors.warmGray400}
              inActiveStrokeOpacity={0.2}
              valueSuffix={"%"}
            />
            <VStack justifyContent="center" alignItems="center">
              <Text
                size="xl"
                color={config.tokens.colors.warmGray900}
                fontWeight="bold"
              >
                {totalData.doneTasks}
              </Text>
              <Text color={config.tokens.colors.warmGray400}>Виконано</Text>
            </VStack>
          </HStack>
          <ScrollView>
            <Box mt={20} flexWrap="wrap" flexDirection="row">
              {Object.values(TASK_CONTEXT).map((context) => {
                return (
                  contextData[context] && (
                    <Box key={context} width="50%">
                      <DashboardContextSection
                        context={context}
                        percentage={contextData[context].donePercentage}
                      />
                    </Box>
                  )
                );
              })}
            </Box>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <EmptyScreen />
      )}
    </>
  );
}
