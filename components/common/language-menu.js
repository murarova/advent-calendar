import CountryFlag from "react-native-country-flag";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  Button,
  Box,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../constants/constants";

export function LanguageMenu() {
  const { i18n } = useTranslation();

  function handleLanguageChanged(lng) {
    i18n.changeLanguage(lng);
  }

  return (
    <Menu
      placement="top"
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} variant="link" size="xs">
            <CountryFlag
              isoCode={LANGUAGES[i18n.resolvedLanguage].icon}
              size={16}
            />
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
    </Menu>
  );
}
