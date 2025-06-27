import {
  format,
  differenceInCalendarDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export const calculateDates = (todayDate, msgDate) => {
  const calculateDifferenceDays = differenceInCalendarDays(todayDate, msgDate);
  const calculateDIfferenceMonths = differenceInMonths(todayDate, msgDate);
  const calculateDifferenceYears = differenceInYears(todayDate, msgDate);

  if (calculateDifferenceYears === 1) {
    return calculateDifferenceYears + " year ago";
  } else if (calculateDifferenceYears > 1) {
    return calculateDifferenceYears + " years ago";
  }

  if (calculateDIfferenceMonths === 1) {
    return calculateDIfferenceMonths + " month ago";
  } else if (calculateDIfferenceMonths > 1) {
    return calculateDIfferenceMonths + " months ago";
  }

  if (calculateDifferenceDays === 1) {
    return calculateDifferenceDays + " day ago";
  } else if (calculateDifferenceDays > 1) {
    return calculateDifferenceDays + " days ago";
  } else {
    return format(msgDate, "p");
  }
};
