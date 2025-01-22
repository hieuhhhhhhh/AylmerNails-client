import { DateTime } from "luxon";

export default function dateToUnixTime(date) {
  // Parse the date string using Luxon and set it to Toronto timezone
  const torontoDateTime = DateTime.fromISO(date, { zone: "America/Toronto" });

  // Convert the date to Unix timestamp (seconds)
  const unixTimestamp = torontoDateTime.toSeconds();

  return unixTimestamp;
}
