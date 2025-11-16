import { timeStringToMinutes,  calculateShiftDuration } from './timeUtils.js';

/**
 * Validates that end time is after start time.
 * SUPPORTS OVERNIGHT SHIFTS (e.g., 10:00 PM → 6:00 AM)
 *
 * Rules:
 * - If endTime > startTime: Normal same-day shift (e.g., 8:00 AM → 5:00 PM)
 * - If endTime < startTime: Overnight shift (e.g., 10:00 PM → 6:00 AM)
 * - If endTime === startTime: Invalid (0-hour shift)
 * - Maximum shift duration: 16 hours (configurable)
 *
 * @param {string} value - The endTime value being validated
 * @param {object} helpers - Joi helpers object
 * @returns {string|Error} Returns value if valid, or error if invalid
 */
export function validateEndTimeAfterStartTime(value, helpers) {
  const { startTime } = helpers.state.ancestors[0];

  // Skip validation if startTime is not provided (update scenario)
  if (!startTime) return value;

  const startMinutes = typeof startTime === 'string' ? timeStringToMinutes(startTime) : startTime;
  const endMinutes = typeof value === 'string' ? timeStringToMinutes(value) : value;

  if (endMinutes === startMinutes) {
    return helpers.message('"endTime" cannot be the same as "startTime"');
  }

  const duration = calculateShiftDuration(startMinutes, endMinutes);
  if (duration > 16 * 60) {
    return helpers.message('"endTime" exceeds maximum allowed shift duration of 16 hours');
  }

  return value;
}
