import { currentUser, shifts } from "../../common/mockData";
import { COLORS } from "../../common/colors";

// دوال مساعدة لشبكة التقويم
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

// دوال مساعدة للورديات
export const getShiftsForDate = (date, filter) => {
  if (!date) return [];
  const dateStr = date.toISOString().split('T')[0];
  return shifts.filter(shift =>
    filter === 'personal'
      ? shift.date === dateStr && shift.assignedUserId === currentUser.id
      : shift.date === dateStr
  );
};

export const getShiftColor = (shift) => {
  if (shift.status === 'Completed') return 'bg-gray-100 text-gray-700 border-gray-300';
  if (shift.status === 'Assigned') return `bg-[${COLORS.primary}]/10 text-[${COLORS.primary}] border-[${COLORS.primary}]/20`;
  if (shift.status === 'Open') return `bg-[${COLORS.alert}]/10 text-[${COLORS.alert}] border-[${COLORS.alert}]/20`;
  return 'bg-secondary/20 text-secondary-foreground border-border';
};
