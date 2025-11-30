import { toZonedTime } from 'date-fns-tz';

/**
 * Returns true if the shift has not started yet (button should show)
 * @param {object} schedule - schedule object with `date` and `shiftId.startTime`
 */
export default function CanModify(schedule) {
  if (!schedule || !schedule?.shiftId) return false;
  if(!schedule?.status?.includes(['approved', 'rejected'])) return false;
  // Convert shift startTime (minutes) to hours/minutes
  const hours = Math.floor(schedule?.shift?.startTime / 60);
  const minutes = schedule?.shift?.startTime % 60;

  // Convert schedule.date to Date object in Africa/Cairo timezone
  const scheduleDate = toZonedTime(new Date(schedule?.date), 'Africa/Cairo');

  // Set the shift start time
  scheduleDate.setHours(hours, minutes, 0, 0);

  // Current time in Africa/Cairo timezone
  const now = toZonedTime(new Date(), 'Africa/Cairo');

  // Show button only if shift has not started
  return now < scheduleDate;
}
