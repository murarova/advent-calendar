import CountryFlag from "react-native-country-flag";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  Button,
  Box,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

export function LanguageMenu() {
  const lngs = {
    en: { icon: "us", nativeName: "English" },
    ua: { icon: "ua", nativeName: "Українська" },
  };
  const { i18n } = useTranslation();

  return (
    <Menu
      placement="top"
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} variant="link" size="xs">
            <CountryFlag isoCode={lngs[i18n.resolvedLanguage].icon} size={16} />
          </Button>
        );
      }}
    >
      {Object.keys(lngs).map((lng) => (
        <MenuItem
          key={lngs[lng].icon}
          onPress={() => i18n.changeLanguage(lng)}
          textValue={lngs[lng].nativeName}
        >
          <Box mr={8}>
            <CountryFlag isoCode={lngs[lng].icon} size={16} />
          </Box>

          <MenuItemLabel size="sm">{lngs[lng].nativeName}</MenuItemLabel>
        </MenuItem>
      ))}
    </Menu>
  );
}
