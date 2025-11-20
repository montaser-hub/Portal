import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  isBefore,
  startOfDay,
  parseISO,
} from 'date-fns';
import Card from '../../common/Card';
import Text from '../../common/Text';
import Button from '../../common/Button';

export default function CalendarComponent({ schedulesDates = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Normalize all schedule dates to yyyy-MM-dd format
  const shiftDateStrings = useMemo(() => {
    if (!Array.isArray(schedulesDates) || schedulesDates.length === 0) {
      return [];
    }

    return schedulesDates
      .map((d) => {
        if (!d) return null;

        try {
          // Handle ISO string dates from API (e.g., "2025-11-30T00:00:00.000Z")
          if (typeof d === 'string') {
            // Check if already in yyyy-MM-dd format
            if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
              return d;
            }
            // Parse ISO string
            const date = parseISO(d);
            return format(date, 'yyyy-MM-dd');
          }

          // Handle Date objects
          if (d instanceof Date) {
            return format(d, 'yyyy-MM-dd');
          }

          return null;
        } catch (error) {
          console.error('Error parsing date:', d, error);
          return null;
        }
      })
      .filter(Boolean); // Remove null values
  }, [schedulesDates]);

  const header = format(currentDate, 'MMMM yyyy');
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const renderDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const cloneDay = day;

        // Compare formattedDate string with the array
        const isShiftDay = shiftDateStrings.includes(formattedDate);
        const isPastDay = isBefore(
          startOfDay(cloneDay),
          startOfDay(new Date())
        );
        const isToday = isSameDay(cloneDay, new Date());

        // Determine background style based on conditions
        let backgroundStyle = {};
        let textColorClass = '';

        if (isShiftDay && isPastDay) {
          // Past shift day - muted teal
          backgroundStyle = { backgroundColor: '#0F7B8ACC' };
          textColorClass = 'text-white';
        } else if (isShiftDay && isToday) {
          // Today's shift - orange
          backgroundStyle = { backgroundColor: '#FFA500' };
          textColorClass = 'text-white font-semibold';
        } else if (isShiftDay) {
          // Future shift day - full teal
          backgroundStyle = { backgroundColor: '#0F7B8A' };
          textColorClass = 'text-white';
        } else if (isToday) {
          // Today (no shift) - light orange
          backgroundStyle = { backgroundColor: '#FFD580' };
          textColorClass = 'text-gray-800 font-semibold';
        } else {
          // Regular days
          textColorClass = !isSameMonth(cloneDay, monthStart)
            ? 'text-gray-300'
            : 'text-gray-700';
        }

        days.push(
          <div
            key={`${formattedDate}-${i}`}
            className="p-1 flex items-center justify-center text-sm cursor-pointer transition hover:opacity-80"
          >
            <span
              className={`h-8 w-8 flex items-center justify-center rounded-full transition-all
                ${textColorClass}
              `}
              style={backgroundStyle}
              title={
                isShiftDay ? `Shift scheduled: ${formattedDate}` : undefined
              }
            >
              {format(cloneDay, 'd')}
            </span>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-1" key={rows.length}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <Card className="space-y-2 bg-white border-gray-200">
      {/* Header */}
      <div className="px-4 pt-4 flex items-center gap-2 text-gray-800">
        <CalendarIcon className="h-5 w-5 text-[#0F7B8A]" />
        <Text as="span" MyClass="font-normal text-gray-500" content="Your Schedule"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={prevMonth}
            variant="secondary"
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </Button>

          <span className="font-semibold text-gray-800 text-sm">{header}</span>

          <Button
            onClick={nextMonth}
            variant="secondary"
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          {dayLabels.map((day) => (
            <div key={day} className="h-6 w-6 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        {renderDays()}

        {/* Legend */}
        {shiftDateStrings.length > 0 && (
          <div className="flex items-center justify-center gap-4 text-xs pt-2 border-t border-gray-200 mt-2">
            <div className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: '#0F7B8A' }}
              ></div>
              <Text as="span" MyClass="text-gray-600" content="Scheduled" />
            </div>
            <div className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: '#FFD580' }}
              ></div>
              <Text as="span" MyClass="text-gray-600" content="Today" />
            </div>
            <div className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: '#0F7B8ACC' }}
              ></div>
              <Text as="span" MyClass="text-gray-600" content="Past" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

