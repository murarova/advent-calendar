import config from "./adventCalendarConfig.json";

export function getDayTasks(day, language) {
  return config[day][language];
}
