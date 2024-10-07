// @ts-nocheck
import CountryFlag from "react-native-country-flag";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  Button,
  Box,
  MenuIcon,
  ButtonIcon,
  Icon,
  Text,
  SettingsIcon,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { LANGUAGES, SCREENS } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

export function AppMenu() {
  const { i18n } = useTranslation();
  const nav = useNavigation();

  function handleLanguageChanged(lng) {
    i18n.changeLanguage(lng);
  }

  function handleLogout() {
    auth()
      .signOut()
      .then(() => {
        nav.replace(SCREENS.LOADING);
      });
  }

  return (
    <Menu
      placement="top"
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} variant="link">
            <ButtonIcon color="$warmGray800" as={MenuIcon} size="xl" />
          </Button>
        );
      }}
    >
      {Object.keys(LANGUAGES).map((lng) => (
        <MenuItem
          key={LANGUAGES[lng].icon}
          onPress={() => handleLanguageChanged(lng)}
          textValue={LANGUAGES[lng].nativeName}
        >
          <Box mr={8}>
            <CountryFlag isoCode={LANGUAGES[lng].icon} size={16} />
          </Box>

          <MenuItemLabel size="sm">{LANGUAGES[lng].nativeName}</MenuItemLabel>
        </MenuItem>
      ))}
      <MenuItem key="Logout" onPress={handleLogout} textValue="Logout">
        <Icon as={SettingsIcon} size="sm" mr="$2" />
        <Text>Logout</Text>
      </MenuItem>
    </Menu>
  );
}
