import { useState } from "react";
import {
  MAX_PLANS_AMOUNT,
  TASK_CATEGORY,
} from "../../../../constants/constants";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "react-i18next";
import { saveTaskByCategory } from "../../../../services/services";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { PlanData } from "../../../../types/types";

interface UsePlansProps {
  context: string;
  data: PlanData[] | null;
  setData: (data: PlanData[] | null) => void;
  handleAddProgress: () => void;
  handleRemoveProgress: () => void;
}

export function usePlans({
  data,
  context,
  setData,
  handleAddProgress,
  handleRemoveProgress,
}: UsePlansProps) {
  const { t } = useTranslation();
  const [updatedData, setUpdatedData] = useState<PlanData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function handleAddPlan(text: string) {
    setLoading(true);
    const id = uuid.v4();
    const updatedPlans = [
      ...(data ?? []),
      {
        id,
        text,
        isDone: false,
      },
    ];
    try {
      saveTaskByCategory({
        category: TASK_CATEGORY.PLANS,
        data: updatedPlans,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(updatedPlans);
      handleAddProgress();
      setLoading(false);
    }
  }

  function handleUpdatePlan(id: string, text: string) {
    setLoading(true);
    const updatedPlans = (data ?? []).map((item) =>
      item.id === id ? { ...item, text } : item
    );
    try {
      saveTaskByCategory({
        category: TASK_CATEGORY.PLANS,
        data: updatedPlans,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setData(updatedPlans);
      setUpdatedData(null);
      setLoading(false);
    }
  }

  async function handleEditPlan(plan: PlanData) {
    setShowModal(true);
    setUpdatedData(plan);
  }

  async function handleDeletePlan(planItem: PlanData) {
    setLoading(true);
    const updatedPlans = (data ?? []).filter((item) => item.id !== planItem.id);
    if (isEmpty(updatedPlans)) {
      handleRemoveProgress();
    }

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
      setData(data);
      setLoading(false);
    }
  }

  function handleAddPlanBtn() {
    if (data?.length === MAX_PLANS_AMOUNT) {
      Alert.alert(t("screens.plansScreen.maxPlansError"));
      return;
    }
    setShowModal(true);
  }

  return {
    updatedData,
    showModal,
    setShowModal,
    handleAddPlan,
    handleUpdatePlan,
    handleEditPlan,
    handleDeletePlan,
    handleAddPlanBtn,
    isLoading,
  };
}
