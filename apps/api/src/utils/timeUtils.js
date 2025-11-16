/**
 * Converts 12-hour or 24-hour time string to total minutes since midnight.
 *
 * Accepts:
 * - "8:30 AM", "12:00 PM"
 * - "16:00", "23:59"
 *
 * @param {string} str - Time string in 12-hour or 24-hour format
 * @returns {number} Total minutes since midnight (0-1439)
 *
 * @example
 * timeStringToMinutes("12:00 AM") // 0 (midnight)
 * timeStringToMinutes("8:30 AM")  // 510
 * timeStringToMinutes("12:00 PM") // 720 (noon)
 * timeStringToMinutes("11:59 PM") // 1439
 */
export function timeStringToMinutes(str) {
  // Extract time components using regex
  // Joi already validated format, so this will always match
  // 12-hour format
  const match = str.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if ( match ) {
    let [ _, h, m, modifier ] = match;
    let hours = parseInt( h, 10 );
    const minutes = parseInt( m, 10 );

    // Convert 12-hour format to 24-hour format
    if ( modifier.toUpperCase() === "PM" && hours !== 12 ) {
      hours += 12; // 1 PM → 13, 2 PM → 14, ..., 11 PM → 23
    } else if ( modifier.toUpperCase() === "AM" && hours === 12 ) {
      hours = 0; // 12 AM → 0 (midnight)
    }
    // Note: 12 PM stays as 12 (noon)

    // Convert to total minutes since midnight
    return hours * 60 + minutes;
  }

  // 24-hour format
  const match2 = str.match(/^(\d{1,2}):(\d{2})$/);
  if ( match2 ) {
    let [ _, h, m ] = match2;
    const hours = parseInt( h, 10 );
    const minutes = parseInt( m, 10 );
    return hours * 60 + minutes;
  }
  throw new Error(`Invalid time string: ${str}`);
}

/**
 * Converts total minutes since midnight to 12-hour or 24-hour time string.
 *
 * @param {number} totalMinutes - Minutes since midnight (0-1439)
 * @returns {string|number} Time string in 12-hour or 24-hour format (e.g., "8:30 AM", "12:00 PM") or original value if not a number
 *
 * @example
 * minutesToTimeString(0)    // "12:00 AM" (midnight)
 * minutesToTimeString(510)  // "8:30 AM"
 * minutesToTimeString(720)  // "12:00 PM" (noon)
 * minutesToTimeString(1439) // "11:59 PM"
 */
export function minutesToTimeString(totalMinutes) {
  // return as-is if not a number
  if (typeof totalMinutes !== "number") {
    return totalMinutes;
  }

  // Convert total minutes to hours and minutes
  const hours24 = Math.floor(totalMinutes / 60); // 0-23
  const minutes = totalMinutes % 60; // 0-59

  // Determine AM/PM period
  const ampm = hours24 >= 12 ? "PM" : "AM";

  // Convert 24-hour to 12-hour format
  // 0 → 12 AM, 1-11 → 1-11 AM, 12 → 12 PM, 13-23 → 1-11 PM
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  // Format: "H:MM AM/PM" with zero-padded minutes
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

/**
 * Calculate shift duration in minutes, supporting overnight shifts.
 *
 * @param {number} startMinutes - Start time in minutes (0-1439)
 * @param {number} endMinutes - End time in minutes (0-1439)
 * @returns {number} Duration in minutes
 *
 * @example
 * calculateShiftDuration(480, 1020)  // 8:00 AM → 5:00 PM = 540 minutes (9 hours)
 * calculateShiftDuration(1320, 360)  // 10:00 PM → 6:00 AM = 600 minutes (10 hours)
 */
export function calculateShiftDuration(startMinutes, endMinutes) {
  if (endMinutes >= startMinutes) {
    // Same-day shift
    return endMinutes - startMinutes;
  } else {
    // Overnight shift (crosses midnight)
    return (1440 - startMinutes) + endMinutes;
  }
}

/**
 * Check if a shift crosses midnight.
 *
 * @param {number} startMinutes - Start time in minutes (0-1439)
 * @param {number} endMinutes - End time in minutes (0-1439)
 * @returns {boolean} True if shift crosses midnight
 *
 * @example
 * isOvernightShift(480, 1020)   // 8:00 AM → 5:00 PM = false
 * isOvernightShift(1320, 360)   // 10:00 PM → 6:00 AM = true
 */
export function isOvernightShift(startMinutes, endMinutes) {
  return endMinutes < startMinutes;
}

/**
 * Format duration in minutes to human-readable string.
 *
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration (e.g., "8 hours 30 minutes")
 *
 * @example
 * formatDuration(540)  // "9 hours"
 * formatDuration(510)  // "8 hours 30 minutes"
 * formatDuration(45)   // "45 minutes"
 */
export function formatDuration(minutes) {
  if (minutes === 0) return '0 minutes';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} minute${mins !== 1 ? 's' : ''}`;
  }

  if (mins === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }

  return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''}`;
}
