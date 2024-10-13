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

export function usePlans({ data, context, setData, removeGrade }) {
  const { t } = useTranslation();
  const [updatedData, setUpdatedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleAddPlan(text) {
    const id = uuid.v4();
    const updatedPlans = [
      ...(data ?? []),
      {
        id,
        text,
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
    }
  }

  function handleUpdatePlan(id, text) {
    const updatedPlans = data.map((item) =>
      item.id === id ? { id, text } : item
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
    }
  }

  async function handleEditPlan(plan) {
    setShowModal(true);
    setUpdatedData(plan);
  }

  async function handleDeletePlan(id) {
    const updatedPlans = data.filter((item) => item.id !== id);
    if (isEmpty(updatedPlans)) {
      await removeGrade({ category: TASK_CATEGORY.PLANS });
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
  };
}
