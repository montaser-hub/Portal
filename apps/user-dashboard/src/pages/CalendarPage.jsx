import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/common/Card";
import MonthView from "../components/pageComponents/candelarPage/MonthView";
import ShiftDetails from "../components/pageComponents/candelarPage/ShiftDetails";
import Text from "../components/common/Text";
import { fetchUpcomingSchedules, fetchSchedules } from "../features/schedule/scheduleThunks";
import Button from "../components/common/Button";

export default function CalendarPage() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState("personal");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { upcomingSchedules = [], allSchedules = [] } = useSelector((state) => state.schedule || {}
);
  const { user } = useSelector((state) => state.user || {});

  useEffect(() => {
    // schedule of only current user
    dispatch(fetchUpcomingSchedules({ userId: user?.id }));

    // All schedules for department awhole
    dispatch(fetchSchedules());
  }, [dispatch, user?.id]);

  // slect shifts for the selected date based on filter
  const selectedDateShifts = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split("T")[0];
    const baseSchedules = filter === "department" ? allSchedules : upcomingSchedules;
      return baseSchedules.filter((sched) => {
      const schedDate = (sched.date).split("T")[0];
      if (!schedDate || schedDate !== dateStr) return false;
      if (filter === "personal") {
        const assignedUserId =  sched?.user?.id ;
        const currentUserId =    user?.id;
        return assignedUserId && currentUserId && assignedUserId === currentUserId;
      }
      return true;
    });
  }, [upcomingSchedules, allSchedules, selectedDate, filter, user]);

  return (
    <div className="p-8 space-y-6 bg-0F7B8A">
      <div className="flex items-center justify-between">
        <div>
          <Text
            as="h1"
            content="Schedule Calendar"
            MyClass="text-3xl font-semibold text-[#0F7B8A] mb-2"
          />
          <Text
            as="p"
            MyClass="text-gray-600"
            content="View and manage your schedules"
          />
        </div>

        {/*  filter (personal, department) */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setFilter("personal")}
            className={`px-3 py-1 rounded ${filter === "personal" ? "bg-[#0F7B8A] text-white" : "bg-white border"}`}  >
            Personal
          </Button>
          <Button
            onClick={() => setFilter("department")}
            className={`px-3 py-1 rounded ${filter === "department" ? "bg-[#0F7B8A] text-white" : "bg-white border"}`}  >
            Department
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Card className={`p-6 shadow-sm border bg-white`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MonthView
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filter={filter}
              schedules={filter === "department" ? allSchedules : upcomingSchedules}
              currentUser={user}
            />
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

