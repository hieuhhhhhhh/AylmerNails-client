import { DateTime } from "luxon";

export default function unixTimeToReminder(unix) {
  const inputDate = DateTime.fromSeconds(unix).startOf("day");
  const today = DateTime.local().startOf("day");

  const diff = inputDate.diff(today, "days").toObject();
  const daysDiff = Math.round(diff.days);

  if (inputDate.equals(today)) {
    return "Today";
  }
  if (daysDiff === 1) {
    return "Tomorrow";
  } else if (daysDiff === -1) {
    return "Yesterday";
  }

  const isFuture = daysDiff > 0 ? "next" : "last";

  if (Math.abs(daysDiff) >= 30) {
    return `${isFuture} ${Math.abs(Math.round(daysDiff / 30))}m`;
  } else if (Math.abs(daysDiff) >= 7) {
    return `${isFuture} ${Math.abs(Math.round(daysDiff / 7))}w`;
  } else {
    return `${isFuture} ${Math.abs(daysDiff)}d`;
  }
}
