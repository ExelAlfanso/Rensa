export function detectValueinString(keys: string[], str: string) {
  for (const key of keys) {
    if (str.toLowerCase().includes(key.toLowerCase())) {
      // console.log(`Detected ${key} in ${str}`);
      return key;
    }
  }

  return null;
}

export function extractNumberFromString(str: string) {
  const match = str.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

export function extractModelFromString(str: string) {
  // Match patterns like "Canon EOS 5D Mark IV" or "Nikon D850"
  const modelRegex =
    /\b([A-Za-z]+(?:\s[A-Za-z0-9]+)*\s\d+[A-Za-z0-9]*(?:\sMark\s[IVX]+)?)\b/;
  const match = str.match(modelRegex);
  return match ? match[1] : null;
}
