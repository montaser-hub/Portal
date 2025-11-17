import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUpcomingSchedules,
  fetchSchedules,
} from '../features/schedule/scheduleThunks';

export default function AppInitializer({ user }) {
  const dispatch = useDispatch();
  const { allSchedulesStatus, upcomingSchedulesStatus } = useSelector(
    (state) => state.schedule
  );

  useEffect(() => {
    if (user) {
      // Fetch upcoming shifts (user-specific)
      if (upcomingSchedulesStatus === 'idle') {
        dispatch(fetchUpcomingSchedules({ userId: user._id }));
      }

      // Fetch department schedules (global)
      if (allSchedulesStatus === 'idle') {
        dispatch(
          fetchSchedules({
            departmentId: user.departmentId,
            excludeUserId: user._id,
          })
        );
      }
    }
  }, [user, allSchedulesStatus, upcomingSchedulesStatus]);

}
