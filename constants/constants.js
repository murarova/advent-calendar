import moment from "moment";

export const YEAR = "2024";
export const START_DAY = moment("2024-12-01");
export const END_DAY = moment("2024-12-31");

export const OPEN_DAYS_FROM_TODAY = 0;

export const SCREENS = {
  INTRO: "INTRO",
  PERIOD_OVERVIEW: "PeriodOverview",
  DAY_OVERVIEW: "DayOverview",
  REGISTER: "Register",
  LOGIN: "Login",
  LOADING: "Loading",
  SUMMARY: "Summary",
  HOME: "Home",
  PLANS: "Plans",
  ALBUM: "Album",
  DASHBOARD: "Dashboard",
};

export const LANGUAGES = {
  ua: { icon: "ua", nativeName: "Українська", moment: "uk" },
  en: { icon: "us", nativeName: "English", moment: "en-gb" },
};

export const TASK_OUTPUT_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  LIST: "list",
  TEXT_PHOTO: "textPhoto",
};

export const TASK_CONTEXT = {
  HEALTH: "health",
  LEARNING: "learning",
  WORK: "work",
  RELATIONSHIP: "relationship",
  RELAX: "relax",
  ART: "art",
  MONEY: "money",
  SUPPORTS: "supports",
  GLOBAL_GOAL: "globalGoal",
  MONEY_GOAL: "moneyGoal",
  SUPPORT_WORD: "supportWord",
};

export const TASK_CATEGORY = {
  MOOD: "mood",
  SUMMARY: "summary",
  PLANS: "plans",
  MONTH_PHOTO: "monthPhoto",
  GOALS: "goals",
};

export const MAX_PLANS_AMOUNT = 10;

export const months = [
  { short: "Січ", long: "Січень", value: "january" },
  { short: "Лют", long: "Лютий", value: "february" },
  { short: "Бер", long: "Березень", value: "march" },
  { short: "Квіт", long: "Квітень", value: "april" },
  { short: "Трав", long: "Травень", value: "may" },
  { short: "Черв", long: "Червень", value: "june" },
  { short: "Лип", long: "Липень", value: "july" },
  { short: "Серп", long: "Серпень", value: "august" },
  { short: "Вер", long: "Вересень", value: "september" },
  { short: "Жовт", long: "Жовтень", value: "october" },
  { short: "Лист", long: "Листопад", value: "november" },
  { short: "Груд", long: "Грудень", value: "december" },
];

export const plansViewOptions = {
  context: "context",
  month: "month",
};
