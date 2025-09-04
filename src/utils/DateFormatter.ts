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
