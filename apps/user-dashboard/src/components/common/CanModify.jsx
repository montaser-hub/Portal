export default function CanModify(schedule) {
  if (!schedule) return false;

  // convert date + startTime (minutes) to timestamp
  const [hours, minutes] = [
    Math.floor(schedule?.shiftId?.startTime / 60),
    schedule?.shiftId?.startTime % 60,
  ];
  const scheduleDate = new Date(schedule?.date);
  scheduleDate.setHours(hours, minutes, 0, 0);

  return Date.now() < scheduleDate.getTime();
}
