import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUpcomingSchedules,
  fetchSchedules,
} from '../features/schedule/scheduleThunks';
import { resetSchedulesState } from '../features/schedule/ScheduleSlice';


export default function useAppInit() {
  const dispatch = useDispatch();
  const schedulesInitializedRef = useRef(false);
  const { user, status: userStatus } = useSelector((state) => state.user);
  const { allSchedulesStatus, upcomingSchedulesStatus } = useSelector(
    (state) => state.schedule
  );

  useEffect(() => {
    // // Reset on logout
    if (userStatus === 'loggedOut') {
      dispatch(resetSchedulesState());
      schedulesInitializedRef.current = false;
      return;
    }

    // Wait for authenticated user
    if (!user || userStatus !== 'succeeded') {
      console.log('⏳ Waiting for user authentication...');
      return;
    }

    // Prevent duplicate fetches
    if (schedulesInitializedRef.current) return;

    console.log('📅 Initializing schedules for user:', user.fullName);
    schedulesInitializedRef.current = true;

    // Fetch schedules
    if (upcomingSchedulesStatus === 'idle') {
      dispatch(fetchUpcomingSchedules({ userId: user._id }));
    }

    if (allSchedulesStatus === 'idle') {
      dispatch(
        fetchSchedules({
          departmentId: user.departmentId,
          excludeUserId: user._id,
        })
      );
    }
  }, [user, userStatus, dispatch, upcomingSchedulesStatus, allSchedulesStatus]);
}
