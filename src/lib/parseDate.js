import { DateTime } from "luxon";
import getTimezone from "./getTimeZone";

export default function dateToUnixTime(date) {
  // Parse the date string using Luxon and set it to Toronto timezone
  const torontoDateTime = DateTime.fromISO(date, { zone: getTimezone() });

  // Convert the date to Unix timestamp (seconds)
  const unixTimestamp = torontoDateTime.toSeconds();

  console.log("date to unix: ", unixTimestamp);

  return unixTimestamp;
}
