import { DateTime } from "luxon";

export default function secsToHours(secs) {
  console.log("calling");

  return DateTime.fromObject({ hour: 0 })
    .plus({ seconds: secs })
    .toFormat("h:mm a");
}
