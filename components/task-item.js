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
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { ImagePicker } from "./common";

export function TaskItem({ dayTaskConfig }) {
  return (
    <Accordion
      size="md"
      my="$2"
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
            <Box display="flex" alignItems="center">
              <Box>
                <Text>{dayTaskConfig.dayText}</Text>
              </Box>
              <Box pt="$4">
                {dayTaskConfig.pickImage && <ImagePicker />}
                {dayTaskConfig.addText && (
                  <Textarea width="100%">
                    <TextareaInput placeholder="Your text goes here..." />
                  </Textarea>
                )}
              </Box>
            </Box>
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
      <Divider />
    </Accordion>
  );
}
