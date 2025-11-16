import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUpcomingSchedules,
  fetchSchedules,
} from '../features/schedule/scheduleThunks';

export default function useAppInit(user) {
  const dispatch = useDispatch();
  const { allSchedulesStatus, upcomingSchedulesStatus } = useSelector(
    (state) => state.schedule
  );

  useEffect(() => {
    if (!user) return;

    // Upcoming shifts for current user
    if (upcomingSchedulesStatus === 'idle') {
      dispatch(fetchUpcomingSchedules({ userId: user._id }));
    }

    // Department schedules (exclude current user's shifts)
    if (allSchedulesStatus === 'idle') {
      dispatch(
        fetchSchedules({
          departmentId: user.departmentId,
          excludeUserId: user._id,
        })
      );
    }
  }, [user, upcomingSchedulesStatus, allSchedulesStatus]);
}
