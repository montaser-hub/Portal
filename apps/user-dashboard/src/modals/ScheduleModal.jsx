import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DEPARTMENTS, SUB_DEPARTMENTS, STATUSES } from "../components/pageComponents/mySchedulesPage/constants";

export default function ScheduleModal({ isOpen, editing, data, setData, onClose, onSave }) {
  const fields = [
    { key: "department", type: "select", options: DEPARTMENTS },
    { key: "subdepartment", type: "select", options: SUB_DEPARTMENTS },
    { key: "shift", type: "text" },
    { key: "time", type: "text" },
    { key: "date", type: "date" },
    { key: "status", type: "select", options: STATUSES },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {editing ? "Edit Schedule" : "Create Schedule"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {fields.map((field) =>
                field.type === "select" ? (
                  <select
                    key={field.key}
                    name={field.key}
                    value={data[field.key]}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    key={field.key}
                    type={field.type}
                    name={field.key}
                    value={data[field.key]}
                    onChange={handleChange}
                    placeholder={field.key}
                    className="border p-2 rounded"
                  />
                )
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
