import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { MAX_PLANS_AMOUNT, TASK_CATEGORY } from "../../../constants/constants";
import isEmpty from "lodash/isEmpty";

import { AddPlanModal } from "./add-plan-modal";
import { PlansList } from "./plans-list";
import { saveTaskByCategory } from "../../../services/services";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

export function Plans({ context, data, setData, removeGrade }) {
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

  return (
    <Box>
      {!isEmpty(data) && (
        <PlansList
          plans={data}
          onEdit={handleEditPlan}
          onDelete={handleDeletePlan}
        />
      )}
      <Button borderRadius="$lg" mb="$2" onPress={handleAddPlanBtn}>
        <ButtonText>{t("screens.tasksOfTheDay.addPlanItem")}</ButtonText>
      </Button>

      {showModal && (
        <AddPlanModal
          data={updatedData}
          setShowModal={setShowModal}
          handleUpdatePlan={handleUpdatePlan}
          handleAddPlan={handleAddPlan}
        />
      )}
    </Box>
  );
}
