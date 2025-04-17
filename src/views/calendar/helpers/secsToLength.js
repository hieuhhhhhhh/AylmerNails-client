export const lengthPerHour = 140;

export default function secsToLength(seconds) {
  const lengthPerSec = lengthPerHour / 60 / 60;
  return seconds * lengthPerSec;
}
