import { DateTime } from "luxon";

export default function secsToHours(secs) {
  return DateTime.fromSeconds(secs).toFormat("h:mm a");
}
