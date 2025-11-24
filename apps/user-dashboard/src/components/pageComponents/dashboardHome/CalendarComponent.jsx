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

  const shiftDateStrings = useMemo(() => {
    if (!Array.isArray(schedulesDates) || schedulesDates.length === 0) {
      return [];
    }

    const today = startOfDay(new Date());

    return schedulesDates
      .map((d) => {
        if (!d) return null;

        try {
          if (typeof d === 'string') {
            let parsedDate;
            if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
              parsedDate = parseISO(d);
              return { formatted: d, date: parsedDate };
            }
            parsedDate = parseISO(d);
            return { formatted: format(parsedDate, 'yyyy-MM-dd'), date: parsedDate };
          }

          if (d instanceof Date) {
            return { formatted: format(d, 'yyyy-MM-dd'), date: d };
          }

          return null;
        } catch (error) {
          console.error('Error parsing date:', d, error);
          return null;
        }
      })
      .filter(Boolean)
      .filter(item => !isBefore(startOfDay(item.date), today))
      .map(item => item.formatted);
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
        const isShiftDay = shiftDateStrings.includes(formattedDate);
        const isToday = isSameDay(cloneDay, new Date());
        let backgroundStyle = {};
        let textColorClass = '';

        if (isShiftDay && isToday) {
          backgroundStyle = { backgroundColor: '#FFA500' };
          textColorClass = 'text-white font-semibold';
        } else if (isShiftDay) {
          backgroundStyle = { backgroundColor: '#0F7B8A' };
          textColorClass = 'text-white';
        } else if (isToday) {
          backgroundStyle = { backgroundColor: '#FFD580' };
          textColorClass = 'text-gray-800 font-semibold';
        } else {
          textColorClass = !isSameMonth(cloneDay, monthStart)
            ? 'text-gray-300'
            : 'text-gray-700';
        }

        days.push(
          <div
            key={`${formattedDate}-${i}`}
            className="p-1 flex items-center justify-center text-sm cursor-pointer transition hover:opacity-80 text-center"
          >
            <Text
              as="span"
              content={format(cloneDay, 'd')}
              MyClass={`h-8 w-8 flex items-center justify-center rounded-full transition-all text-center ${textColorClass}`}
              style={backgroundStyle}
              title={isShiftDay ? `Shift scheduled: ${formattedDate}` : undefined}
            />
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
      <div className="px-4 pt-4 flex items-center gap-2 text-gray-800">
        <CalendarIcon className="h-5 w-5 text-[#0F7B8A]" />
        <Text as="span" MyClass="font-normal text-gray-500" content="Your Schedule" />
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={prevMonth}
            variant="outline"
            className="p-1 rounded-full hover:bg-[#E0F4F6] transition-colors duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Text as="span" MyClass="font-semibold text-gray-600 text-sm" content={header} />

          <Button
            onClick={nextMonth}
            variant="outline"
            className="p-1 rounded-full hover:bg-[#E0F4F6] transition-colors duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Names of Weekdays */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          {dayLabels.map((day) => (
            <div key={day} className="h-8 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {renderDays()}

        {shiftDateStrings.length > 0 && (
          <div className="flex items-center justify-center gap-4 text-xs pt-2 border-t border-gray-200 mt-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#0F7B8A' }}></div>
              <Text as="span" MyClass="text-gray-600" content="Scheduled" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FFD580' }}></div>
              <Text as="span" MyClass="text-gray-600" content="Today" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FFA500' }}></div>
              <Text as="span" MyClass="text-gray-600" content="Today(Scheduled)" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
