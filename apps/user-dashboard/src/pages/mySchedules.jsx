// src/pages/mySchedules.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import ScheduleModal from "../modals/ScheduleModal";
import DeleteConfirm from "../modals/DeleteConfirm";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../services/API-Services/scheduleService";

export default function MySchedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedShift, setSelectedShift] = useState("");
  const [selectedSubDept, setSelectedSubDept] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  // --- Initial data for modal
  const initialData = {
    date: "",
    subDepartmentId: "",
    shift: "",
  };

  // --- Fetch schedules
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getSchedules();
      console.log("Schedules data:", data); // للتأكد من الـ structure
      setSchedules(data || []);
    } catch (err) {
      setError(err.message || "Error fetching schedules");
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Filters
  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      const shiftMatch =
        !selectedShift ||
        s.shift?.shiftName === selectedShift ||
        s.shift === selectedShift;
      const subDeptMatch =
        !selectedSubDept || s.subDepartment?.name === selectedSubDept;
      return shiftMatch && subDeptMatch;
    });
  }, [schedules, selectedShift, selectedSubDept]);

  // --- Open modal
  const openModal = (schedule = null) => {
    if (schedule) {
      setCurrentData({
        _id: schedule._id,
        subDepartmentId:
          schedule.subDepartmentId || schedule.subDepartment?._id,
        shift: schedule.shift?.shiftName || schedule.shift,
        date: schedule.date,
      });
      setEditing(true);
    } else {
      setCurrentData(initialData);
      setEditing(false);
    }
    setIsModalOpen(true);
  };

  // --- Save schedule
  const saveSchedule = async (data) => {
    if (!data.subDepartmentId || !data.shift || !data.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editing) {
        await updateSchedule(data._id, data);
      } else {
        await createSchedule(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error saving schedule");
    }
  };

  // --- Delete
  const confirmDelete = (id) => {
    setScheduleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteSchedule(scheduleToDelete);
      setShowDeleteConfirm(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error deleting schedule");
    }
  };

  // --- Get unique values for filters
  const shifts = [
    ...new Set(
      schedules.map((s) => s.shift?.shiftName || s.shift).filter(Boolean)
    ),
  ];
  const subDepartmentsList = [
    ...new Set(schedules.map((s) => s.subDepartment?.name).filter(Boolean)),
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gray-700 font-semibold">Schedules</h1>
          <p className="text-gray-500 mt-1">Manage and assign work schedules</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition"
        >
          <Plus size={18} /> Create Schedule
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border border-gray-200 rounded-xl bg-white p-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-gray-700 font-medium">Sub Department</h4>
          <select
            value={selectedSubDept}
            onChange={(e) => setSelectedSubDept(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All</option>
            {subDepartmentsList.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-gray-700 font-medium">Shift</h4>
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All</option>
            {shifts.map((shift) => (
              <option key={shift} value={shift}>
                {shift}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="text-gray-700 text-sm capitalize border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">
                Sub Department
              </th>
              <th className="px-4 py-3 text-left font-semibold">Shift</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredSchedules.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-500">
                  No schedules found. Click "Create Schedule" to add one.
                </td>
              </tr>
            ) : (
              filteredSchedules.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {s.subDepartment?.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {s.shift?.shiftName || s.shift || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {s.date ? new Date(s.date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={() => openModal(s)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title="Edit"
                    >
                      <Pencil size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => confirmDelete(s._id)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ScheduleModal
        isOpen={isModalOpen}
        editing={editing}
        data={currentData}
        setData={setCurrentData}
        onClose={() => setIsModalOpen(false)}
        onSave={saveSchedule}
      />
      <DeleteConfirm
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}