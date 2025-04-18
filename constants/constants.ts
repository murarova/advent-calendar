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
} as const;

export const albumScreenmMonthOrder = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "year",
] as const;

export const LANGUAGES = {
  ua: { icon: "ua", nativeName: "Українська", moment: "uk" },
  en: { icon: "us", nativeName: "English", moment: "en-gb" },
};

export enum TaskOutputType {
  Text = "text",
  Image = "image",
  List = "list",
  TextPhoto = "textPhoto",
}

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
  SUPPORT_WORD: "supportWord",
} as const;

export const TASK_CATEGORY = {
  MOOD: "mood",
  SUMMARY: "summary",
  PLANS: "plans",
  MONTH_PHOTO: "monthPhoto",
  GOALS: "goals",
} as const;

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

export enum PlansViewOptions {
  context = "context",
  month = "month",
}
