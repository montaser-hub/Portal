import { currentUser, shifts } from "../../common/mockData";

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
  if (shift.status === 'Assigned') return `bg-[#0F7B8A]/10 text-[#0F7B8A] border-[#0F7B8A]/20`;
  if (shift.status === 'Open') return `bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20`;
  return 'bg-[#E8EEF1/20 text-[#2C3E50] border-[#E5E7EB]';
};
