import moment from "moment";

export const START_DAY = moment("2023-12-01");
export const END_DAY = moment("2023-12-31");

export const OPEN_DAYS_FROM_TODAY = 0;

export const SCREENS = {
  PERIOD_OVERVIEW: "PeriodOverview",
  DAY_OVERVIEW: "DayOverview",
  REGISTER: "Register",
  LOGIN: "Login",
  LOADING: "Loading",
  SUMMARY: "Summary",
  HOME: "Home",
  PLANS: "Plans",
};

export const LANGUAGES = {
  ua: { icon: "ua", nativeName: "Українська", moment: "uk" },
  en: { icon: "us", nativeName: "English", moment: "en-gb" },
};

export const TASK_OUTPUT_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  LIST: "list",
};

export const TASK_CONTEXT = {
  HEALTH: "health",
  MOOD: "mood",
  LEARNING: "learning",
};

export const TASK_CATEGORY = {
  MOOD: "mood",
  SUMMARY: "summary",
  PLANS: "plans",
  DAY: "day",
};

export const MAX_PLANS_AMOUNT = 10;
