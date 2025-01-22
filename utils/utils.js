import moment from "moment";
import { TASK_CATEGORY } from "../constants/constants";

function getTaskGrade(config, userData, day) {
  const { category, grade, context } = config;
  const completedTask =
    category === TASK_CATEGORY.MOOD
      ? userData?.[category]?.[day]
      : userData?.[category]?.[context];

  return completedTask ? grade : 0;
}

export const enumerateDaysBetweenDates = (
  userData,
  taskConfig,
  language,
  startDate,
  endDate
) => {
  const dates = [];
  let currDate = moment(startDate).startOf("hour");
  const lastDate = moment(endDate).startOf("hour");

  while (currDate.isSameOrBefore(lastDate)) {
    const day = currDate.format("DD");
    const dayConfig = taskConfig?.[day]?.[language];

    if (dayConfig) {
      const dayTaskGrade = getTaskGrade(dayConfig.dayTaskConfig, userData, day);
      const moodTaskGrade = getTaskGrade(
        dayConfig.moodTaskConfig,
        userData,
        day
      );

      dates.push({
        day: currDate.format("YYYY-MM-DD"),
        progress: {
          dayTaskGrade,
          moodTaskGrade,
        },
        config: dayConfig,
      });
    }

    currDate.add(1, "days");
  }

  return dates;
};

export function getProgressColorByValue(value) {
  if (value < 30) {
    return "$progressRed";
  } else if (value >= 30 && value < 70) {
    return "$progressYellow";
  } else {
    return "$green400";
  }
}

export function calculateTotalProgress(progress) {
  const totalProgress = Object.values(progress).reduce((sum, grade) => {
    return sum + grade;
  }, 0);

  return totalProgress;
}
