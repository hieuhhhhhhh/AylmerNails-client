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

  // Format the date with short weekday and month (e.g., "Mon, Jan 20, 2025")
  return dateTime.toLocaleString({
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
