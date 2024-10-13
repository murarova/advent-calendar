import { useEffect, useState, useLayoutEffect } from "react";
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
  Textarea,
  TextareaInput,
  Button,
  Heading,
  ButtonText,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import {
  getUserSummary,
  removeTask,
  saveTaskByCategory,
} from "../services/services";
import omit from "lodash/omit";
import { EmptyScreen } from "../components/empty-screen";
import { TASK_CATEGORY, TASK_CONTEXT } from "../constants/constants";
import { ActionButtons, Loader } from "../components/common";
import { useRating } from "../hooks/useRating";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";
import isEmpty from "lodash/isEmpty";

export function SummaryScreen() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getRating = useRating();
  const isFocused = useIsFocused();
  const [edit, setEdit] = useState({
    context: "",
  });
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      try {
        const summary = await getUserSummary();
        setSummary(summary);
      } catch (error) {
        Alert.alert("Oops", "Something wrong");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }
    if (isFocused) {
      getTasks();
    }
  }, [isFocused]);

  function onTaskSubmit(context, item) {
    if (!text.trim()) {
      Alert.alert("Oops", "Please add some text");
      return;
    }

    const updatedSummary = {
      ...item,
      text,
    };
    try {
      saveTaskByCategory({
        category: TASK_CATEGORY.SUMMARY,
        data: updatedSummary,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      setSummary((prevSummary) => ({
        ...prevSummary,
        [context]: {
          ...item,
          text,
        },
      }));
      setEdit({ context: "" });
    }
  }

  async function handleTaskRemove(context) {
    try {
      await removeTask({
        category: TASK_CATEGORY.SUMMARY,
        context,
      });
    } catch (error) {
      Alert.alert("Oops", "Something wrong");
    } finally {
      const updatedValues = omit(summary, [context]);
      setSummary(isEmpty(updatedValues) ? null : updatedValues);
      setText("");
    }
  }

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
                key={context}
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
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                            >
                              <Box mr="$2">
                                <Heading size="sm">
                                  {t(`context.${context}`)}
                                </Heading>
                              </Box>
                              <Box display="flex" alignItems="center">
                                <Text>
                                  {getRating(summary[context].rate)?.icon}
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
                    {edit.context === context ? (
                      <>
                        <Textarea width="100%">
                          <TextareaInput
                            onChangeText={setText}
                            defaultValue={summary[context].text}
                            placeholder={t(
                              "screens.tasksOfTheDay.textareaPlaceholder"
                            )}
                          />
                        </Textarea>
                        <Button
                          onPress={() =>
                            onTaskSubmit(context, summary[context])
                          }
                          mt="$2"
                          borderRadius="$lg"
                        >
                          <ButtonText>
                            {t("screens.tasksOfTheDay.submitBtnText")}
                          </ButtonText>
                        </Button>
                      </>
                    ) : (
                      <Box>
                        <Box mb="$2">
                          <Text>
                            {summary[context].text || t("common.empty")}
                          </Text>
                        </Box>
                        <ActionButtons
                          onEdit={() => setEdit({ context })}
                          onDelete={() => handleTaskRemove(context)}
                        />
                      </Box>
                    )}
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
