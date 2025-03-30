import { Text, Box } from "@gluestack-ui/themed";
import Snowman from "../assets/svg/snowman";
import { useTranslation } from "react-i18next";

export function EmptyScreen() {
  const { t } = useTranslation();
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Snowman />
      <Text mt="$10">{t("common.empty")}</Text>
    </Box>
  );
}
