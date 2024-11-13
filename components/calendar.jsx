import { OPEN_DAYS_FROM_TODAY, LANGUAGES } from "../constants/constants";
import moment from "moment";
import {
  Calendar as NativeCalendar,
  LocaleConfig,
} from "react-native-calendars";
import { useTranslation } from "react-i18next";

export function Calendar({ pressHandler, currentDate, days }) {
  const { i18n } = useTranslation();
  const locale = LANGUAGES[i18n.resolvedLanguage].moment === "uk" ? "uk" : "";

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

  function isDayAvailableForUser(date) {
    return moment(date).diff(currentDate, "days") < OPEN_DAYS_FROM_TODAY;
  }

  function getMarkedDates() {
    let markedDates = {};
    days.map((day) => {
      if (isDayAvailableForUser(day)) {
        markedDates[moment(day).format("YYYY-MM-DD")] = {
          customStyles: {
            container: {
              backgroundColor: "#FFE0E1",
              borderRadius: 22,
              justifyContent: "center",
            },
            text: {
              color: "#262626",
            },
          },
        };
      } else {
        markedDates[moment(day).format("YYYY-MM-DD")] = {
          customStyles: {
            container: {
              borderRadius: 22,
              justifyContent: "center",
            },
            text: {
              color: "#262626",
            },
          },
        };
      }
      if (
        moment(day).diff(currentDate, "days", true) > -1 &&
        moment(day).diff(currentDate, "days", true) <= 0
      ) {
        markedDates[moment(day).format("YYYY-MM-DD")] = {
          customStyles: {
            container: {
              backgroundColor: "#fe434c",
              borderRadius: 22,
              justifyContent: "center",
            },
            text: {
              color: "#fff",
              fontWeight: "bold",
            },
          },
        };
      }
    });
    return markedDates;
  }

  return (
    <NativeCalendar
      current={currentDate.format("YYYY-MM-DD")}
      firstDay={1}
      key={locale}
      hideExtraDays
      onDayPress={(day) => {
        pressHandler(day);
      }}
      hideArrows
      maxDate={currentDate.format("YYYY-MM-DD")}
      markingType={"custom"}
      markedDates={getMarkedDates()}
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
        "stylesheet.day.basic": {
          base: {
            width: 44,
            height: 44,
            alignItems: "center",
          },
        },
      }}
    />
  );
}
