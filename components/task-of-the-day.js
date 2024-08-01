import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  AccordionContentText,
  Divider,
  ChevronUpIcon,
  ChevronDownIcon,
  Box,
  Text,
} from "@gluestack-ui/themed";
import { ImagePicker } from "../components/common";

export function TasksOfTheDay({ dayTaskConfig }) {
  return (
    <Accordion
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>
                    {dayTaskConfig.dayTitle}
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
          <AccordionContentText>
            <Box>
              <Text>{dayTaskConfig.dayText}</Text>
            </Box>
            {dayTaskConfig.pickImage && (
              <Box pt="$4">
                <ImagePicker />
              </Box>
            )}
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
      <Divider />
    </Accordion>
  );
}
