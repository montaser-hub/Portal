import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScheduleModal({ isOpen, editing, data, setData, onClose, onSave, SHIFTS, STATUSES }) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {editing ? "Edit Schedule" : "Create Schedule"}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Department ثابتة */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 font-medium">Department</label>
                <input type="text" value={data.department} readOnly className="border p-2 rounded bg-gray-100 text-gray-700" />
              </div>

              {/* Sub-Department ثابتة */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 font-medium">Sub Department</label>
                <input type="text" value={data.subdepartment} readOnly className="border p-2 rounded bg-gray-100 text-gray-700" />
              </div>

              {/* Shift Dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 font-medium">Shift</label>
                <select name="shift" value={data.shift} onChange={handleChange} className="border p-2 rounded">
                  <option value="">Select Shift</option>
                  {SHIFTS.map(shift => <option key={shift} value={shift}>{shift}</option>)}
                </select>
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 font-medium">Time</label>
                <input type="text" name="time" value={data.time} onChange={handleChange} placeholder="08:00 - 16:00" className="border p-2 rounded" />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 font-medium">Date</label>
                <input type="date" name="date" value={data.date} onChange={handleChange} className="border p-2 rounded" />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 font-medium">Status</label>
                <select name="status" value={data.status} onChange={handleChange} className="border p-2 rounded">
                  {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editing ? "Update" : "Save"}</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
