import moment from "moment";

export const enumerateDaysBetweenDates = function (startDate, endDate) {
  let dates = [];
  const currDate = moment(startDate).startOf("hour").subtract(1, "days");
  const lastDate = moment(endDate).startOf("hour").add(1, "days");

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate());
  }

  return dates;
};

export function getProgressColorByValue(value) {
  if (value < 30) {
    return "$progressRed";
  } else if (value >= 30 && value < 70) {
    return "$progressYellow";
  } else {
    return "$progressGreen";
  }
}
