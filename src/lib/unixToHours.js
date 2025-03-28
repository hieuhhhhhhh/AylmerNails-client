import { DateTime } from "luxon";
import getTimezone from "./getTimeZone";

export default function unixToHours(unix) {
  // Create a Luxon DateTime instance from the Unix timestamp (seconds)
  const dt = DateTime.fromSeconds(unix);

  // Convert to Toronto timezone
  const torontoDate = dt.setZone(getTimezone());

  // Format the DateTime to return only the hour in 24-hour format (e.g., "09" or "17")
  return torontoDate.toFormat("h:mm a");
}
