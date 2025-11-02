import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
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
} from "date-fns";
import { Card } from "../../common/Card";
import { COLORS } from "../../common/colors";
import Text from "../../common/Text";
import Button from "../../common/Button";

export function CalendarComponent({ shiftDates }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const shiftDateStrings = useMemo(
    () =>
      shiftDates.map((d) => {
        if (typeof d === "string") return d;
        return format(d, "yyyy-MM-dd");
      }),
    [shiftDates]
  );

  const header = format(currentDate, "MMMM yyyy");
  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
    let formattedDate = "";
    let dayKey = 0;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "yyyy-MM-dd");
        const cloneDay = day;

        const isShiftDay = shiftDateStrings.includes(formattedDate);
        const isPastDay = isBefore(startOfDay(cloneDay), startOfDay(new Date()));
        const isToday = isSameDay(cloneDay, new Date());

        let backgroundStyle = {};
        if (isShiftDay && isPastDay) {
          backgroundStyle = { backgroundColor: `${COLORS.primary}80` };
        } else if (isShiftDay && isToday) {
          backgroundStyle = { backgroundColor: "#FFA500" };
        } else if (isShiftDay) {
          backgroundStyle = { backgroundColor: COLORS.primary };
        } else if (isToday) {
          backgroundStyle = { backgroundColor: "#FFD580" };
        }
        days.push(
          <div
            key={dayKey++}
            className={`p-1 flex items-center justify-center text-sm cursor-pointer transition`}
          >
            <span
              className={`h-8 w-8 flex items-center justify-center rounded-full
                ${!isSameMonth(cloneDay, monthStart) ? "text-gray-300" : "text-gray-700"}
                ${isShiftDay ? "text-white" : ""}
              `}
              style={backgroundStyle}
            >
              {format(cloneDay, "d")}
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
    <Card className="space-y-2">
      <div className="px-4 pt-4 flex items-center gap-2 text-gray-800">
        <CalendarIcon className="h-5 w-5 text-[#0F7B8A]" />
        <Text as="span" MyClass="font-normal" content="Your Schedule" />
      </div>

      <div className="p-4 space-y-4">
        {/* 🔹 شريط التنقل */}
        <div className="flex items-center justify-between">
          <Button
            onClick={prevMonth}
            variant="secondary"
            className="p-1 rounded-full"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </Button>

          <span className="font-semibold text-gray-800 text-sm">{header}</span>

          <Button
            onClick={nextMonth}
            variant="secondary"
            className="p-1 rounded-full"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* 🔹 أسماء الأيام */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          {dayLabels.map((day) => (
            <div key={day} className="h-6 w-6 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* 🔹 الأيام */}
        {renderDays()}
      </div>
    </Card>
  );
}

export default CalendarComponent;
