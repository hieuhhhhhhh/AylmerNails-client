import { DateTime } from "luxon";

export default function parseTime(timeInput) {
  console.log("calling");

  if (!timeInput) {
    return 0;
  }

  // Parse the input time string using Luxon
  const time = DateTime.fromFormat(timeInput, "HH:mm");

  // Check if the parsing is successful
  if (!time.isValid) {
    throw new Error("Invalid time format");
  }

  // Calculate the number of seconds since midnight
  const secondsSinceMidnight = time.hour * 3600 + time.minute * 60;

  return secondsSinceMidnight;
}
