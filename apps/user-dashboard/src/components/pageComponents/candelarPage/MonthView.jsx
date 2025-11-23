

import Button from "../../common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDaysInMonth, getShiftsForDate, getShiftColor } from "./Calendar";
import Text from "../../common/Text";

export default function MonthView({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  filter,
  schedules = [],
  currentUser = null,
}) {
  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const previousMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

return (
  <div className="lg:col-span-2">
    <div className="flex items-center justify-between mb-6">
      <Text as="h2" content={monthName} MyClass=" font-semibold text-gray-500" />
      <div className="flex items-center gap-2">
        <Button onClick={previousMonth}>
          <ChevronLeft className=" h-9 w-9 border border-none rounded-lg hover:bg-[#E0F4F6] transition-colors duration-300" />
        </Button>
        <Button
          className="hover:bg-[#E0F4F6] transition-colors duration-300"
          onClick={() => setCurrentDate(new Date())}
          >
            Today
        </Button>
        <Button onClick={nextMonth}>
          <ChevronRight className= "h-9 w-9 border border-none rounded-lg hover:bg-[#E0F4F6] transition-colors duration-300 " />
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center text-[#6B7280] py-2">{day}</div>
      ))}

      {days.map((date, index) => {
        const dayShifts = date ? getShiftsForDate(date, filter, schedules, currentUser) : [];
        const isToday = date && date.toDateString() === new Date().toDateString();
        const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();
        return (
          <div
            key={index}
            onClick={() => date && setSelectedDate(date)}
            className={`min-h-[120px] p-2 border rounded-lg cursor-pointer transition-all ${
              !date
                ? "bg-gray-100/50 cursor-default"
                : isSelected
                ? `bg-[#0F7B8A]/10 border-[#0F7B8A] shadow-sm`
                : isToday
                ? `bg-[#0F7B8A]/5 border-[#0F7B8A]`
                : `bg-white border-[#E5E7EB] hover:bg-gray-50/50`
            }`}
          >
            {date && (
              <>
                <div className={`text-sm mb-2 ${isSelected ? `text-[#0F7B8A]` : isToday ? `text-[#0F7B8A]` : "text-[#2C3E50]"}`}>
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {dayShifts.map((sched) => {
                    const shift = sched.shift;
                    const shiftName = shift.shiftName;
                    const shiftType = shift.shiftType;
                    const start = shift.startTimeFormatted;
                    const end = shift.endTimeFormatted;
                    const isOvernight = shift.isOvernight;
                    return (
                      <div key={sched._id || sched.id} className={`px-2 py-1 rounded text-xs border ${getShiftColor(sched)}`}>
                        <div >{start} To {end} {isOvernight ? "• overnight" : ""}</div>
                        <div className="text-xs opacity-80">{shiftName}</div>
                        <div className="text-xs opacity-80">{shiftType}</div>
                        {filter === "department" && sched.user && (
                          <div className="truncate text-xs opacity-80">{sched.user.fullName }</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>

    {/* Legend */}
    <div className={`flex items-center gap-6 mt-6 pt-6 border-t border-[#E5E7EB]`}>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: `#0F7B8A1A`, borderColor: `#0F7B8A33`, borderWidth: "1px" }}></div>
        <Text as="span" content="Assigned / Active" MyClass="text-sm text-[#6B7280]" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
        <Text as="span" content="Unassigned / Inactive" MyClass="text-sm text-[#6B7280]" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: `#FDE68A`, borderColor: `#FCD34D`, borderWidth: "1px", borderStyle: "solid" }}></div>
        <Text as="span" content="Overnight" MyClass="text-sm text-[#6B7280]" />
      </div>
    </div>
  </div>
);
}
