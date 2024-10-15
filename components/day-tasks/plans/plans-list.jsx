import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  ButtonIcon,
  Menu,
  MenuItem,
  MenuItemLabel,
  Icon,
  Divider,
  ScrollView,
  Heading,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { EditIcon, Trash2, Ellipsis } from "lucide-react-native";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

export function PlansList({
  plans,
  onEdit,
  onDelete,
  title,
  handleComplitePlan,
  showCheckbox,
}) {
  const { t } = useTranslation();

  function handlePlanDone(item, value) {
    handleComplitePlan(item, value);
  }

  return (
    <ScrollView maxHeight="$80" w="$80">
      <VStack width="100%" flex={1} space="sm">
        {title && <Heading size="sm">{title}</Heading>}
        {plans.map((item, index, array) => (
          <Fragment key={item.id}>
            <HStack justifyContent="space-between" alignItems="center">
              <Box flex={1}>
                {showCheckbox ? (
                  <Checkbox
                    value={item?.text}
                    defaultIsChecked={item?.done}
                    onChange={(value) => handlePlanDone(item, value)}
                    size="md"
                    aria-label={item?.text}
                  >
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon color="$white" as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel flex={1}>
                      <Text
                        style={
                          item?.done && {
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                          }
                        }
                      >
                        {item?.text}
                      </Text>
                    </CheckboxLabel>
                  </Checkbox>
                ) : (
                  <Text>{item?.text}</Text>
                )}
              </Box>
              <Menu
                placement="top"
                paddingVertical={0}
                backgroundColor="$backgroundLight200"
                trigger={({ ...triggerProps }) => {
                  return (
                    <Box>
                      <Button variant="link" {...triggerProps}>
                        <ButtonIcon color="$black" as={Ellipsis} />
                      </Button>
                    </Box>
                  );
                }}
              >
                <MenuItem
                  key="edit"
                  textValue="edit"
                  display="flex"
                  backgroundColor="#fff"
                  justifyContent="space-between"
                  mb="$px"
                  onPress={() => onEdit(item)}
                >
                  <MenuItemLabel size="sm">{t("common.edit")}</MenuItemLabel>
                  <Icon as={EditIcon} size="sm" ml="$2" />
                </MenuItem>

                <MenuItem
                  key="delete"
                  textValue="delete"
                  backgroundColor="#fff"
                  display="flex"
                  justifyContent="space-between"
                  onPress={() => onDelete(item.id)}
                >
                  <MenuItemLabel size="sm">{t("common.delete")}</MenuItemLabel>
                  <Icon as={Trash2} size="sm" ml="$2" />
                </MenuItem>
              </Menu>
            </HStack>
            {index !== array.length - 1 && <Divider />}
          </Fragment>
        ))}
      </VStack>
    </ScrollView>
  );
}
