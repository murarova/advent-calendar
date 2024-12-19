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
  ScrollView,
} from "@gluestack-ui/themed";
import { months, plansViewOptions } from "../../constants/constants";
import { PlansList } from "../day-tasks/plans/plans-list";
import { AddPlanModal } from "../day-tasks/plans/add-plan-modal";
import { MonthSelectModal } from "../modals/month-select-modal";
import { EmptyScreen } from "../empty-screen";
import isEmpty from "lodash/isEmpty";

export function PlansMonthView({
  plans,
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
  function groupByMonthWithContext(plans) {
    const result = {};
    const allMonths = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    for (const context in plans) {
      plans[context].forEach((item) => {
        const month = item.month;
        const itemWithContext = { ...item, context: context };

        if (month === "every") {
          // Add the plan to every month from January to December
          allMonths.forEach((monthName) => {
            if (!result[monthName]) {
              result[monthName] = [];
            }
            result[monthName].push(itemWithContext);
          });
        } else {
          // Normal case for specific month
          if (!result[month]) {
            result[month] = [];
          }
          result[month].push(itemWithContext);
        }
      });
    }

    return result;
  }

  const sortedPlans = groupByMonthWithContext(plans);

  if (isEmpty(sortedPlans)) {
    return <EmptyScreen />;
  }

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
