import { Clock, CalendarDays, Repeat2, UserCheck, CalendarCheck, Building } from 'lucide-react';

function Detail({ label, value, icon }) {
  return (
    <p className="text-gray-700 text-sm mb-1 flex items-center gap-2">
      {icon}
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}

export default function ShiftCard( { title, schedule, userFullName } ) {
  return (
    <div className="flex-1 p-3 rounded-xl border border-[#0F7B8A]/20 bg-gray-50">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <Detail
        icon={<CalendarCheck size={14} />}
        label="Name"
        value={schedule?.shiftId?.shiftName}
      />
      <Detail
        icon={<Repeat2 size={14} />}
        label="Type"
        value={schedule?.shiftId?.shiftType}
      />
      <Detail
        icon={<Clock size={14} />}
        label="Time"
        value={`${schedule?.shiftId?.startTimeFormatted} → ${schedule?.shiftId?.endTimeFormatted}`}
      />
      <Detail
        icon={<Building size={14} />}
        label="Sub-Department"
        value={schedule?.subDepartmentId?.name}
      />
      <Detail
        icon={<CalendarDays size={14} />}
        label="Date"
        value={new Date(schedule?.date).toDateString()}
      />
      <Detail
        icon={<UserCheck size={14} />}
        label="User Name"
        value={userFullName}
      />
    </div>
  );
}
