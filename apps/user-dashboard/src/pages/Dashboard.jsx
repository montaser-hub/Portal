import { getTimeUntilShift, getUpcomingShift, getUserShiftDates } from '../components/common/dateHelpers';
import { swapRequests, notes, shifts } from "../components/common/mockData";
import Badge from '../components/common/Badge';
import Text from '../components/common/Text';
import ErrorMessage from '../components/common/ErrorMessage';
import CalendarComponent from '../components/pageComponents/dashboardHome/CalendarComponent';
import UpcomingShiftCard from '../components/pageComponents/dashboardHome/UpcomingShiftCard';
import NotesCard from '../components/pageComponents/dashboardHome/NotesCard';
import SwapRequestsList from '../components/pageComponents/dashboardHome/SwapRequestsList';
import HeartbeatSpinner from "../components/common/Spinner2";
import { useSelector } from "react-redux";


function Dashboard({ onNavigate }) {
  const { user, status, error } = useSelector((state) => state.user);

  if (status === 'idle' || status === 'loading') return <HeartbeatSpinner />;
  if (status === 'failed') return <ErrorMessage errorMessage={error} />;

  const upcomingShift = getUpcomingShift(shifts, user._id);
  const userShiftDates = getUserShiftDates(shifts, user.id);
  const timeUntil = upcomingShift ? getTimeUntilShift(upcomingShift) : null;
  const featuredUpcomingShift = upcomingShift || shifts.find(s => s.id === 1);

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#F8F9FA] min-h-screen">
      <div className="space-y-1">
        <Text
          as="h1"
          MyClass="text-2xl font-normal text-[#0F7B8A]"
          content={
            <>Welcome back, <span className="font-semibold italic">{user.firstName || ''} {user.lastName || ''}</span></>
          }
        />
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <Badge variant="outline">{user.role}</Badge>
          <Text as="span" content="•" />
          <Text as="span" content={<>Unit: {user.department?.name}</>} />
          <Text as="span" content="•" />
          <Badge variant="outline">{user.level?.name}</Badge>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingShiftCard shift={featuredUpcomingShift} timeUntil={timeUntil} />
        <CalendarComponent shiftDates={userShiftDates} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotesCard notes={notes} maxItems={3} />
        <SwapRequestsList requests={swapRequests} currentUserId={user.id} />
      </div>


    </div>
  );
}

export default Dashboard;

