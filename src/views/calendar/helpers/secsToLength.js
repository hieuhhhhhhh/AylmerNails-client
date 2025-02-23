export default function secsToLength(seconds) {
  const lengthPerHour = 140;
  const lengthPerSec = lengthPerHour / 60 / 60;
  return seconds * lengthPerSec;
}
