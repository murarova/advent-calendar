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
  ScrollView,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import {
  TASK_CONTEXT,
  months,
  plansViewOptions,
} from "../../constants/constants";
import { PlansList } from "../day-tasks/plans/plans-list";
import { AddPlanModal } from "../day-tasks/plans/add-plan-modal";
import { MonthSelectModal } from "../modals/month-select-modal";

export function PlansMonthView({
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
  function groupByMonthWithContext(plans) {
    const result = {};
    for (const context in plans) {
      plans[context].forEach((item) => {
        const month = item.month;
        const itemWithContext = { ...item, context: context };
        if (!result[month]) {
          result[month] = [];
        }
        result[month].push(itemWithContext);
      });
    }
    return result;
  }

  const sortedPlans = groupByMonthWithContext(plans);

  return (
    <ScrollView>
      <Box p="$2" flex={1}>
        <Accordion
          key={plans}
          size="md"
          my="$2"
          type="multiple"
          borderRadius="$lg"
        >
          {months.map((month, index) => {
            return (
              sortedPlans[month.value] && (
                <AccordionItem
                  key={month.value}
                  value={month.value}
                  borderRadius="$lg"
                  mb="$5"
                >
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              <Heading size="sm">{month.long}</Heading>
                              <Text>{`  (${
                                sortedPlans[month.value].length
                              })`}</Text>
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
                        view={plansViewOptions.month}
                        showSelectMonth
                        plans={sortedPlans[month.value]}
                        onEdit={(item) => handleEditPlan(item, item.context)}
                        onDelete={(item) =>
                          handleDeletePlan(item.id, item.context)
                        }
                        handleComplitePlan={(item, value) =>
                          handleComplitePlan(item, value, item.context)
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
    </ScrollView>
  );
}
