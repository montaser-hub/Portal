// import { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../components/common/Card";
// import MonthView from "../components/pageComponents/candelarPage/MonthView";
// import ShiftDetails from "../components/pageComponents/candelarPage/ShiftDetails";
// import Text from "../components/common/Text";
// import { fetchUpcomingSchedules, fetchSchedules } from "../features/schedule/scheduleThunks";
// import Button from "../components/common/Button";
// import HeartbeatSpinner from "../components/common/Spinner2";
// import { parseISO, isSameDay } from 'date-fns';

// export default function CalendarPage() {
//   const dispatch = useDispatch();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [filter, setFilter] = useState("personal");
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const { upcomingSchedules, allSchedules } = useSelector((state) => state.schedule);
//   const { user } = useSelector((state) => state.user);
//   const scheduleStatus = useSelector((state) => state.schedule.upcomingSchedulesStatus);

//   useEffect(() => {
//     // Schedule of only current user
//     dispatch(fetchUpcomingSchedules({ userId: user?.id }));
//     // All schedules for department as a whole
//     dispatch(
//       fetchSchedules({
//         excludeUserId: user?.id,
//         departmentId: user?.departmentId,
//       })
//     );
//   }, [dispatch, user?.id]);

//   // Select shifts for the selected date based on filter
//   const selectedDateShifts = useMemo(() => {
//     if (!selectedDate) return [];
//     const baseSchedules = filter === "department" ? allSchedules : upcomingSchedules;
//     return baseSchedules.filter((sched) => {
//       // Parse the schedule date
//       const schedDate = parseISO(sched.date.split("T")[0]);
//       if (!schedDate) return false;
//       // Check if dates match
//       if (!isSameDay(selectedDate, schedDate)) return false;
//       // Apply personal filter
//       if (filter === "personal") {
//         const assignedUserId = sched?.user?.id;
//         const currentUserId = user?.id;
//         return assignedUserId && currentUserId && assignedUserId === currentUserId;
//       }
//       return true;
//     });
//   }, [upcomingSchedules, allSchedules, selectedDate, filter, user]);

//   const isLoading = scheduleStatus === 'loading';

//   return (
//     <div className="p-8 space-y-6 bg-0F7B8A">
//       <div className="flex items-center justify-between">
//         <div>
//           <Text
//             as="h1"
//             content="Schedule Calendar"
//             MyClass="text-3xl font-semibold text-[#0F7B8A] mb-2"
//           />
//           <Text
//             as="p"
//             MyClass="text-gray-600"
//             content="View and manage your schedules"
//           />
//         </div>

//         {/* Filter (personal, department) */}
//         <div className="flex items-center gap-2">
//           <Button
//             variant="base"
//             onClick={() => setFilter("personal")}
//             className={`px-6 py-1 rounded-lg ${filter === "personal" ? "bg-[#0F7B8A] hover:bg-[#0c656c] text-white" : "bg-white border hover:bg-gray-100"}`}
//           >
//             Personal
//           </Button>
//           <Button
//             variant="base"
//             onClick={() => setFilter("department")}
//             className={`px-6 py-1 rounded-lg ${filter === "department" ?  "bg-[#0F7B8A] hover:bg-[#0c656c] text-white" : "bg-white border hover:bg-gray-100"}`}
//           >
//             Department
//           </Button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         <Card className={`p-6 shadow-sm border bg-white`}>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {isLoading ? (
//               <HeartbeatSpinner />
//             ) : upcomingSchedules && (
//               <>
//                 <MonthView
//                   currentDate={currentDate}
//                   setCurrentDate={setCurrentDate}
//                   selectedDate={selectedDate}
//                   setSelectedDate={setSelectedDate}
//                   filter={filter}
//                   schedules={filter === "department" ? allSchedules : upcomingSchedules}
//                   currentUser={user}
//                 />
//                 <ShiftDetails
//                   selectedDate={selectedDate}
//                   selectedDateShifts={selectedDateShifts}
//                 />
//               </>
//             )}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

// CalendarPage.jsx
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/common/Card";
import MonthView from "../components/pageComponents/candelarPage/MonthView";
import ShiftDetails from "../components/pageComponents/candelarPage/ShiftDetails";
import Text from "../components/common/Text";
import { fetchUpcomingSchedules, fetchSchedules } from "../features/schedule/scheduleThunks";
import Button from "../components/common/Button";
import HeartbeatSpinner from "../components/common/Spinner2";
import { parseISO, isSameDay } from 'date-fns';

export default function CalendarPage() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState("personal");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { upcomingSchedules, allSchedules } = useSelector((state) => state.schedule);
  const { user } = useSelector((state) => state.user);
  const scheduleStatus = useSelector((state) => state.schedule.upcomingSchedulesStatus);

  // Fetch schedules on component mount
  useEffect(() => {
    dispatch(fetchUpcomingSchedules({ userId: user?.id }));
    dispatch(
      fetchSchedules({
        excludeUserId: user?.id,
        departmentId: user?.departmentId,
      })
    );
  }, [dispatch, user?.id]);

  // Get shifts for selected date based on filter
  const selectedDateShifts = useMemo(() => {
    if (!selectedDate) return [];
    const baseSchedules = filter === "department" ? allSchedules : upcomingSchedules;
    return baseSchedules.filter((sched) => {
      const schedDate = parseISO(sched.date.split("T")[0]);
      if (!schedDate) return false;
      if (!isSameDay(selectedDate, schedDate)) return false;
      if (filter === "personal") {
        const assignedUserId = sched?.user?.id;
        const currentUserId = user?.id;
        return assignedUserId && currentUserId && assignedUserId === currentUserId;
      }
      return true;
    });
  }, [upcomingSchedules, allSchedules, selectedDate, filter, user]);

  const isLoading = scheduleStatus === 'loading';

  return (
    <div className="p-8 space-y-6 bg-0F7B8A">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text
            as="h1"
            content="Schedule Calendar"
            className="text-3xl font-semibold text-[#0F7B8A] mb-2"
          />
          <Text
            as="p"
            className="text-gray-600"
            content="View and manage your schedules"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="base"
            onClick={() => setFilter("personal")}
            className={`px-6 py-1 rounded-lg ${filter === "personal" ? "bg-[#0F7B8A] hover:bg-[#0c656c] text-white" : "bg-white border hover:bg-gray-100"}`}
          >
            Personal
          </Button>
          <Button
            variant="base"
            onClick={() => setFilter("department")}
            className={`px-6 py-1 rounded-lg ${filter === "department" ?  "bg-[#0F7B8A] hover:bg-[#0c656c] text-white" : "bg-white border hover:bg-gray-100"}`}
          >
            Department
          </Button>
        </div>
      </div>

      {/* Main Calendar Content */}
      <div className="max-w-7xl mx-auto">
        <Card className={`p-6 shadow-sm border bg-white`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <HeartbeatSpinner />
            ) : upcomingSchedules && (
              <>
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
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
