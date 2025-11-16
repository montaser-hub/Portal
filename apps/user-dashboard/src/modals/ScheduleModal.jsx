// src/modals/ScheduleModal.jsx
import React, { useEffect, useState } from "react";
import { X, Calendar, Clock, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAll } from "../services/crudService";

export default function ScheduleModal({
  isOpen,
  editing,
  data,
  setData,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  const [subDepartments, setSubDepartments] = useState([]);
  const SHIFTS = ["Morning", "Evening", "Night"];

  // --- Fetch SubDepartments
  const fetchSubDepartments = async () => {
    try {
      const response = await getAll("/subdepartments");
      const subs = response.data || response;
      setSubDepartments(Array.isArray(subs) ? subs : []);
    } catch (err) {
      console.error("Error fetching subdepartments:", err);
      setSubDepartments([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSubDepartments();
    }
  }, [isOpen]);

  // --- Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {editing ? "Edit Schedule" : "Create Schedule"}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Sub-Department */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Sub Department
                </label>
                <select
                  name="subDepartmentId"
                  value={data.subDepartmentId || ""}
                  onChange={handleChange}
                  className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Sub Department</option>
                  {subDepartments.map((sd) => (
                    <option key={sd._id} value={sd._id}>
                      {sd.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shift */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Shift
                </label>
                <select
                  name="shift"
                  value={data.shift || ""}
                  onChange={handleChange}
                  className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Shift</option>
                  {SHIFTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={data.date?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(data)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editing ? "Update" : "Save"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}