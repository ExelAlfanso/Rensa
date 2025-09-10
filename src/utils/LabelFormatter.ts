export function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1") // insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
}

export function formatLabelFirstLetter(key: string): string {
  key = key.toLowerCase();
  return key.charAt(0).toUpperCase() + key.slice(1);
}
