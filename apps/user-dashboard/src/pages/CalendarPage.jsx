import React, { useState } from "react";
import Card from "../components/common/Card";
import MonthView from "../components/pageComponents/candelarPage/MonthView";
import ShiftDetails from "../components/pageComponents/candelarPage/ShiftDetails";
import { getShiftsForDate } from "../components/pageComponents/candelarPage/Calendar";
import { COLORS  } from "../components/common/colors";
import Text from "../components/common/Text";

// ---------------- Calendar Page ----------------
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState('personal');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateShifts = getShiftsForDate(selectedDate, filter);

  return (
    <div className="p-8 space-y-6 bg-0F7B8A">
          <div className="flex items-center justify-between">
      <div>
        <Text as="h1" content="Schedule Calendar" MyClass="text-2xl font-semibold text-[#0F7B8A]" />
        <Text as="p" MyClass="text-gray-600" content="View and manage your shcedules" />
      </div>

    </div>


      {/* Calendar Grid and Details */}
      <div className="max-w-7xl mx-auto">
          <Card className={`p-6 shadow-sm border ${COLORS.grayBorder} bg-white`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Calendar Grid */}
            <MonthView
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filter={filter}
            />

            {/* Selected Date Details */}
            <ShiftDetails
              selectedDate={selectedDate}
              selectedDateShifts={selectedDateShifts}
            />

          </div>
        </Card>
      </div>
    </div>
  );
}
