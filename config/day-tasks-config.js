import config from "./advent-calendar-config.json";

export function getDayTasks(day, language) {
  return config[day]?.[language];
}
