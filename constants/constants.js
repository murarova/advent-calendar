import moment from "moment";


export const START_DAY = moment("2023-12-01");
export const END_DAY = moment("2023-12-31");

export const OPEN_DAYS_FROM_TODAY = 0;

export const SCREENS = {
  PERIOD_OVERVIEW: "PeriodOverview",
  TASKS_OF_THE_DAY: "TasksOfTheDay",
  DAY_OVERVIEW: "DayOverview",
};

export const LANGUAGES = {
  en: { icon: "us", nativeName: "English", moment: "en-gb" },
  ua: { icon: "ua", nativeName: "Українська", moment: "uk" },
};
