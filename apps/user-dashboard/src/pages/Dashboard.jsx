import { getScheduleDates } from '../components/common/dateHelpers';
// import { swapRequests, notes } from "../components/common/mockData";
import Badge from '../components/common/Badge';
import Text from '../components/common/Text';
import CalendarComponent from '../components/pageComponents/dashboardHome/CalendarComponent';
import UpcomingscheduleCard from '../components/pageComponents/dashboardHome/UpcomingscheduleCard';
// import NotesCard from '../components/pageComponents/dashboardHome/NotesCard';
// import SwapRequestsList from '../components/pageComponents/dashboardHome/SwapRequestsList';
import HeartbeatSpinner from "../components/common/Spinner2";
import { useSelector, useDispatch } from 'react-redux';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchNearestSchedule } from '../features/schedule/scheduleThunks';
import { useEffect } from 'react';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, userStatus, userError } = useSelector((state) => state.user);
  const { upcomingSchedules, upcomingSchedulesStatus, nearestSchedule, nearestScheduleStatus } = useSelector((state) => state.schedule);

  useEffect(() => {
    if (user) {
      dispatch(
        fetchNearestSchedule({ timezone: user.timezone || 'Africa/Cairo' })
      );
    }
  }, [ user, dispatch ] );

  if (userStatus === 'idle' || userStatus === 'loading' || upcomingSchedulesStatus === 'loading' || nearestScheduleStatus === 'loading') return <HeartbeatSpinner />;
  if (userStatus === 'failed') return <ErrorMessage errorMessage={userError} />;


  const userScheduleDates = getScheduleDates(upcomingSchedules);


  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#F8F9FA] min-h-screen">
      <div className="space-y-1">
        <Text
          as="h1"
          MyClass="text-2xl font-normal text-[#0F7B8A]"
          content={
            <>
              Welcome back,{' '}
              <Text as="span" content={user?.nickname } MyClass="font-semibold italic" />
            </>
          }
        />
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <Badge variant="outline">{user?.role}</Badge>
          <Text as="span" content="•" />
          <Text as="span" content={<>Unit: {user?.department?.name}</>} />
          <Text as="span" content="•" />
          <Badge variant="outline">{user?.level?.name}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingscheduleCard schedule={nearestSchedule} />
        <CalendarComponent schedulesDates={userScheduleDates} />
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotesCard notes={notes} maxItems={3} />
        <SwapRequestsList requests={swapRequests} currentUserId={user.id} />
      </div> */}
    </div>
  );
}
