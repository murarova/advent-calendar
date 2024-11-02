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
  Heading,
  VStack,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { TASK_CONTEXT, plansViewOptions } from "../../constants/constants";
import { PlansList } from "../day-tasks/plans/plans-list";
import { AddPlanModal } from "../day-tasks/plans/add-plan-modal";
import { MonthSelectModal } from "../modals/month-select-modal";

export function PlansContextView({
  plans,
  openMonthSelect,
  handleEditPlan,
  handleDeletePlan,
  handleComplitePlan,
  showModal,
  updatedData,
  setShowModal,
  handleUpdatePlan,
  showMonthModal,
  setShowMonthModal,
  handleMonthSelect,
}) {
  const { t } = useTranslation();
  return (
    <Box p="$2" flex={1}>
      <Accordion
        key={plans}
        size="md"
        my="$2"
        type="multiple"
        borderRadius="$lg"
      >
        {Object.values(TASK_CONTEXT).map((context) => {
          return (
            plans[context] && (
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
                            <VStack>
                              <Badge
                                position="absolute"
                                h={22}
                                w={22}
                                bg="$green500"
                                borderRadius="$full"
                                right={-28}
                                bottom={8}
                                zIndex={1}
                                variant="solid"
                                alignSelf="flex-end"
                              >
                                <BadgeText color="$white">
                                  {plans[context].length}
                                </BadgeText>
                              </Badge>
                              <Heading size="sm">
                                {t(`context.${context}`)}
                              </Heading>
                            </VStack>
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
                    <PlansList
                      isPlanScreen
                      showSelectMonth
                      view={plansViewOptions.context}
                      plans={plans[context]}
                      onMonthSelect={(item) => openMonthSelect(item, context)}
                      onEdit={(item) => handleEditPlan(item, context)}
                      onDelete={(item) =>
                        handleDeletePlan(item.id, item.context)
                      }
                      handleComplitePlan={(item, value) =>
                        handleComplitePlan(item, value, context)
                      }
                    />
                  </Box>
                </AccordionContent>
              </AccordionItem>
            )
          );
        })}
      </Accordion>
      {showModal && (
        <AddPlanModal
          data={updatedData}
          setShowModal={setShowModal}
          handleUpdatePlan={handleUpdatePlan}
        />
      )}
      {showMonthModal && (
        <MonthSelectModal
          setShowMonthModal={setShowMonthModal}
          onMonthSelect={handleMonthSelect}
        />
      )}
    </Box>
  );
}
