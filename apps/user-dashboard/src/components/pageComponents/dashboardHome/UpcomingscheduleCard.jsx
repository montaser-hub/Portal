import { Clock, AlertCircle, Calendar } from 'lucide-react';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Text from '../../common/Text';
import CountdownTimer from '../../common/CountdownTimer';
import { formatScheduleDate } from '../../common/dateHelpers';
import { addMinutes, differenceInSeconds } from 'date-fns';

export default function UpcomingscheduleCard({schedule}) {
  // Check if starting soon (less than 1 hour)
  const isStartingSoon =
    schedule?.date && schedule?.shift?.startTime
      ? differenceInSeconds(
          addMinutes(new Date(schedule.date), schedule?.shift?.startTime),
          new Date()
        ) < 3600
      : false;
  return (
    <Card className="p-6 space-y-4 lg:col-span-2 bg-white border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-800">
          <Clock className="h-5 w-5 text-[#0F7B8A]" />
          <Text as="h3" MyClass="font-normal text-gray-500" content="Upcoming Schedule"  />
        </div>
        {isStartingSoon && (
          <Badge
            variant="destructive"
            className="ml-auto bg-[#E74C3C] text-white"
          >
            Starting Soon
          </Badge>
        )}
      </div>

      {schedule ? (
        <div className="space-y-4">
          {/* Shift Type Badge */}
          {schedule.shift?.shiftType && (
            <Badge
              variant="outline"
              className="bg-[#0F7B8A]/10 text-[#0F7B8A] border-[#0F7B8A]/20"
            >
              {schedule.shift.shiftType} - {schedule.shift.shiftName}
            </Badge>
          )}

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-[#E8EEF1]/20 rounded-lg border border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Text as="p" MyClass="text-gray-500 text-sm font-normal" content="Date"  />
              </div>
              <Text as="p" MyClass="font-normal text-gray-800" content={formatScheduleDate(schedule)}  />
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-1">
                <Text as="p" MyClass="text-gray-500 text-sm" content="Time" />
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <Text as="p"MyClass="font-medium text-gray-800"
              content={`${schedule.shift?.startTimeFormatted} - ${schedule.shift?.endTimeFormatted}`} />
              {schedule.shift?.durationFormatted && (
                <Text as="p" MyClass="text-xs text-gray-500 mt-1" content={`(${schedule.shift.durationFormatted})`}  />
              )}
            </div>
          </div>

          {/* Department Info */}
          {(schedule.department || schedule.subDepartment) && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              {schedule.department && (
                <Text as="p" MyClass="text-sm text-gray-700 font-medium" content={schedule.department.name}  />
              )}
              {schedule.subDepartment && (
                <Text as="p" MyClass="text-xs text-gray-500 mt-0.5" content={schedule.subDepartment.name}  />
              )}
            </div>
          )}

          {/* Live Countdown Timer */}
          <div
            className={`p-6 rounded-lg border transition-all duration-300
              ${
                isStartingSoon
                  ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-md'
                  : 'bg-gradient-to-br from-[#0F7B8A]/5 to-blue-50 border-[#0F7B8A]/20'
              }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle
                className={`h-5 w-5 ${
                  isStartingSoon
                    ? 'text-red-600 animate-pulse'
                    : 'text-[#0F7B8A]'
                }`}
              />
              <Text as="p"MyClass="text-gray-600 text-sm font-medium" content="Time until schedule"  />
            </div>
            <CountdownTimer
              schedule={schedule}
              className={isStartingSoon ? 'text-red-600' : 'text-[#0F7B8A]'}
            />
          </div>
        </div>
      ) : (
        <Text as="p" MyClass="text-gray-500 py-8 text-center" content="No upcoming schedules"  />
      )}
    </Card>
  );
}
