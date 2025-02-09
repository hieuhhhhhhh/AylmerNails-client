export default function secondsToClock(seconds) {
  if (isNaN(seconds) || seconds < 0) return;

  const hours = Math.floor(seconds / 3600) % 24;
  const minutes = Math.floor((seconds % 3600) / 60);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${String(formattedHours)}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
}
