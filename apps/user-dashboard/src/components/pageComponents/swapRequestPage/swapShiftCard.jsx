import { Clock, CalendarDays, Repeat2, UserCheck, CalendarCheck, Building } from 'lucide-react';
import Text from '../../common/Text';

function Detail({ label, value, icon }) {
  return (
  <Text
  as="p"
  MyClass="text-gray-700 text-sm mb-1 flex items-center gap-2"
  content={
    <>
      {icon}
      <span className="font-semibold text-gray-600">{label}:</span> {value}
    </>
  }
/>
  )
}

export default function ShiftCard( { title, schedule, userFullName } ) {
  return (
    <div className="flex-1 p-3 rounded-xl border border-[#0F7B8A]/20 bg-gray-50">
      <Text as="h4" content={title} MyClass="text-sm font-semibold text-gray-700 mb-2" />
      <Detail
        icon={<CalendarCheck className='text-teal-500' size={14} />}
        label="Name"
        value={schedule?.shiftId?.shiftName}
      />
      <Detail
        icon={<Repeat2 className='text-teal-500' size={14} />}
        label="Type"
        value={schedule?.shiftId?.shiftType}
      />
      <Detail
        icon={<Clock className='text-teal-500' size={14} />}
        label="Time"
        value={`${schedule?.shiftId?.startTimeFormatted} → ${schedule?.shiftId?.endTimeFormatted}`}
      />
      <Detail
        icon={<Building className='text-teal-500' size={14} />}
        label="Sub-Department"
        value={schedule?.subDepartmentId?.name}
      />
      <Detail
        icon={<CalendarDays className='text-teal-500' size={14} />}
        label="Date"
        value={new Date(schedule?.date).toDateString()}
      />
      <Detail
        icon={<UserCheck className='text-teal-500' size={14} />}
        label="User Name"
        value={userFullName}
      />
    </div>
  );
}
