export default function getCompactScale(oldWidth, newWidth) {
  console.log("oldWidth", oldWidth);
  const value = (newWidth - 6) / oldWidth;
  return value;
}
