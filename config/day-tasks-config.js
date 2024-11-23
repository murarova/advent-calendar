import { YEAR } from "../constants/constants";
import config from "./advent-calendar-config.json";

export function getDayTasks(day, language) {
  return config[YEAR][day]?.[language];
}
