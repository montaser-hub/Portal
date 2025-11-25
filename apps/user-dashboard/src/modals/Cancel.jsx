//TODO: add cancel confirmation modal to be global instead only specific to schedules
import { X, Calendar, Clock, Building2, AlertTriangle  } from 'lucide-react';
import Text from '../components/common/Text';
import Button from '../components/common/Button';
export default function CancelConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  schedule,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <X size={24} className="text-red-300" />
          </div>
          <Text as="h2" content="Cancel Schedule" MyClass="text-xl font-semibold text-gray-700" />
        </div>

        <div className="mb-6 space-y-3">
          <Text as="p" content="Are you sure you want to cancel this schedule?" MyClass="text-gray-600" />
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-500" />
              <Text as="p"  MyClass="font-medium text-gray-700"
                content={schedule?.date &&
                new Date(schedule.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',  })}
                />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-gray-500" />
              <Text as="span" MyClass="text-gray-600"
                content={`${schedule?.shift?.startTimeFormatted} - ${schedule?.shift?.endTimeFormatted}`}  />

            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building2 size={16} className="text-gray-500" />
              <Text as="span" MyClass="font-medium text-gray-600" content= {schedule?.subDepartment?.name} />
            </div>
          </div>
          <Text
            as="p"
            content={
              <>
                <AlertTriangle className="inline mr-1 text-red-500 " />
                <Text as="span" content="This action cannot be undone." MyClass="font-medium text-red-500" />
              </>
            }
          />

        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            disabled={loading}
            variant="secondary"
            className="flex-1 px-4 py-2.5 border-gray-300 text-gray-700"
          >
          Keep Schedule
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            variant="alert"
            className="flex-1 px-4 py-2.5"
          >
            {loading ? 'Cancelling...' : 'Yes, Cancel'}
          </Button>
        </div>
      </div>
    </div>
  );
}
