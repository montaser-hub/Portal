import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  parseISO
} from 'date-fns';

// Get all days for month with padding
export const getDaysInMonth = (date) => {
  const firstDay = startOfMonth(date);
  const lastDay = endOfMonth(date);
  const startingDayOfWeek = getDay(firstDay);

  const days = [];

  // Add padding for days before month start
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add month days
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  days.push(...daysInMonth);

  return days;
};

// Parse ISO date to Date object
const parseDate = (isoDate) => {
  if (!isoDate) return null;
  try {
    return parseISO(isoDate.split("T")[0]);
  } catch {
    return null;
  }
};

// Filter schedules for specific date
export const getShiftsForDate = (date, filter, schedules = [], currentUser = null) => {
  if (!date) return [];

  return schedules.filter((sched) => {
    const schedDate = parseDate(sched.date);
    if (!schedDate) return false;

    if (!isSameDay(date, schedDate)) return false;

    if (filter === "personal") {
      const assignedUserId = sched?.user?.id;
      const currentUserId = currentUser?.id;
      return assignedUserId && currentUserId && assignedUserId === currentUserId;
    }

    return true;
  });
};

// Get color class based on shift type and status
export const getShiftColor = (schedule) => {
  if (!schedule) return "bg-white";

  const isActive = schedule?.isActive !== false;
  const isOvernight = schedule?.shift?.isOvernight || false;
  const shiftType = schedule?.shift?.shiftType;

  // Weekend shifts are always inactive and gray
  if (shiftType === "Weekend") return "bg-gray-100 text-gray-700 border-gray-300";


  if (!isActive) return "bg-gray-100 text-gray-700 border-gray-300";
  if (isOvernight || schedule?.shift?.shiftName === "Night Shift" ) return "bg-yellow-50 text-[#B45309] border-yellow-200";

  // Color mapping for active shift types
  const shiftColors = {
    "On Call": "bg-orange-50 text-orange-700 border-orange-200",
    "Evening": "bg-orange-50 text-orange-700 border-orange-200",
    "Morning": "bg-green-50 text-green-700 border-green-200",
    "Night": "bg-blue-50 text-blue-700 border-blue-200"
  };

  return shiftColors[shiftType] || "bg-[#0F7B8A]/10 text-[#0F7B8A] border-[#0F7B8A]/20";
};
