import { LANGUAGES } from "../constants/constants";
import moment from "moment";
import {
  Calendar as NativeCalendar,
  LocaleConfig,
} from "react-native-calendars";
import { useTranslation } from "react-i18next";
import { getUserRole } from "../services/services";
import { useEffect, useState } from "react";
import { Pressable } from "@gluestack-ui/themed";
import { config } from "../config/gluestack-ui.config";
import CircularProgress from "react-native-circular-progress-indicator";
import { calculateTotalProgress } from "../utils/utils";
import { useDaysConfiguration } from "../providers/day-config-provider";

export function Calendar({ pressHandler }) {
  // const currentDate = moment();
  const currentDate = moment("2024-12-14");
  const { i18n } = useTranslation();
  const locale = LANGUAGES[i18n.resolvedLanguage]?.moment === "uk" ? "uk" : "";
  const [isAdmin, setIsAdmin] = useState(null);

  LocaleConfig.locales["uk"] = {
    monthNames: [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ],
    monthNamesShort: [
      "Січ.",
      "Лют.",
      "Бер.",
      "Квіт.",
      "Трав.",
      "Черв.",
      "Лип.",
      "Серп.",
      "Вер.",
      "Жовт.",
      "Лист.",
      "Груд.",
    ],
    dayNames: [
      "Неділя",
      "Понеділок",
      "Вівторок",
      "Середа",
      "Четвер",
      "Пʼятниця",
      "Субота",
    ],
    dayNamesShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  };
  LocaleConfig.defaultLocale = locale;

  const { daysConfig, getDayConfig } = useDaysConfiguration();

  useEffect(() => {
    getUserRole().then((role) => {
      if (role === "admin") {
        setIsAdmin(true);
      }
    });
  }, []);

  const minDate = moment(daysConfig[0].day).format("YYYY-MM-DD");
  const maxDate = isAdmin
    ? moment("2024-12-31").format("YYYY-MM-DD")
    : currentDate.format("YYYY-MM-DD");

  return (
    <NativeCalendar
      current={minDate}
      firstDay={1}
      key={locale}
      hideExtraDays
      dayComponent={({ date, state }) => {
        const dayConfig = getDayConfig(date.dateString);
        const progress = calculateTotalProgress(dayConfig.progress);
        return (
          <Pressable
            onPress={() => {
              if (state === "disabled") {
                return;
              }
              pressHandler(date);
            }}
          >
            {({ pressed }) => (
              <CircularProgress
                value={progress}
                activeStrokeColor={
                  pressed
                    ? config.tokens.colors.green500
                    : config.tokens.colors.green400
                }
                inActiveStrokeColor={config.tokens.colors.warmGray400}
                inActiveStrokeOpacity={0.2}
                circleBackgroundColor={
                  pressed
                    ? config.tokens.colors.backgroundLight100
                    : "transparent"
                }
                showProgressValue={false}
                title={date?.day.toString()}
                activeStrokeWidth={state === "disabled" ? 0 : 5}
                inActiveStrokeWidth={state === "disabled" ? 0 : 5}
                titleStyle={{
                  fontSize: 16,
                  fontWeight: state === "today" ? 700 : 500,
                  color:
                    state === "today"
                      ? config.tokens.colors.primary500
                      : state === "disabled"
                      ? config.tokens.colors.warmGray400
                      : "#292524",
                }}
                radius={25}
              />
            )}
          </Pressable>
        );
      }}
      hideArrows
      minDate={minDate}
      maxDate={maxDate}
      theme={{
        textDayHeaderFontWeight: "600",
        "stylesheet.calendar.main": {
          week: {
            marginVertical: 15,
            flexDirection: "row",
            justifyContent: "space-around",
          },
        },
        "stylesheet.calendar.header": {
          header: {
            display: "none",
          },
          dayHeader: {
            color: "#292524",
            fontWeight: 500,
            marginBottom: 15,
          },
        },
      }}
    />
  );
}
