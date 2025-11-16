import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../common/Text';
import Button from '../../common/Button';
import { fetchSchedules, fetchUpcomingSchedules } from '../../../features/schedule/scheduleThunks';

export default function SwapRequestForm({ formData, onChange, onSubmit, user }) {
  const dispatch = useDispatch();
  const {
    allSchedules,
    upcomingSchedules,
    allSchedulesStatus,
    upcomingSchedulesStatus,
  } = useSelector((state) => state.schedule);

  // Load schedules on mount
  useEffect(() => {
    if (allSchedulesStatus === 'idle')
      dispatch(
        fetchSchedules({
          departmentId: user.departmentId,
          excludeUserId: user._id,
        })
      );
    if (upcomingSchedulesStatus === 'idle')
      dispatch(fetchUpcomingSchedules({ userId: user._id }));
  }, [dispatch, allSchedulesStatus, upcomingSchedulesStatus]);

  const loading =
    allSchedulesStatus === 'loading' || upcomingSchedulesStatus === 'loading';

  // Format schedule for dropdown
  const formatScheduleOption = (sched) => {
    const shift = sched.shift || {};
    const user = sched.user || {};
    const subDep = sched.subDepartment || {};
    const date = new Date(sched.date).toLocaleDateString();
    return `${subDep.name || '-'} — 📅 ${date} ⏰ ${shift.startTimeFormatted || '-'} - ${shift.endTimeFormatted || '-'} 👤 ${user.fullName || '-'}`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
        <Text
          as="h2"
          content="Step 1: Create Swap Request"
          MyClass="text-lg font-medium text-[#0F7B8A] mb-2"
        />
        <Text
          as="p"
          content="Fill in the details below to initiate a swap."
          MyClass="text-sm text-gray-600 mb-4"
        />
        <form className="space-y-4">
          {/* Current User Shift */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your selected Shift
            </label>
            <select
              name="currentShift"
              value={formData.currentShift}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A]"
            >
              <option value="">Select your shift</option>
                {loading ? (
                <option>Loading schedules...</option>
                ) : (
                  upcomingSchedules.map((sched) => (
                  <option key={sched._id} value={sched._id}>
                    {formatScheduleOption(sched)}
                  </option>
                  ))
                )}
            </select>
          </div>

          {/* Swap With Shift */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Swap With
            </label>
            <select
              name="swapWith"
              value={formData.swapWith}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A]"
            >
              <option value="">Select target shift</option>
                {loading ? (
                <option>Loading schedules...</option>
                ) : (
                  allSchedules.map((sched) => (
                  <option key={sched._id} value={sched._id}>
                    {formatScheduleOption(sched)}
                  </option>
                  ))
                )}
            </select>
        </div>

        <Button onClick={onSubmit}>Submit Request</Button>
        </form>
      </div>
    </div>
  );
}
