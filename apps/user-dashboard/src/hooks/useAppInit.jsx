import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUpcomingSchedules,
  fetchSchedules,
} from '../features/schedule/scheduleThunks';

export default function useAppInit() {
  const dispatch = useDispatch();
  const schedulesInitializedRef = useRef(false);
  const { user, status: userStatus } = useSelector((state) => state.user);
  const { allSchedulesStatus, upcomingSchedulesStatus } = useSelector(
    (state) => state.schedule
  );

  useEffect(() => {
    // Reset on logout
    if (userStatus === 'loggedOut') {
      schedulesInitializedRef.current = false;
      return;
    }

    // Wait for authenticated user
    if (!user || userStatus !== 'succeeded') {
      return;
    }

    // Prevent duplicate fetches
    if (schedulesInitializedRef.current) return;

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
