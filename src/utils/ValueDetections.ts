export function detectValueinString(keys: string[], str: string) {
  for (const key of keys) {
    const regex = new RegExp(`\\b${key}\\b`, "i");
    if (regex.test(str)) {
      return key;
    }
  }
  return null;
}

export function extractNumberFromString(str: string) {
  const match = str.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}
