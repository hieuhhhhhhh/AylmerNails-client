import { DateTime } from "luxon";
import getTimezone from "./getTimeZone";

export default function unixTimeToDate(unixTime) {
  // Convert the Unix timestamp to a DateTime object
  const dateTime = DateTime.fromMillis(unixTime * 1000);

  // Convert to Toronto timezone
  const torontoDate = dateTime.setZone(getTimezone());

  // Format the date and time as 'YYYY-MM-DD' for input compatibility
  const formattedDate = torontoDate.toFormat("yyyy-MM-dd");

  // Return the formatted date
  return formattedDate;
}
