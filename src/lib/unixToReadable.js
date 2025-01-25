import { DateTime } from "luxon";
import getTimezone from "./getTimeZone";

export default function unixToReadable(unixTimestamp) {
  // Convert the Unix timestamp to a Luxon DateTime object in Toronto timezone
  const dateTime = DateTime.fromMillis(unixTimestamp * 1000).setZone(
    getTimezone()
  );

  // Format the date in a readable way (e.g., "January 20, 2025")
  const readableDate = dateTime.toLocaleString(DateTime.DATE_FULL);

  return readableDate;
}
