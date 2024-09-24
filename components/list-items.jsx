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
} from "@gluestack-ui/themed";
import { EditIcon, Trash2, Ellipsis } from "lucide-react-native";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

export function ListItems({ plans, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <ScrollView h="$80" w="$80">
      <VStack width="100%" flex={1} space="sm" mb={30} mt={10}>
        {plans.map((item) => (
          <Fragment key={item.id}>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack>
                <Text>{item.text}</Text>
              </HStack>
              <Menu
                placement="top"
                trigger={({ ...triggerProps }) => {
                  return (
                    <Button variant="link" {...triggerProps}>
                      <ButtonIcon color="$black" as={Ellipsis} />
                    </Button>
                  );
                }}
              >
                <MenuItem
                  key="edit"
                  textValue="edit"
                  display="flex"
                  justifyContent="space-between"
                  onPress={() => onEdit(item)}
                >
                  <MenuItemLabel size="sm">{t("common.edit")}</MenuItemLabel>
                  <Icon as={EditIcon} size="sm" ml="$2" />
                </MenuItem>

                <MenuItem
                  key="delete"
                  textValue="delete"
                  display="flex"
                  justifyContent="space-between"
                  onPress={() => onDelete(item.id)}
                >
                  <MenuItemLabel size="sm">{t("common.delete")}</MenuItemLabel>
                  <Icon as={Trash2} size="sm" ml="$2" />
                </MenuItem>
              </Menu>
            </HStack>
            <Divider />
          </Fragment>
        ))}
      </VStack>
    </ScrollView>
  );
}
