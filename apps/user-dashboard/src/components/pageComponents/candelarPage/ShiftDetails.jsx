import { Clock, User as UserIcon, Calendar as CalendarIcon, Timer, Building2, Repeat2, CalendarCheck, AlertTriangle } from "lucide-react";
import Badge from "../../common/Badge";
import Separator from "./Separator";
import { getShiftColor } from "./Calendar";
import Text from "../../common/Text";
import { format, isBefore, startOfDay } from 'date-fns';

export default function ShiftDetails({ selectedDate, selectedDateShifts }) {
  const formattedDate = selectedDate
    ? format(selectedDate, 'EEEE, MMMM d')
    : "Select a date";

  return (
    <div className={`border-l pl-6 space-y-4`}>
      {/* Date Header */}
      <div>
        <Text
          as="h3"
          content={formattedDate}
          className="font-semibold text-gray-500"
        />
        <Text
          as="p"
          content={`${selectedDateShifts.length} schedule${selectedDateShifts.length !== 1 ? "s" : ""}`}
          className="text-sm text-gray-500"
        />
      </div>

      <Separator />

      {/* Shifts List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {selectedDateShifts.length > 0 ? selectedDateShifts.map((sched) => {
          const shift = sched?.shift;
          const user = sched?.user;
          const subDept = sched?.subDepartment;
          const start = shift?.startTimeFormatted;
          const end = shift?.endTimeFormatted;
          const duration = shift?.durationFormatted;
          const isOvernight = shift?.isOvernight;
          const isPastShift = selectedDate && isBefore(selectedDate, startOfDay(new Date()));
          return (
            <div key={sched._id || sched.id} className={`p-4 rounded-lg border space-y-3  ${isPastShift ? 'bg-red-50 border-red-200' : ''}`}>
              {isPastShift && (
                <div className="flex items-center gap-2 p-2 bg-red-100 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <Text
                    as="span"
                    content="Completed Schedule"
                    className="text-sm text-red-700 font-medium"
                  />
                </div>
              )}
              {/* Shift Status Badges */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getShiftColor(sched)}>
                  {sched?.isActive === false ? "Inactive" : "Active"}
                </Badge>
                {shift.shiftType && (
                  <Badge variant="outline" className={getShiftColor(sched)}>
                    <Repeat2 className="h-4 w-4 mr-1" />
                    {shift?.shiftName}
                  </Badge>
                )}
              </div>

              {/* Shift Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-teal-500" />
                  <Text
                    as="span"
                    content={`${start} - ${end} ${isOvernight ? "(overnight)" : ""}`}
                    className="text-sm text-gray-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-teal-500" />
                  <Text as="span" content={user?.fullName} className="text-sm text-gray-600" />
                </div>

                <div className="space-y-2 text-sm">
                  {/* Shift Name */}
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-teal-500" />
                    <Text as="span" content={shift?.shiftType} className="text-sm text-gray-600" />
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-teal-500" />
                    <Text as="span" content={duration} className="text-sm text-gray-600" />
                  </div>

                  {/* Sub Department */}
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-teal-500" />
                    <Text as="span" content={subDept?.name} className="text-sm text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          // Empty State
          <div className="text-center py-8">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-[#6B7280] opacity-50" />
            <Text as="p" content="No shifts scheduled" className="text-sm text-[#6B7280]" />
          </div>
        )}
      </div>
    </div>
  );
}
