
import { format, addDays } from 'date-fns';

export const currentUser = {
    id: 1,
    name: "Tarek Hamdy",
    role: "Professor",
    departmentName: "ICU",
    departmentId: "ICU-001",
};

export const swapRequests = [
    { id: 1, requesterId: 1, shiftDate: "2025-11-03", shiftTime: "08:00 - 16:00", status: "Pending Manager" },
    { id: 2, requesterId: 1, shiftDate: "2025-10-31", shiftTime: "07:00 - 19:00", status: "Approved" },
    { id: 3, requesterId: 2, shiftDate: "2025-11-02", shiftTime: "08:00 - 16:00", status: "Rejected" },
];

export const notes = [
    { id: 1, title: "Patient Vitals Update", content: "Requires close monitoring. Vitals stable but watch for any changes.", timestamp: "2025-10-27T09:00:00" },
    { id: 2, title: "Staff Meeting Reminder", content: "Monthly staff meeting on Nov 5th at 10 AM in the main conference room.", timestamp: "2025-10-26T14:00:00" },
    { id: 3, title: "Equipment Maintenance", content: "IV Pump #3 needs maintenance. Reported to facilities.", timestamp: "2025-10-25T12:00:00" },
];

export const shifts = [
    { id: 10, assignedUserId: 1, status: "Assigned", date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), startTime: "07:00", endTime: "19:00" },
    { id: 1, assignedUserId: 1, status: "Assigned", date: "2025-10-29", startTime: "07:00", endTime: "19:00" },
    { id: 2, assignedUserId: 1, status: "Assigned", date: "2025-11-03", startTime: "08:00", endTime: "16:00" },
    { id: 3, assignedUserId: 2, status: "Assigned", date: "2025-11-02", startTime: "08:00", endTime: "16:00" },
    { id: 4, assignedUserId: 1, status: "Assigned", date: "2025-11-10", startTime: "16:00", endTime: "00:00" },
    { id: 5, assignedUserId: 1, status: "Assigned", date: "2025-11-15", startTime: "08:00", endTime: "16:00" },
];
