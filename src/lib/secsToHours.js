import { DateTime } from "luxon";

export default function secsToHours(secs) {
  console.log(secs);
  return DateTime.fromObject({ hour: 0 })
    .plus({ seconds: secs })
    .toFormat("h:mm a");
}
