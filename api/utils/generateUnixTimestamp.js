/**
 * Utility to generate the current UNIX timestamp or a custom one.
 *
 * @param {Date|string} date - (Optional) A `Date` object or a date string.
 *                             If not provided, the current date and time will be used.
 * @returns {string} - The UNIX timestamp as a string.
 */
function generateUnixTimestamp(date = new Date()) {
  const timestamp = Math.floor(new Date(date).getTime() / 1000);
  return timestamp.toString(); // Convert to string for consistency
}

module.exports=generateUnixTimestamp