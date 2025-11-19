// lib/formatDate.ts

/**
 * Format a date string into a human-readable format.
 *
 * @param date - The date string or Date object
 * @param locale - (optional) Locale string (default: "en-US")
 * @returns Formatted date string (e.g. "Sep 1, 2025")
 */
export function formatDate(
  date: string | Date,
  locale: string = "en-US"
): string {
  try {
    const d = typeof date === "string" ? new Date(date) : date;

    return d.toLocaleDateString(locale, {
      year: "numeric",
      month: "short", // "Sep"
      day: "numeric", // "1"
    });
  } catch (err) {
    console.error("Invalid date:", date, err);
    return "";
  }
}

export function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: "year", value: 60 * 60 * 24 * 365 },
    { name: "month", value: 60 * 60 * 24 * 30 },
    { name: "day", value: 60 * 60 * 24 },
    { name: "hour", value: 60 * 60 },
    { name: "min", value: 60 },
    { name: "sec", value: 1 },
  ];

  for (const unit of units) {
    const amount = Math.floor(seconds / unit.value);
    if (amount > 0) {
      const plural = amount > 1 ? "s" : "";
      return `${amount} ${unit.name}${plural}`;
    }
  }

  return "0 sec";
}
