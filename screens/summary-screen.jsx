import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { getUserSummary } from "../services/services";
import { EmptyScreen } from "../components/empty-screen";
import { TASK_CONTEXT } from "../constants/constants";
import { Loader } from "../components/common";
import { useRating } from "../components/hooks/useRating";
import { useIsFocused } from "@react-navigation/native";

export function SummaryScreen() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getRating = useRating();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getTasks() {
      try {
        setIsLoading(true);
        const summary = await getUserSummary();
        setSummary(summary);
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      } finally {
        setIsLoading(false);
      }
    }
    if (isFocused) {
      getTasks();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loader />;
  }

  return summary ? (
    <Box p="$2" flex={1}>
      <Accordion
        key={summary}
        size="md"
        my="$2"
        type="multiple"
        borderRadius="$lg"
      >
        {Object.values(TASK_CONTEXT).map((context) => {
          return (
            summary[context] && (
              <AccordionItem
                key={summary[context]?.rate}
                value={context}
                borderRadius="$lg"
                mb="$5"
              >
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            <Box display="flex" flexDirection="row">
                              <Box mr="$2">
                                <Text>
                                  {t(`screens.summaryScreen.${context}`)}
                                </Text>
                              </Box>
                              <Box>
                                <Text>
                                  {getRating(summary[context].rate).icon}
                                </Text>
                              </Box>
                            </Box>
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUpIcon} ml="$3" />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} ml="$3" />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <Box>
                    <Text>{summary[context].text}</Text>
                  </Box>
                </AccordionContent>
              </AccordionItem>
            )
          );
        })}
      </Accordion>
    </Box>
  ) : (
    <EmptyScreen />
  );
}
