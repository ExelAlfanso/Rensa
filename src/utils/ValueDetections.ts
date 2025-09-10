export function detectValueinString(keys: string[], str: string) {
  for (const key of keys) {
    const regex = new RegExp(`\\b${key}\\b`, "i");
    if (regex.test(str)) {
      return key;
    }
  }
  return null;
}
