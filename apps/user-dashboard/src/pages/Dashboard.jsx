import { getScheduleDates } from '../components/common/dateHelpers';
// import { swapRequests, notes } from "../components/common/mockData";
import Badge from '../components/common/Badge';
import Text from '../components/common/Text';
import CalendarComponent from '../components/pageComponents/dashboardHome/CalendarComponent';
import UpcomingscheduleCard from '../components/pageComponents/dashboardHome/UpcomingscheduleCard';
// import NotesCard from '../components/pageComponents/dashboardHome/NotesCard';
// import SwapRequestsList from '../components/pageComponents/dashboardHome/SwapRequestsList';
import HeartbeatSpinner from "../components/common/Spinner2";
import { useSelector } from 'react-redux';
import ErrorMessage from '../components/common/ErrorMessage';


export default function Dashboard() {
  const { user, userStatus, userError } = useSelector((state) => state.user);
  const { upcomingSchedules, upcomingSchedulesStatus } = useSelector((state) => state.schedule);

  if (userStatus === 'idle' || userStatus === 'loading' || upcomingSchedulesStatus === 'loading') return <HeartbeatSpinner />;
  if (userStatus === 'failed') return <ErrorMessage errorMessage={userError} />;

  const upcomingSchedule = upcomingSchedules[0] || null;

  const userScheduleDates = getScheduleDates(upcomingSchedules);


  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#F8F9FA] min-h-screen">
      <div className="space-y-1">
        <Text as="h1" MyClass="text-2xl font-normal text-[#0F7B8A]"
          content={<>Welcome back, <span className="font-semibold italic">{user?.nickname || user?.fullName} </span></>} />
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <Badge variant="outline">{user?.role}</Badge>
          <Text as="span" content="•" />
          <Text as="span" content={<>Unit: {user?.department?.name}</>} />
          <Text as="span" content="•" />
          <Badge variant="outline">{user?.level?.name}</Badge>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingscheduleCard schedule={upcomingSchedule} />
        <CalendarComponent schedulesDates={userScheduleDates} />
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotesCard notes={notes} maxItems={3} />
        <SwapRequestsList requests={swapRequests} currentUserId={user.id} />
      </div> */}


    </div>
  );
}
