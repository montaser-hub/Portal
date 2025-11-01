import React, { useState } from "react";
import Card from "../components/common/Card";
import CalendarHeader from "../components/pageComponents/candelarPage/CalendarHeader";
import MonthView from "../components/pageComponents/candelarPage/MonthView";
import ShiftDetails from "../components/pageComponents/candelarPage/ShiftDetails";
import { getShiftsForDate } from "../components/pageComponents/candelarPage/Calendar";
import { COLORS  } from "../components/common/colors";

// ---------------- Calendar Page ----------------
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [filter, setFilter] = useState('personal');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateShifts = getShiftsForDate(selectedDate, filter);

  return (
    <div className="p-8 space-y-6 bg-0F7B8A">
          <div className="flex items-center justify-between">
      <div>
        <h1>Schedule Calendar</h1>
        <p className="text-muted-foreground mt-1">View and manage your shifts</p>
      </div>

    </div>
      {/* Header */}
      <CalendarHeader
        filter={filter}
        setFilter={setFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

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
