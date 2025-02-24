export default function getCompactScale(oldWidth, newWidth) {
  const value = newWidth / oldWidth;
  return `scale (${value})`;
}
