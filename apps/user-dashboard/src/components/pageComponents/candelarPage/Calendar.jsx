import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  parseISO
} from 'date-fns';

// Get all days (with padding) for a given month
export const getDaysInMonth = (date) => {
  const firstDay = startOfMonth(date);
  const lastDay = endOfMonth(date);
  const startingDayOfWeek = getDay(firstDay);

  const days = [];

  // Add empty slots for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add all days of the month
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  days.push(...daysInMonth);

  return days;
};

// Convert ISO date to Date object
const parseDate = (isoDate) => {
  if (!isoDate) return null;
  try {
    return parseISO(isoDate.split("T")[0]);
  } catch {
    return null;
  }
};

// Filter schedules for a specific date (and optional personal filter)
export const getShiftsForDate = (date, filter, schedules = [], currentUser = null) => {
  if (!date) return [];

  return schedules.filter((sched) => {
    const schedDate = parseDate(sched.date);
    if (!schedDate) return false;

    // Check if dates match
    if (!isSameDay(date, schedDate)) return false;

    // Apply personal filter
    if (filter === "personal") {
      const assignedUserId = sched?.user?.id;
      const currentUserId = currentUser?.id;
      return assignedUserId && currentUserId && assignedUserId === currentUserId;
    }

    return true;
  });
};

// Return UI color class based on schedule type/status
export const getShiftColor = (schedule) => {
  if (!schedule) return "bg-white";

  const isActive = schedule?.isActive !== false;
  const isOvernight = schedule?.shift?.isOvernight || false;

  if (!isActive) return "bg-gray-100 text-gray-700 border-gray-300";
  if (isOvernight) return "bg-yellow-50 text-[#B45309] border-yellow-200";

  return `bg-[#0F7B8A]/10 text-[#0F7B8A] border-[#0F7B8A]/20`;
};
