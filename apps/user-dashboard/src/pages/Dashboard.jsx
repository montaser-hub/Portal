import React from "react";
import { Badge } from '../components/common/Badge';
import { CalendarComponent } from '../components/pageComponents/dashboardHome/CalendarComponent';
import { UpcomingShiftCard } from '../components/pageComponents/dashboardHome/UpcomingShiftCard';
import { NotesCard } from '../components/pageComponents/dashboardHome/NotesCard';
import { SwapRequestsList } from '../components/pageComponents/dashboardHome/SwapRequestsList';
import { getTimeUntilShift, getUpcomingShift, getUserShiftDates } from '../components/common/dateHelpers';
import Text from '../components/common/Text';
import { currentUser, swapRequests, notes, shifts } from "../components/common/mockData";


  function Dashboard() {
    const upcomingShift = getUpcomingShift(shifts, currentUser.id);
    const userShiftDates = getUserShiftDates(shifts, currentUser.id);
    const timeUntil = upcomingShift ? getTimeUntilShift(upcomingShift) : null;

    // Fallback shift للعرض في حالة عدم وجود shift قادم
    const featuredUpcomingShift = upcomingShift || shifts.find(s => s.id === 1);

    return (
        <div className="p-6 md:p-8 space-y-6 bg-gray-50 min-h-screen">
            {/* Header and User Info */}
            <div className="space-y-1">
            <Text as="h1"  MyClass="text-2xl font-semibold text-gray-800"
            content={<>Welcome back, <strong>{currentUser.name}</strong></>} />
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Badge variant="outline">{currentUser.role}</Badge>
                    <Text as="span" content = {<> Unit:{currentUser.departmentName} </>} />
                    <Text as="span" content = "•" />
                    <Text as="span" content = {<> ID: {currentUser.departmentId} </>} />
                </div>
            </div>

            {/* Top Grid: Upcoming Shift & Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <UpcomingShiftCard
                    shift={featuredUpcomingShift}
                    timeUntil={timeUntil}
                />
                <CalendarComponent shiftDates={userShiftDates} />
            </div>

            {/* Bottom Grid: Notes & Swap Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NotesCard notes={notes} maxItems={3} />
                <SwapRequestsList
                    requests={swapRequests}
                    currentUserId={currentUser.id}
                />
            </div>
        </div>
    );
}

export default Dashboard;

