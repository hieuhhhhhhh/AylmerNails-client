import { DateTime } from "luxon";

export default function unixTimeToReminder(unix) {
  const inputDate = DateTime.fromSeconds(unix).startOf("day");
  const today = DateTime.local().startOf("day");

  if (inputDate.equals(today)) {
    return null;
  }

  const diff = inputDate.diff(today, ["days", "weeks", "months"]).toObject();
  const isFuture = inputDate > today ? "next" : "last";

  if (Math.abs(diff.months) >= 1) {
    return `${isFuture} ${Math.abs(Math.round(diff.months))}m`;
  } else if (Math.abs(diff.weeks) >= 1) {
    return `${isFuture} ${Math.abs(Math.round(diff.weeks))}w`;
  } else {
    return `${isFuture} ${Math.abs(Math.round(diff.days))}d`;
  }
}
