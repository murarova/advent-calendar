import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { getUserSummary } from "../services/services";

export function SummaryScreen() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function getTasks() {
      const summary = await getUserSummary();
      setSummary(summary);
    }
    getTasks();
  }, []);

  return (
    <Box p="$2" flex={1}>
      <Box p="$2" mt="$3">
        <Heading>{t("screens.summaryScreen.learning")}</Heading>
        {summary?.learning ? (
          <Box mt="$3">
            <Text>{summary?.learning?.text}</Text>
          </Box>
        ) : (
          <Text>{t("common.empty")}</Text>
        )}
      </Box>

      <Box p="$2" mt="$3">
        <Heading>{t("screens.summaryScreen.health")}</Heading>
        {summary?.health ? (
          <Box mt="$3">
            <Text>{summary?.health?.text}</Text>
          </Box>
        ) : (
          <Text>{t("common.empty")}</Text>
        )}
      </Box>
    </Box>
  );
}
