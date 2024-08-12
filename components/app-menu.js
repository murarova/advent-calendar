import CountryFlag from "react-native-country-flag";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  Button,
  Box,
  Icon,
  MenuIcon,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/constants";

export function AppMenu() {
  const { i18n } = useTranslation();
  const nav = useNavigation();
  return (
    <Menu
      placement="top"
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} variant="link" size="xl">
            <ButtonIcon as={MenuIcon} />
          </Button>
        );
      }}
    >
      <MenuItem
        key="login"
        onPress={() => {
          nav.push(SCREENS.REGISTER);
        }}
        textValue={"Login"}
      >
        <MenuItemLabel size="sm">Login</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}
