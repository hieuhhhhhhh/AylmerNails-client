import { DateTime } from "luxon";
import getTimezone from "./getTimeZone";

export default function unixToReadable(unixTimestamp) {
  if (!unixTimestamp) {
    return;
  }

  // Convert the Unix timestamp to a Luxon DateTime object in the specified timezone
  const dateTime = DateTime.fromMillis(unixTimestamp * 1000).setZone(
    getTimezone()
  );

  // Get today's date in the same timezone
  const today = DateTime.now().setZone(getTimezone()).startOf("day");

  // Check if the given timestamp is today
  if (dateTime.hasSame(today, "day")) {
    return "Today";
  }

  // Format the date with short weekday and month (e.g., "Mon, Jan 20, 2025")
  return dateTime.toLocaleString({
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
