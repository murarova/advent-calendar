import { useState, useLayoutEffect, useCallback } from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  ChevronUpIcon,
  ChevronDownIcon,
  Heading,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { getUserPlans, saveTaskByCategory } from "../services/services";
import { EmptyScreen } from "../components/empty-screen";
import {
  LANGUAGES,
  SCREENS,
  TASK_CATEGORY,
  TASK_CONTEXT,
} from "../constants/constants";
import { Loader } from "../components/common";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";
import { PlansList } from "../components/day-tasks/plans/plans-list";
import { AddPlanModal } from "../components/day-tasks/plans/add-plan-modal";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import { useNavigation } from "@react-navigation/native";
import { MonthSelectModal } from "../components/month-select-modal";

export function PlansScreen() {
  const { t } = useTranslation();
  const [plans, setPlans] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [updatedData, setUpdatedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [context, setContext] = useState(null);

  useLayoutEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      try {
        const plans = await getUserPlans();
        setPlans(plans);
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

  function updatePlan(updatedPlans) {
    try {
      saveTaskByCategory({
        category: TASK_CATEGORY.PLANS,
        data: updatedPlans,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setPlans((prevPlans) => ({
        ...prevPlans,
        [context]: updatedPlans,
      }));
      setUpdatedData(null);
      setContext(null);
    }
  }

  function handleUpdatePlan(id, text) {
    const updatedPlans = plans[context].map((item) =>
      item.id === id ? { ...item, text } : item
    );
    updatePlan(updatedPlans);
  }

  function handleEditPlan(item, context) {
    const plan = plans[context].find((plan) => plan.id === item.id);
    setContext(context);
    setUpdatedData(plan);
    setShowModal(true);
  }

  async function handleDeletePlan(id, context) {
    const updatedPlans = plans[context].filter((item) => item.id !== id);

    try {
      await saveTaskByCategory({
        category: TASK_CATEGORY.PLANS,
        data: updatedPlans,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      const data = isEmpty(updatedPlans) ? null : updatedPlans;
      if (data) {
        setPlans((prevPlans) => ({
          ...prevPlans,
          [context]: data,
        }));
      } else {
        const updatedValues = isEmpty(omit(data, [context]))
          ? null
          : updatedPlans;
        setPlans(updatedValues);
      }
    }
  }

  async function handleComplitePlan(plan, done, context) {
    const updatedPlans = plans[context].map((item) =>
      item.id === plan.id ? { ...plan, done } : item
    );
    try {
      await saveTaskByCategory({
        category: TASK_CATEGORY.PLANS,
        data: updatedPlans,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setPlans((prevPlans) => ({
        ...prevPlans,
        [context]: updatedPlans,
      }));
      setUpdatedData(null);
      setContext(null);
    }
  }

  function openMonthPicker(plan, context) {
    setUpdatedData(plan);
    setContext(context);
    setShowMonthModal(true);
  }

  function handleMonthSelect(month) {
    const updatedPlans = plans[context].map((item) =>
      item.id === updatedData.id ? { ...updatedData, month } : item
    );
    updatePlan(updatedPlans);
    setShowMonthModal(false);
  }

  if (isLoading) {
    return <Loader />;
  }

  return plans ? (
    <Box p="$2" flex={1}>
      <Accordion
        key={plans}
        size="md"
        my="$2"
        type="multiple"
        borderRadius="$lg"
      >
        {Object.values(TASK_CONTEXT).map((context) => {
          return (
            plans[context] && (
              <AccordionItem
                key={context}
                value={context}
                borderRadius="$lg"
                mb="$5"
              >
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            <Box mr="$2">
                              <Heading size="sm">
                                {t(`context.${context}`)}
                              </Heading>
                            </Box>
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUpIcon} ml="$3" />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} ml="$3" />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <Box>
                    <PlansList
                      isPlanScreen
                      showSelectMonth
                      plans={plans[context]}
                      onMonthSelect={(item) => openMonthPicker(item, context)}
                      onEdit={(item) => handleEditPlan(item, context)}
                      onDelete={(id) => handleDeletePlan(id, context)}
                      handleComplitePlan={(item, value) =>
                        handleComplitePlan(item, value, context)
                      }
                    />
                  </Box>
                </AccordionContent>
              </AccordionItem>
            )
          );
        })}
      </Accordion>
      {showModal && (
        <AddPlanModal
          data={updatedData}
          setShowModal={setShowModal}
          handleUpdatePlan={handleUpdatePlan}
        />
      )}
      {showMonthModal && (
        <MonthSelectModal
          setShowMonthModal={setShowMonthModal}
          onMonthSelect={handleMonthSelect}
        />
      )}
    </Box>
  ) : (
    <EmptyScreen />
  );
}
