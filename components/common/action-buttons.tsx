import React from "react";
import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  return (
    <Box mt="$3">
      <Button onPress={onEdit} mt="$2">
        <ButtonText>{t("screens.tasksOfTheDay.editBtnText")}</ButtonText>
      </Button>
      <Button onPress={onDelete} mt="$2" variant="outline">
        <ButtonText>{t("common.delete")}</ButtonText>
      </Button>
    </Box>
  );
};
