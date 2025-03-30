import { useState, useLayoutEffect } from "react";
import { getUserGlobalGoal, getUserPlans } from "../services/services";
import { EmptyScreen } from "../components/empty-screen";
import { Loader } from "../components/common";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";
import { PlansContextView } from "../components/plans-view/plans-context-view";
import { usePlansScreen } from "../components/plans-view/hooks/usePlansScreen";
import SwitchSelector from "react-native-switch-selector";
import { Box, Center, Heading, Text } from "@gluestack-ui/themed";
import { PlansMonthView } from "../components/plans-view/plans-month-view";
import { PlansViewOptions } from "../constants/constants";
import { PlansCollection, TextData } from "../types/types";

export function PlansScreen() {
  const [plans, setPlans] = useState<PlansCollection | null>(null);
  const [globalGoal, setGlobalGoal] = useState<TextData | null>(null);
  const [view, setView] = useState<PlansViewOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      try {
        const plans = await getUserPlans();
        const goal = await getUserGlobalGoal();
        setGlobalGoal(goal);
        setPlans(plans);
        setView(PlansViewOptions.context);
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

  const {
    handleUpdatePlan,
    handleEditPlan,
    handleDeletePlan,
    handleComplitePlan,
    openMonthSelect,
    handleMonthSelect,
    showModal,
    showMonthModal,
    updatedData,
    setShowModal,
    setShowMonthModal,
  } = usePlansScreen({ plans, setPlans });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {plans || globalGoal ? (
        <>
          {plans && (
            <Box mt="$4" ml="$2" mr="$2">
              <SwitchSelector
                initial={0}
                onPress={setView}
                textColor="#000"
                selectedColor="#000"
                buttonColor="#fff"
                borderColor="#EBEBEB"
                backgroundColor="#EBEBEB"
                hasPadding
                height={32}
                borderRadius={7}
                options={[
                  { label: "По сферах", value: PlansViewOptions.context },
                  { label: "По місяцях", value: PlansViewOptions.month },
                ]}
                testID="gender-switch-selector"
                accessibilityLabel="gender-switch-selector"
              />
            </Box>
          )}

          {globalGoal && (
            <Center pt="$5" pb="$5">
              <Text pb="$5">Моя глобальна мета 2025:</Text>
              <Heading textAlign="center" size="sm">
                {globalGoal.text}
              </Heading>
            </Center>
          )}

          {plans && view === PlansViewOptions.context ? (
            <PlansContextView
              plans={plans!}
              handleMonthSelect={handleMonthSelect}
              openMonthSelect={openMonthSelect}
              handleEditPlan={handleEditPlan}
              handleDeletePlan={handleDeletePlan}
              handleComplitePlan={handleComplitePlan}
              showModal={showModal}
              updatedData={updatedData}
              setShowModal={setShowModal}
              handleUpdatePlan={handleUpdatePlan}
              showMonthModal={showMonthModal}
              setShowMonthModal={setShowMonthModal}
            />
          ) : (
            <PlansMonthView
              plans={plans!}
              handleMonthSelect={handleMonthSelect}
              openMonthSelect={openMonthSelect}
              handleEditPlan={handleEditPlan}
              handleDeletePlan={handleDeletePlan}
              handleComplitePlan={handleComplitePlan}
              showModal={showModal}
              updatedData={updatedData}
              setShowModal={setShowModal}
              handleUpdatePlan={handleUpdatePlan}
              showMonthModal={showMonthModal}
              setShowMonthModal={setShowMonthModal}
            />
          )}
        </>
      ) : (
        <EmptyScreen />
      )}
    </>
  );
}
