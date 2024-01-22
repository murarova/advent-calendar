import config from './adventCalendarConfig.json'

export function getDayTasks(day) {
  return config[day];
}
