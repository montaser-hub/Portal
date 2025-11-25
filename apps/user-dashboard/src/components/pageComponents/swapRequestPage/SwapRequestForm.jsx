import { useSelector } from 'react-redux';
import Text from '../../common/Text';
import Button from '../../common/Button';
import {  UserCheck, RefreshCw, CheckCircle } from 'lucide-react';
import Card from '../../common/Card';
import { CustomSelect, ScheduleOption } from './selectSwap';


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

  // Prepare options for current shift
  const currentShiftOptions = upcomingSchedules.map((sched) => ({
    value: sched._id,
    label: <ScheduleOption sched={sched} />,
  }));

  // Prepare options for swap with
  const swapWithOptions = allSchedules.map((sched) => {
    const userId = sched.user?._id || '';
    const toScheduleId = sched._id || '';
    const optionValue = `${toScheduleId}___${userId}`;
    return {
      value: optionValue,
      label: <ScheduleOption sched={sched} />,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Right: Form */}
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
        <div onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Current User Shift */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your selected Shift
            </label>
            <CustomSelect
              name="currentShift"
              value={formData.currentShift}
              onChange={onChange}
              options={currentShiftOptions}
              placeholder="Select your Schedule"
              loading={loading}
            />
          </div>

          {/* Swap With Shift */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Swap With
            </label>
            <CustomSelect
              name="swapWith"
              value={formData.swapWith}
              onChange={onChange}
              options={swapWithOptions}
              placeholder="Select target Schedule"
              loading={loading}
            />
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
            variant="primary"
            className={isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </div>
      {/* Left: Approval Progress */}
      <Card className="  relative bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
        {/* Horizontal Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-xl">
          <div className="h-1 bg-[#0F7B8A] w-2/3 rounded-t-xl transition-all duration-500"></div>
        </div>

        <div className="flex flex-col space-y-6 mt-2">
          <div className="flex items-center space-x-3">
            <UserCheck className="text-[#0F7B8A]" />
            <div>
              <Text as="p" content="Peer Approval" MyClass="font-medium text-gray-800" />
              <Text as="p" content="Awaiting response..." MyClass="text-sm text-gray-500" />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <RefreshCw className="text-[#0F7B8A]" />
            <div>
              <Text as="p" content="Manager Approval" MyClass="font-medium text-gray-800" />
              <Text as="p" content="Pending review" MyClass="text-sm text-gray-500" />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" />
            <div>
              <Text as="p" content="Final Confirmation" MyClass="font-medium text-gray-800" />
              <Text as="p" content="Auto-confirm after manager approval" MyClass="text-sm text-gray-500" />
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="mt-10 p-4 bg-[#E74C3C]/10 text-[#E74C3C] rounded-lg border border-[#E74C3C]/30">
          <Text as="p" content="Note:" MyClass="font-medium" />
          <Text as="p" content="If your peer declines, the request will be automatically cancelled." MyClass="text-sm" />
        </div>
      </Card>
    </div>
  );
}
