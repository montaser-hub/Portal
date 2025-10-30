import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
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
} from 'date-fns';
import { Card } from '../../common/Card';
import { COLORS } from '../../common/colors';

export function CalendarComponent({ shiftDates }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const shiftDateStrings = useMemo(() =>
        shiftDates.map(d => {
            // إذا كان التاريخ string نستخدمه مباشرة، وإلا نحوله
            if (typeof d === 'string') return d;
            return format(d, 'yyyy-MM-dd');
        }),
        [shiftDates]
    );
    const header = format(currentDate, 'MMMM yyyy');
    const dateFormat = 'd';
    const renderDays = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isShiftDay = shiftDateStrings.includes(format(cloneDay, 'yyyy-MM-dd'));
                const isCurrentMonth = isSameMonth(cloneDay, monthStart);
                const isSelectedDay = isSameDay(cloneDay, new Date());
                let dayClasses = `p-1 h-8 w-8 text-center text-sm rounded-full cursor-pointer transition-colors flex items-center justify-center`;
                if (!isCurrentMonth) {
                    dayClasses += ' text-gray-400';
                } else if (isShiftDay) {
                    dayClasses += ` bg-[${COLORS.primary}] text-white font-bold hover:bg-[${COLORS.primary}]/80`;
                } else if (isSelectedDay) {
                    dayClasses += ` bg-gray-200 text-gray-900 font-medium`;
                } else {
                    dayClasses += ` text-gray-700 hover:bg-gray-100`;
                }
                days.push(
                    <div
                        key={day}
                        className="flex justify-center items-center p-0.5"
                    >
                        <span className={dayClasses}>
                            {formattedDate}
                        </span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div className="grid grid-cols-7 gap-1" key={day.toString()}>{days}</div>);
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };
    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };
    const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
        <Card className="space-y-2">
            <div className="px-4 pt-4 flex items-center gap-2 text-gray-800">
                <CalendarIcon className="h-5 w-5" />
                <h3 className="font-medium">Your Schedule</h3>
            </div>
            <div className="p-4 space-y-4">
                {/* Header with Navigation */}
                <div className="flex items-center justify-between">
                    <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="font-semibold text-gray-800 text-sm">
                        {header}
                    </span>
                    <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
                {/* Day Labels */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
                    {dayLabels.map(day => (
                        <div key={day} className="h-6 w-6 flex items-center justify-center">{day}</div>
                    ))}
                </div>
                {/* Days Grid */}
                {renderDays()}
            </div>
        </Card>
    );
}

export default CalendarComponent;
