import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import Text from '../../common/Text';
import Button from '../../common/Button';
import { Calendar, Clock, User, ChevronDown, UserCheck, RefreshCw, CheckCircle } from 'lucide-react';
import Card from '../../common/Card';

// Custom Select Component with Lucide Icons
export function CustomSelect({ name, value, onChange, options, placeholder, loading }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        className="w-full text-left flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2"
      >
        <div className="flex-1 overflow-hidden">
          {selectedOption ? selectedOption.label : <Text as="span" content={placeholder} MyClass="text-gray-500" />}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <Text as="div" content="Loading schedules..." MyClass="px-3 py-2 text-gray-500" />
          ) : options.length === 0 ? (
            <Text as="div" content="No options available" MyClass="px-3 py-2 text-gray-500" />
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-3 py-2 cursor-pointer hover:bg-[#E0F4F6] ${
                  value === option.value ? 'bg-blue-50' : ''
                }`}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// Format schedule option with icons
export function ScheduleOption({ sched }) {
  const shift = sched.shift || {};
  const user = sched.user || {};
  const subDep = sched.subDepartment || {};
  const date = new Date(sched.date).toLocaleDateString();

  return (
    <div className="flex items-center gap-2 text-sm flex-wrap">
      <Text as="span" content={subDep.name || '-'} MyClass="font-medium" />
      <Text as="span" content="—" MyClass="text-gray-400" />
      <span className="flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5 text-[#0F7B8A]" />
        <Text as="span" content={date} MyClass="" />
      </span>
      <span className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5 text-[#0F7B8A]" />
        <Text as="span" content={`${shift.startTimeFormatted || '-'} - ${shift.endTimeFormatted || '-'}`} MyClass="" />
      </span>
      <span className="flex items-center gap-1">
        <User className="w-3.5 h-3.5 text-[#0F7B8A]" />
        <Text as="span" content={user.fullName || '-'} MyClass="" />
      </span>
    </div>
  );
}

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
