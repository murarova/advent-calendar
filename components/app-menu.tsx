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
} from "@gluestack-ui/themed";
import { LogOut, Trash2 } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { LANGUAGES, SCREENS } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { deleteCurrentUser } from "../services/services";

export function AppMenu() {
  const { i18n, t } = useTranslation();
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

  function handleDeleteAccount() {
    Alert.alert(
      "Увага!",
      "Усі ваші дані буде безповоротно видалено.\n\nВаш обліковий запис буде повністю видалено без можливості відновлення.",
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          onPress: async () => {
            await deleteCurrentUser();
            nav.replace(SCREENS.LOADING);
          },
        },
      ]
    );
  }

  return (
    <Box paddingRight={10}>
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
        // Switching languages will not be a part of v1
        {/* {Object.keys(LANGUAGES).map((lng) => (
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
      ))} */}
        <MenuItem key="Logout" onPress={handleLogout} textValue="Logout">
          <Icon as={LogOut} size="sm" mr="$2" />
          <Text>{t("common.logout")}</Text>
        </MenuItem>
        <MenuItem key="Delete" onPress={handleDeleteAccount} textValue="Delete">
          <Icon as={Trash2} size="sm" mr="$2" />
          <Text>{t("common.deleteAccount")}</Text>
        </MenuItem>
      </Menu>
    </Box>
  );
}
