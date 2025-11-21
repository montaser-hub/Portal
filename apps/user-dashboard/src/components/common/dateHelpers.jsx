import { addMinutes, differenceInMinutes, isPast, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Helper to get schedule DateTime with timezone support
 * @private
 */
export const getScheduleDateTime = (schedule, userTimezone) => {
  if (!schedule?.date) return null;

  // Ensure the date is interpreted in the user's timezone as "local midnight"
  const year = Number(schedule.date.slice(0, 4));
  const month = Number(schedule.date.slice(5, 7)) - 1; // JS months are 0–11
  const day = Number(schedule.date.slice(8, 10));

  // Construct a REAL local date in Cairo (not UTC)
  const localMidnight = toZonedTime(
    new Date(year, month, day, 0, 0, 0),
    userTimezone
  );

  // Add shift minutes (0 for midnight)
  return addMinutes(localMidnight, schedule.shift.startTime ?? 0);
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

export const hasShiftStarted = (date, startTime) => {
  if (!date || startTime === undefined) return false;

  const scheduleDate = new Date(date);
  const now = new Date();
  const shiftStart = new Date(scheduleDate);
  shiftStart.setHours(Math.floor(startTime / 60), startTime % 60, 0, 0);

  return now >= shiftStart;
};

export const formatTime = (minutes) => {
  if (minutes === undefined || minutes === null) return '-';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
