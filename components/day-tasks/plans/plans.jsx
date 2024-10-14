import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import isEmpty from "lodash/isEmpty";
import { AddPlanModal } from "./add-plan-modal";
import { PlansList } from "./plans-list";
import { usePlans } from "./hooks/usePlans";

export function Plans({ context, data, setData, removeGrade }) {
  const { t } = useTranslation();

  const {
    updatedData,
    showModal,
    setShowModal,
    handleAddPlan,
    handleUpdatePlan,
    handleEditPlan,
    handleDeletePlan,
    handleAddPlanBtn,
  } = usePlans({ data, context, setData, removeGrade });

  return (
    <Box>
      <Button borderRadius="$lg" onPress={handleAddPlanBtn}>
        <ButtonText>{t("screens.tasksOfTheDay.addPlanItem")}</ButtonText>
      </Button>
      {!isEmpty(data) && (
        <Box mt="$10">
          <PlansList
            plans={data}
            title={t("screens.plansScreen.title")}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
          />
        </Box>
      )}

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
