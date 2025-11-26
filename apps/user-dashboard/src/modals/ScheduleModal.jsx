import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';

export default function ScheduleModal({
  isOpen,
  editing,
  data,
  setData,
  onClose,
  onSave,
  shifts = [],
  subDepartments = [],
  loading = false,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleShiftChange = (e) => {
    const selectedShiftId = e.target.value;
    const selectedShift = shifts.find((s) => s.id === selectedShiftId);

    setData((prev) => ({
      ...prev,
      shift: selectedShift
        ? {
            id: selectedShift.id,
            shiftName: selectedShift.shiftName,
            shiftType: selectedShift.shiftType,
          }
        : { id: '', shiftName: '', shiftType: '' },
      shiftId: selectedShiftId,
      shiftName: selectedShift?.shiftName || '',
      shiftType: selectedShift?.shiftType || '',
    }));
  };

  const handleSubDepartmentChange = (e) => {
    const selectedSubDeptId = e.target.value;
    const selectedSubDept = subDepartments.find(
      (sd) => sd.id === selectedSubDeptId
    );

    setData((prev) => ({
      ...prev,
      subDepartment: selectedSubDept
        ? { id: selectedSubDept.id, name: selectedSubDept.name }
        : { id: '', name: '' },
      subDepartmentId: selectedSubDeptId,
      subDepartmentName: selectedSubDept?.name || '',
    }));
  };

  // Get current values
  const currentShiftId = data.shift?.id || data.shiftId || '';
  const currentSubDeptId = data.subDepartment?.id || data.subDepartmentId || '';
  const isFormValid = currentShiftId && currentSubDeptId && data.date;

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
          >
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-gray-50 border rounded-full text-teal-300 hover:bg-gray-200 hover:text-teal-400"
          >
            <X size={20} />
          </Button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editing ? 'Edit Schedule' : 'Create Schedule'}
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Sub Department *
                </label>
                <select
                  value={currentSubDeptId}
                  onChange={handleSubDepartmentChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                  disabled={loading}
                >
                  <option value="">
                    {loading
                      ? 'Loading sub-departments...'
                      : 'Select Sub Department'}
                  </option>
                  {subDepartments.map((sd) => (
                    <option key={sd.id} value={sd.id}>
                      {sd.name}
                    </option>
                  ))}
                </select>
                {subDepartments.length === 0 && !loading && (
                  <p className="text-xs text-red-500">
                    No sub-departments available
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Shift *
                </label>
                <select
                  value={currentShiftId}
                  onChange={handleShiftChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                  disabled={loading}
                >
                  <option value="">
                    {loading ? 'Loading shifts...' : 'Select Shift'}
                  </option>
                  {shifts.map((shift) => (
                    <option key={shift.id} value={shift.id}>
                      {shift.shiftType} - {shift.shiftName}
                    </option>
                  ))}
                </select>
                {shifts.length === 0 && !loading && (
                  <p className="text-xs text-red-500">No shifts available</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={data.date ? data.date.split('T')[0] : ''}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {!isFormValid && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  ⚠️ Please fill in all required fields
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={!isFormValid || loading}
                className="px-6 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition font-medium disabled:bg-teal-500 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : editing ? 'Update' : 'Save'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
