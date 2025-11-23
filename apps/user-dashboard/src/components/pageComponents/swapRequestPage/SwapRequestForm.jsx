import { useSelector } from 'react-redux';
import Text from '../../common/Text';
import Button from '../../common/Button';

export default function SwapRequestForm({ formData, onChange, onSubmit }) {
  const {
    allSchedules,
    upcomingSchedules,
    allSchedulesStatus,
    upcomingSchedulesStatus,
  } = useSelector((state) => state.schedule);


  const loading =
    allSchedulesStatus === 'loading' || upcomingSchedulesStatus === 'loading';
  const isSubmitDisabled =
    !formData.currentShift || !formData.swapWith || loading;
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
        <Text as="h2" content="Step 1: Create Swap Request" MyClass="text-lg font-medium text-[#0F7B8A] mb-2" />
        <Text as="p" content="Fill in the details below to initiate a swap." MyClass="text-sm text-gray-600 mb-4"  />
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
              <option value="">Select your Schedule</option>
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
              <option value="">Select target Schedule</option>
              {loading ? (
                <option>Loading schedules...</option>
              ) : (
                allSchedules.map( ( sched ) => {
                  const userId = sched.user?._id || '';
                  const toScheduleId = sched._id || '';
                  // Combine scheduleId + userId with a separator
                  const optionValue = `${toScheduleId}___${userId}`;
                  return (
                    <option key={ sched._id } value={ optionValue }>
                      { formatScheduleOption( sched ) }
                    </option>
                  );
                })
              )}
            </select>
          </div>
          {/* Optional Message */}
          <textarea
            name="message"
            value={formData.message || ''}
            onChange={onChange}
            placeholder="Optional message"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A] outline-none"
          />

          {/* Submit Button */}
          <Button
            onClick={onSubmit}
            disabled={isSubmitDisabled}
            className={`py-2 px-4 rounded-lg text-white font-medium ${
              isSubmitDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#0F7B8A] hover:bg-[#0c656c] cursor-pointer'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </div>
    </div>
  );
}
