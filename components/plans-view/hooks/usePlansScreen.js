import { useState } from "react";

import { saveTaskByCategory } from "../../../services/services";

import { TASK_CATEGORY } from "../../../constants/constants";

import { Alert } from "react-native";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";

export function usePlansScreen({ plans, setPlans }) {
  const [updatedData, setUpdatedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [context, setContext] = useState(null);

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

  async function handleComplitePlan(plan, isDone, context) {
    const updatedPlans = plans[context].map((item) =>
      item.id === plan.id ? { ...plan, isDone } : item
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

  function openMonthSelect(plan, context) {
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
  return {
    updatePlan,
    handleUpdatePlan,
    handleEditPlan,
    handleDeletePlan,
    handleComplitePlan,
    openMonthSelect,
    handleMonthSelect,
    showModal,
    showMonthModal,
    context,
    updatedData,
    setShowModal,
    setShowMonthModal,
  };
}
