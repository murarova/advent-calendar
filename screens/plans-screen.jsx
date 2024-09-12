import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { getUserPlans } from "../services/services";

export function PlansScreen() {
  const { t } = useTranslation();
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    async function getTasks() {
      const plans = await getUserPlans();
      setPlans(plans);
    }
    getTasks();
  }, []);

  return (
    <Box p="$2" flex={1}>
      <Box p="$2" mt="$3">
        <Heading>{t("screens.plansScreen.learning")}</Heading>
        {plans?.learning ? (
          <Box mt="$3">
            <Text>{plans?.learning?.text}</Text>
          </Box>
        ) : (
          <Text>{t("common.empty")}</Text>
        )}
      </Box>

      <Box p="$2" mt="$3">
        <Heading>{t("screens.plansScreen.health")}</Heading>
        {plans?.health ? (
          <Box mt="$3">
            <Text>{plans?.health?.text}</Text>
          </Box>
        ) : (
          <Text>{t("common.empty")}</Text>
        )}
      </Box>
    </Box>
  );
}
