import { format, differenceInCalendarDays } from "date-fns";

export const calculateDates = (todayDate, msgDate) => {
  const calculateDifference = differenceInCalendarDays(todayDate, msgDate);
  switch (calculateDifference) {
    case 0:
      return format(msgDate, "HH:mm");

    case 1:
      calculateDifference + " day ago";
      break;

    default:
      return calculateDifference + " days ago";
  }
};
