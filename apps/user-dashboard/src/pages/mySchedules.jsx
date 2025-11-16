import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, Pencil, Trash2, Plus } from "lucide-react";
import ScheduleModal from "../modals/ScheduleModal";
import DeleteConfirm from "../modals/DeleteConfirm";
import { STATUSES, TABLE_COLUMNS, SHIFTS, SUBDEPARTMENTS } from "../components/common/constants";

export default function Schedules() {
  const dispatch = useDispatch();

  const { schedules, status, error } = useSelector((state) => state.schedule);

  const [selectedShift, setSelectedShift] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSubDept, setSelectedSubDept] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  const initialData = {
    id: null,
    department: "Heart",
    subdepartment: "Central Health Care",
    shift: "",
    time: "",
    date: "",
    status: STATUSES[0],
  };


  const filteredSchedules = useMemo(() => {
    return schedules.filter(
      (s) =>
        (!selectedShift || s.shift?.id === selectedShift || s.shift === selectedShift) &&
        (!selectedStatus || s.status === selectedStatus) &&
        (!selectedSubDept ||
          s.subDepartment?.name === selectedSubDept ||
          s.subdepartment === selectedSubDept)
    );
  }, [schedules, selectedShift, selectedStatus, selectedSubDept]);

  const openModal = (schedule = null) => {
    if (schedule) {
      setCurrentData(schedule);
      setEditing(true);
    } else {
      setCurrentData(initialData);
      setEditing(false);
    }
    setIsModalOpen(true);
  };

  const saveSchedule = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = (id) => {
    setScheduleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const deleteSchedule = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gray-700">Schedules</h1>
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
          <h4 className="text-gray-700">Sub Department</h4>
          <select
            value={selectedSubDept}
            onChange={(e) => setSelectedSubDept(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
          >
            <option value="">All</option>
            {SUBDEPARTMENTS.map((sd) => (
              <option key={sd} value={sd}>
                {sd}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-teal-700" size={20} />
          <div className="flex flex-col gap-1 w-full">
            <h4 className="text-gray-700">Shift</h4>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
            >
              <option value="">All</option>
              {SHIFTS.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-gray-700">Status</h4>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
          >
            <option value="">All</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Table */}
      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="min-w-full border-collapse">
          {/* Table Header */}
          <thead className="text-gray-700 text-sm capitalize border-b border-gray-200">
            <tr>
              {TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-2 text-left ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredSchedules.length === 0 ? (
              <tr>
                <td
                  colSpan={TABLE_COLUMNS.length}
                  className="p-10 text-center text-gray-500"
                >
                  No schedules found. Click "Create Schedule" to add one.
                </td>
              </tr>
            ) : (
              filteredSchedules.map((s) => (
                <tr
                  key={s.id || s._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {TABLE_COLUMNS.map((col) => {
                    if (col.key === "actions") {
                      return (
                        <td
                          key={col.key}
                          className="p-4 flex gap-2 justify-center"
                        >
                          <button
                            onClick={() => openModal(s)}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                          >
                            <Pencil size={18} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => confirmDelete(s.id || s._id)}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </td>
                      );
                    }

                    let value = s[col.key];
                    if (typeof value === "object" && value !== null) {
                      if ("name" in value) value = value.name;
                      else if ("nickname" in value) value = value.nickname;
                      else value = JSON.stringify(value);
                    }
                    if (value === null || value === undefined || value === "") {
                      value = "ـــــ";
                    }
                    const content = col.render ? col.render(s) : value;
                    return (
                      <td
                        key={col.key}
                        className="px-4 py-2 text-sm text-gray-700"
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals*/}
      <ScheduleModal
        isOpen={isModalOpen}
        editing={editing}
        data={currentData}
        setData={setCurrentData}
        onClose={() => setIsModalOpen(false)}
        onSave={saveSchedule}
        STATUSES={STATUSES}
        SHIFTS={SHIFTS}
        SUBDEPARTMENTS={SUBDEPARTMENTS}
      />
      <DeleteConfirm
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onDelete={deleteSchedule}
      />
    </div>
  );
}
