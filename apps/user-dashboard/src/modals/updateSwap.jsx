import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import DeleteConfirm from './DeleteConfirm';
import {
  editSwapRequest,
  removeSwapRequest,
  fetchSwapRequests,
} from '../features/swaprequest/swapThunks';

export default function UpdateSwapRequestModal({
  isOpen,
  onClose,
  request,
  onUpdated,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {
    allSchedules = [],
    upcomingSchedules = [],
    allSchedulesStatus,
    upcomingSchedulesStatus,
  } = useSelector((s) => s.schedule);

  // Local form state prefilled from `request`
  const [form, setForm] = useState({
    currentShift: '',
    swapWith: '',
    message: '',
  });

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const loading =
    allSchedulesStatus === 'loading' || upcomingSchedulesStatus === 'loading';

  // when request changes (opening modal), prefill values
  useEffect(() => {
    if (request) {
      // request likely has: fromScheduleId, toScheduleId, toUserId, message
      const toScheduleId = request?.toScheduleId || '';
      const toUserId = request?.toUserId ||'';
      const swapWithValue = toScheduleId ? `${toScheduleId}___${toUserId}` : '';

      setForm({
        currentShift: request?.fromScheduleId || '',
        swapWith: swapWithValue,
        message: request.message || '',
      });
    } else {
      setForm({ currentShift: '', swapWith: '', message: '' });
    }
  }, [request]);

  // helper to format schedule option (copied from your form)
  const formatScheduleOption = (sched) => {
    const shift = sched?.shift || {};
    const userObj = sched?.user || {};
    const subDep = sched?.subDepartment || {};
    const date = sched?.date ? new Date(sched.date).toLocaleDateString() : '-';
    return `${subDep?.name || '-'} — 📅 ${date} ⏰ ${
      shift?.startTimeFormatted || '-'
    } - ${shift?.endTimeFormatted || '-'} 👤 ${userObj?.fullName || '-'}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!form.currentShift || !form.swapWith) {
      toast.error('Please select both shifts.');
      return;
    }

    // parse swapWith combined value
    const [toScheduleId, toUserId] = (form.swapWith || '').split('___');

    try {
      // dispatch update thunk
      await dispatch(
          editSwapRequest({
          id: request._id,
          data: {
            fromScheduleId: form.currentShift,
            toScheduleId,
            toUserId,
            message: form.message || '',
          },
        })
      ).unwrap();

      toast.success('Swap request updated.');
      // refetch (so history updates)
      await dispatch(fetchSwapRequests({ fromUserId: user?._id }));
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      toast.error(err?.message || 'Failed to update swap request.');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeSwapRequest(request._id)).unwrap();
      toast.success('Swap request deleted.');
      await dispatch(fetchSwapRequests({ fromUserId: user?._id }));
      setDeleteConfirmOpen(false);
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      toast.error(err?.message || 'Failed to cancel request.');
    }
  };

  return (

    <>
      {isOpen && (
        <>
          {/* Modal backdrop + content */}
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="z-50 w-[95%] max-w-2xl bg-white rounded-xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Edit Swap Request
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                {/* Current User Shift */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your selected Shift
                  </label>
                  <select
                    name="currentShift"
                    value={form.currentShift}
                    onChange={handleChange}
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
                    value={form.swapWith}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A]"
                  >
                    <option value="">Select target Schedule</option>
                    {loading ? (
                      <option>Loading schedules...</option>
                    ) : (
                      allSchedules.map((sched) => {
                        const userId = sched.user?._id || '';
                        const toScheduleId = sched._id || '';
                        const optionValue = `${toScheduleId}___${userId}`;
                        return (
                          <option key={sched._id} value={optionValue}>
                            {formatScheduleOption(sched)}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  value={form.message || ''}
                  onChange={handleChange}
                  placeholder="Optional message"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0F7B8A] outline-none"
                />

                {/* Actions */}
                <div className="flex justify-between items-center gap-4 mt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirmOpen(true)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      type="button"
                    >
                      Cancel Request
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={handleSave}
                      className="bg-[#0F7B8A] text-white px-4 py-2 rounded hover:bg-[#0c656c]"
                      type="button"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Delete confirmation */}
          <DeleteConfirm
            isOpen={deleteConfirmOpen}
            onCancel={() => setDeleteConfirmOpen(false)}
            onDelete={handleDelete}
          />
        </>
    )}
    </>
  );
}
