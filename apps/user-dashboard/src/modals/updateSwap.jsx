import { useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import DeleteConfirm from './DeleteConfirm';
import { editSwapRequest, removeSwapRequest, fetchSwapRequests } from '../features/swaprequest/swapThunks';
import Text from '../components/common/Text';
import Button from '../components/common/Button';
import { X } from 'lucide-react';
import { CustomSelect, ScheduleOption } from '../components/pageComponents/swapRequestPage/SwapRequestForm';

export default function UpdateSwapRequestModal({
  isOpen,
  onClose,
  request,
  onUpdated,
}) {

  // Redux Hooks
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {
    allSchedules = [],
    upcomingSchedules = [],
    allSchedulesStatus,
    upcomingSchedulesStatus,
  } = useSelector((s) => s.schedule);

  // Form State
  const [form, setForm] = useState({
    currentShift: '',
    swapWith: '',
    message: '',
  });

  // Delete Confirmation Modal State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Loading State
  const loading =
    allSchedulesStatus === 'loading' || upcomingSchedulesStatus === 'loading';

  // Prefill Modal Data
  useEffect(() => {
    if (request) {
      const toScheduleId = request?.toScheduleId || '';
      const toUserId = request?.toUserId || '';
      const swapWithValue = toScheduleId ? `${toScheduleId}___${toUserId}` : '';

      setForm({
        currentShift: request?.fromScheduleId || '',
        swapWith: swapWithValue,
        message: request.message || '',
      });
    }
  }, [request]);

  // Handle Form Change
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save Updated Request
  const handleSave = async () => {
    if (!form.currentShift || !form.swapWith) {
      toast.error('Please select both shifts.');
      return;
    }

    const [toScheduleId, toUserId] = form.swapWith.split('___');

    try {
      await dispatch(
        editSwapRequest({
          id: request._id,
          data: {
            fromScheduleId: form.currentShift,
            toScheduleId,
            toUserId,
            message: form.message,
          },
        })
      ).unwrap();

      toast.success('Swap request updated.');
      await dispatch(fetchSwapRequests({ fromUserId: user?._id }));

      onUpdated && onUpdated();
      onClose();
    } catch (err) {
      toast.error(err?.message || 'Failed to update request.');
    }
  };

  // Delete Swap Request
  const handleDelete = async () => {
    try {
      await dispatch(removeSwapRequest(request._id)).unwrap();
      toast.success('Swap request deleted.');

      await dispatch(fetchSwapRequests({ fromUserId: user?._id }));
      setDeleteConfirmOpen(false);
      onUpdated && onUpdated();
      onClose();
    } catch (err) {
      toast.error(err?.message || 'Failed to cancel request.');
    }
  };

  // Current Shift Options
  const currentShiftOptions = upcomingSchedules.map((sched) => ({
    value: sched._id,
    label: <ScheduleOption sched={sched} />,
  }));

  // Swap With Options
  const swapWithOptions = allSchedules.map((sched) => {
    const userId = sched.user?._id || '';
    const scheduleId = sched._id || '';
    const combinedValue = `${scheduleId}___${userId}`;

    return {
      value: combinedValue,
      label: <ScheduleOption sched={sched} />,
    };
  });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">

          {/* Modal Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18 }}
            className="z-50 w-[95%] max-w-2xl bg-white rounded-xl shadow-xl p-6"
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 relative">
              <Text
                as="h3"
                MyClass="text-lg font-semibold text-gray-600"
                content="Edit Swap Request"
              />

              <Button
                onClick={onClose}
                className="absolute right-[1em] p-3 -mr-6 bg-gray-50 border rounded-full text-teal-300 hover:bg-gray-200 hover:text-teal-400"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">

              {/* Select Current Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your selected Shift
                </label>

                <CustomSelect
                  name="currentShift"
                  value={form.currentShift}
                  onChange={handleChange}
                  options={currentShiftOptions}
                  placeholder="Select your Schedule"
                  loading={loading}
                />
              </div>

              {/* Select Swap Target */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Swap With
                </label>

                <CustomSelect
                  name="swapWith"
                  value={form.swapWith}
                  onChange={handleChange}
                  options={swapWithOptions}
                  placeholder="Select target Schedule"
                  loading={loading}
                />
              </div>

              {/* Message Input */}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Optional message"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A] outline-none"
              />

              {/* Action Buttons */}
              <div className="flex justify-between items-center gap-4 mt-2">
                <Button
                  onClick={() => setDeleteConfirmOpen(true)}
                  variant="alert"
                  className="px-4 py-2 rounded-lg font-medium transition-color duration-300"
                >
                  Cancel Request
                </Button>
                <Button
                  onClick={handleSave}
                  variant="primary"
                  className="px-4 py-2 rounded-lg font-medium transition-color duration-300"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Delete Confirmation Modal */}
          <DeleteConfirm
            isOpen={deleteConfirmOpen}
            onCancel={() => setDeleteConfirmOpen(false)}
            onDelete={handleDelete}
          />
        </div>
      )}
      <div></div>
    </>
  );
}
