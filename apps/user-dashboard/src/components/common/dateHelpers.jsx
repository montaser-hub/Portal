export const getTimeUntilShift = (shift) => {
    const shiftDateTime = new Date(`${shift.date}T${shift.startTime}`);
    const now = new Date();
    const diff = shiftDateTime.getTime() - now.getTime();

    if (diff <= 0) return 'Shift is over';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (days > 0) return `${days} days ${remainingHours} hrs`;
    if (hours > 1) return `${hours} hours`;
    if (hours > 0) return 'Less than 1 hour';
    return 'Starting Soon';
};

export const getUpcomingShift = (shifts, userId) => {
    return shifts
        .filter(s => s.assignedUserId === userId && s.status === 'Assigned')
        .sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`))
        .find(s => new Date(`${s.date}T${s.startTime}`) > new Date());
};

export const getUserShiftDates = (shifts, userId) => {
    return shifts
        .filter(s => s.assignedUserId === userId && s.status === 'Assigned')
        .map(s => s.date);
};
