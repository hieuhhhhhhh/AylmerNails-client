import { DateTime } from "luxon";
import getTimezone from "./getTimeZone";

export default function getTodayUnixTime() {
  // Define the Toronto time zone
  const timezone = getTimezone();

  // Get the start of today in Toronto time zone (00:00:00)
  const startOfToday = DateTime.now().setZone(timezone).startOf("day");

  console.log("start of today:", startOfToday);

  // Return the Unix timestamp
  console.log("get to day", startOfToday.toUnixInteger());
  return startOfToday.toUnixInteger();
}
