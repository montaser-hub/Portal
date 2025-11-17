import { addMinutes, differenceInMinutes, isPast, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

/**
 * Helper to get schedule DateTime with timezone support
 * @private
 */
const getScheduleDateTime = (schedule, userTimezone = null) => {
  const scheduleDate = new Date(schedule.date);
  return addMinutes(scheduleDate, schedule.shift.startTime);
};


/**
 * Formats schedule date for display
 * @param {Object} schedule - Schedule object
 * @param {string} userTimezone - Optional: User's timezone
 * @returns {string} Formatted date string
 */
export const formatScheduleDate = (schedule, userTimezone = null) => {
  if (!schedule?.date) {
    return 'Date not available';
  }

  try {
    const scheduleDate = new Date(schedule.date);
    const formatPattern = 'EEEE, MMMM d, yyyy';

    if (userTimezone) {
      return formatInTimeZone(scheduleDate, userTimezone, formatPattern);
    }

    return format(scheduleDate, formatPattern);
  } catch (error) {
    console.error('Error formatting schedule date:', error);
    return 'Date not available';
  }
};

/**
 * Extracts schedule dates for calendar display
 * @param {Array} schedules - Array of schedule objects
 * @returns {Array<string>} Array of date strings
 */
export const getScheduleDates = (schedules) => {
  if (!Array.isArray(schedules)) return [];
  return schedules.map((s) => s.date).filter(Boolean);
};
