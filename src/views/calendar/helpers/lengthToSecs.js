import { lengthPerHour } from "./secsToLength";

export default function secsToLength(length) {
  const hours = length / lengthPerHour;
  const secs = hours * 60 * 60;
  return secs;
}
