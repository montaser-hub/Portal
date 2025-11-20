//TODO: add cancel confirmation modal to be global instead only specific to schedules
import { X, Calendar, Clock, Building2 } from 'lucide-react';
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
            <X size={24} className="text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Cancel Schedule
          </h2>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-gray-600">
            Are you sure you want to cancel this schedule?
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-gray-500" />
              <span className="font-medium text-gray-700">
                {schedule?.date &&
                  new Date(schedule.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-gray-500" />
              <span className="text-gray-600">
                {schedule?.shift?.startTimeFormatted} -{' '}
                {schedule?.shift?.endTimeFormatted}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building2 size={16} className="text-gray-500" />
              <span className="text-gray-600">
                {schedule?.subDepartment?.name}
              </span>
            </div>
          </div>

          <p className="text-sm text-red-600 font-medium">
            ⚠️ This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Keep Schedule
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cancelling...' : 'Yes, Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
}
