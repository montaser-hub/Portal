import Button from "../../common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDaysInMonth, getShiftsForDate, getShiftColor } from "./Calendar";
import Text from "../../common/Text";

// ---------------- Month View Grid ----------------
export default function MonthView({ currentDate, setCurrentDate, selectedDate, setSelectedDate, filter }) {
  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <Text as="h2" content={monthName} MyClass=" font-semibold text-gray-500" />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-[#6B7280] py-2">{day}</div>
        ))}

        {days.map((date, index) => {
          const dayShifts = getShiftsForDate(date, filter);
          const isToday = date && date.toDateString() === new Date().toDateString();
          const isSelected = date && selectedDate && date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              onClick={() => date && setSelectedDate(date)}
              className={`min-h-[120px] p-2 border rounded-lg cursor-pointer transition-all ${!date ? 'bg-gray-100/50 cursor-default' :
                  isSelected ? `bg-[#0F7B8A]/10 border-[#0F7B8A] shadow-sm` :
                    isToday ? `bg-[#0F7B8A]/5 border-[#0F7B8A]` :
                      `bg-white border-[#E5E7EB] hover:bg-gray-50/50`
                }`}
            >
              {date && (
                <>
                  <div className={`text-sm mb-2 ${isSelected ? `text-[#0F7B8A]` : isToday ? `text-[#0F7B8A]` : 'text-[#2C3E50]'}`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayShifts.map((shift) => (
                      <div key={shift.id} className={`px-2 py-1 rounded text-xs border ${getShiftColor(shift)}`}>
                        <div className="truncate">{shift.startTime}</div>
                        {filter === 'department' && shift.assignedUserName && (
                          <div className="truncate text-xs opacity-75">{shift.assignedUserName.split(' ')[0]}</div>
                        )}
                      </div>
                    ))}
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
          <div className="w-4 h-4 rounded" style={{ backgroundColor: `#0F7B8A1A`, borderColor: `#0F7B8A33`, borderWidth: '1px' }}></div>
          <span className="text-sm text-[#6B7280]">Assigned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
          <span className="text-sm text-[#6B7280]">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: `#E74C3C1A`, borderColor: `#E74C3C33`, borderWidth: '1px',  borderStyle: 'solid' }}></div>
          <span className="text-sm text-[#6B7280]">Open/Unassigned</span>
        </div>
      </div>
    </div>
  );
}
