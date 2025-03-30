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
import { useTranslation } from "react-i18next";
import { TASK_CONTEXT, PlansViewOptions } from "../../constants/constants";
import { AddPlanModal } from "../day-tasks/plans/add-plan-modal";
import { MonthSelectModal } from "../modals/month-select-modal";
import { PlansList } from "./components/plans";
import {
  PlanScreenData,
  PlansCollection,
  TaskContext,
} from "../../types/types";

export interface PlansViewProps {
  plans: PlansCollection;
  handleEditPlan: (plan: PlanScreenData, context: TaskContext) => void;
  openMonthSelect: (plan: PlanScreenData, context: TaskContext) => void;
  handleDeletePlan: (id: string, context: TaskContext) => void;
  handleUpdatePlan: (id: string, text: string) => void;
  handleMonthSelect: (month: string) => void;
  handleComplitePlan: (
    plan: PlanScreenData,
    value: boolean,
    context: TaskContext
  ) => void;
  setShowModal: (value: boolean) => void;
  setShowMonthModal: (value: boolean) => void;
  showModal: boolean;
  showMonthModal: boolean;
  updatedData: PlanScreenData | null;
}

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
}: PlansViewProps) {
  const { t } = useTranslation();
  return (
    <ScrollView>
      <Box p="$2" flex={1}>
        <Accordion
          key="context-view"
          size="md"
          my="$2"
          type="multiple"
          borderRadius="$lg"
        >
          {Object.values(TASK_CONTEXT).map((context: TaskContext) => {
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
                              <Heading size="sm">
                                {t(`context.${context}`)}
                              </Heading>
                              <Text>{`  (${plans?.[context]?.length})`}</Text>
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
                        view={PlansViewOptions.context}
                        plans={plans[context]!}
                        onMonthSelect={(item) => openMonthSelect(item, context)}
                        onEdit={(item) => handleEditPlan(item, context)}
                        onDelete={(item) => {
                          handleDeletePlan(item.id, context);
                        }}
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
    </ScrollView>
  );
}
