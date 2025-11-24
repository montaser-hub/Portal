

// Get all days (with padding) for a given month
export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
  for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
  return days;
};

// Convert ISO date to YYYY-MM-DD
const dateToYMD = (isoDate) => {
  if (!isoDate) return null;
  return (isoDate || "").split("T")[0];
};

// Filter schedules for a specific date (and optional personal filter)
export const getShiftsForDate = (date, filter, schedules = [], currentUser = null) => {
  if (!date) return [];
  const dateStr = date.toISOString().split("T")[0];
  return schedules.filter((sched) => {
    const schedDate = dateToYMD(sched.date);
    if (!schedDate) return false;
    if (schedDate !== dateStr) return false;
    if (filter === "personal") {
      const assignedUserId = sched?.user?.id;
      const currentUserId =  currentUser?.id;
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
