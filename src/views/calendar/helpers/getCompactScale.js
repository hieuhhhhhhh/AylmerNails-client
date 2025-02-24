import secsToLength from "./secsToLength";

export default function getCompactScale(dayStart, dayEnd, newWidth) {
  console.log("dayStart", dayStart);

  const oldWidth = secsToLength(Math.abs(dayEnd - dayStart));
  console.log("oldWidth", oldWidth);
  const value = newWidth / oldWidth;
  return value;
}
