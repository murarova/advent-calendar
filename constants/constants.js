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
  LEARNING: "learning",
  WORK: "work",
  RELATIONSHIP: "relationship",
};

export const TASK_CATEGORY = {
  MOOD: "mood",
  SUMMARY: "summary",
  PLANS: "plans",
  MONTH_PHOTO: "monthPhoto",
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

export const months2 = {
  january: {
    en: {
      short: "Jan",
      long: "January",
    },
    ua: {
      short: "Січ",
      long: "Січень",
    },
  },
  february: {
    en: {
      short: "Feb",
      long: "February",
    },
    ua: {
      short: "Лют",
      long: "Лютий",
    },
  },
  march: {
    en: {
      short: "Mar",
      long: "March",
    },
    ua: {
      short: "Бер",
      long: "Березень",
    },
  },
  april: {
    en: {
      short: "Apr",
      long: "April",
    },
    ua: {
      short: "Квіт",
      long: "Квітень",
    },
  },
  may: {
    en: {
      short: "May",
      long: "May",
    },
    ua: {
      short: "Трав",
      long: "Травень",
    },
  },
  june: {
    en: {
      short: "Jun",
      long: "June",
    },
    ua: {
      short: "Черв",
      long: "Червень",
    },
  },
  july: {
    en: {
      short: "Jul",
      long: "July",
    },
    ua: {
      short: "Лип",
      long: "Липень",
    },
  },
  august: {
    en: {
      short: "Aug",
      long: "August",
    },
    ua: {
      short: "Серп",
      long: "Серпень",
    },
  },
  september: {
    en: {
      short: "Sep",
      long: "September",
    },
    ua: {
      short: "Вер",
      long: "Вересень",
    },
  },
  october: {
    en: {
      short: "Oct",
      long: "October",
    },
    ua: {
      short: "Жовт",
      long: "Жовтень",
    },
  },
  november: {
    en: {
      short: "Nov",
      long: "November",
    },
    ua: {
      short: "Лист",
      long: "Листопад",
    },
  },
  december: {
    en: {
      short: "Dec",
      long: "December",
    },
    ua: {
      short: "Груд",
      long: "Грудень",
    },
  },
};

export const plansViewOptions = {
  context: "context",
  month: "month",
};
