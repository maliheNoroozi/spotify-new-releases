/**
 * Formats a given date string or Date object into a localized format.
 * @param {string | Date} date - The date string or Date object to format.
 * @param {Intl.DateTimeFormatOptions} [options] - Optional Intl.DateTimeFormat options.
 * @returns {string} - Formatted date string based on the user's locale.
 */
export function formatDateByLocale(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  // Convert to a Date object if the input is a string
  const dateObj = typeof date === "string" ? new Date(date) : date

  // Check for invalid date
  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date provided:", date)
    return "Invalid date"
  }

  // Get the user's locale (default to "en-US" if unavailable)
  const userLocale: string = navigator.language || "en-US"

  // Default options for formatting
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }

  // Merge user options with default options
  const formatOptions: Intl.DateTimeFormatOptions = {
    ...defaultOptions,
    ...options,
  }

  // Format the date using the user's locale
  return new Intl.DateTimeFormat(userLocale, formatOptions).format(dateObj)
}
