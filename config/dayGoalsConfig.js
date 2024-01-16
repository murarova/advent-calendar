import config from './adventCalendarConfig.json'

export function getDayGoalsConfig(day) {
  return config[day];
}
