import { useState } from "react";
import { saveTaskByCategory } from "../../../services/services";
import { TASK_CATEGORY } from "../../../constants/constants";
import { Alert } from "react-native";
import isEmpty from "lodash/isEmpty";
import {
  PlanScreenData,
  PlansCollection,
  TaskContext,
} from "../../../types/types";

interface UsePlansScreenProps {
  plans: PlansCollection | null;
  setPlans: (plans: PlansCollection | null) => void;
}

export function usePlansScreen({ plans, setPlans }: UsePlansScreenProps) {
  const [updatedData, setUpdatedData] = useState<PlanScreenData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [context, setContext] = useState<TaskContext | null>(null);

  function updatePlan(updatedPlans: PlanScreenData[]) {
    try {
      saveTaskByCategory({
        category: TASK_CATEGORY.PLANS,
        data: updatedPlans,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setPlans({
        ...plans,
        [context as TaskContext]: updatedPlans,
      });

      setUpdatedData(null);
      setContext(null);
    }
  }

  function handleUpdatePlan(id: string, text: string) {
    if (!context || !plans) {
      return;
    }
    const updatedPlans = plans[context]!.map((item) =>
      item.id === id ? { ...item, text } : item
    );
    updatePlan(updatedPlans);
  }

  function handleEditPlan(item: PlanScreenData, context: TaskContext) {
    if (!plans) {
      return;
    }
    const plan = plans[context]!.find((plan) => plan.id === item.id) ?? null;
    setContext(context);
    setUpdatedData(plan);
    setShowModal(true);
  }

  async function handleDeletePlan(id: string, context: TaskContext) {
    if (!plans) {
      return;
    }
    const updatedPlans = plans[context]!.filter((item) => item.id !== id);

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
        setPlans({
          ...plans,
          [context as TaskContext]: data,
        });
      } else {
        setPlans(null);
      }
    }
  }

  async function handleComplitePlan(
    plan: PlanScreenData,
    isDone: boolean,
    context: TaskContext
  ) {
    if (!plans) {
      return;
    }
    const updatedPlans = plans[context]!.map((item) =>
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
      setPlans({
        ...plans,
        [context as TaskContext]: updatedPlans,
      });
      setUpdatedData(null);
      setContext(null);
    }
  }

  function openMonthSelect(plan: PlanScreenData, context: TaskContext) {
    setUpdatedData(plan);
    setContext(context);
    setShowMonthModal(true);
  }

  function handleMonthSelect(month: string) {
    if (!plans || !context) {
      return;
    }
    const updatedPlans = plans[context]!.map((item: PlanScreenData) =>
      item.id === updatedData?.id ? { ...updatedData, month } : item
    );
    updatePlan(updatedPlans);
    setShowMonthModal(false);
  }
  return {
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
