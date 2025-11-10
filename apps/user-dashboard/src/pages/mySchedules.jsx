import React, { useState, useMemo } from "react";
import { Filter, Pencil, Trash2, Plus } from "lucide-react";
import ScheduleModal from "../modals/ScheduleModal";
import DeleteConfirm from "../modals/DeleteConfirm";

const DEPARTMENTS = ["HR", "IT", "Finance", "Operations"];
const SUB_DEPARTMENTS = ["HR", "IT", "Finance", "Operations"];
const STATUSES = ["scheduled", "completed", "cancelled"];

export default function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  const initialData = {
    id: null,
    department: DEPARTMENTS[0],
    subdepartment: SUB_DEPARTMENTS[0],
    shift: "",
    time: "",
    date: "",
    status: STATUSES[0]
  };

  const filteredSchedules = useMemo(() =>
    schedules.filter(s =>
      (!selectedDepartment || s.department === selectedDepartment) &&
      (!selectedStatus || s.status === selectedStatus)
    ), [schedules, selectedDepartment, selectedStatus]);

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
    if (editing) {
      setSchedules(prev => prev.map(s => s.id === currentData.id ? currentData : s));
    } else {
      setSchedules(prev => [...prev, { ...currentData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = id => {
    setScheduleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const deleteSchedule = () => {
    setSchedules(prev => prev.filter(s => s.id !== scheduleToDelete));
    setShowDeleteConfirm(false);
  };

  const tableColumns = [
    { key: "department", header: "Department", render: s => <span className="bg-teal-100 text-teal-800 rounded-xl px-3 py-1">{s.department}</span> },
    { key: "subdepartment", header: "Sub Department", render: s => <span className="bg-teal-100 text-teal-800 rounded-xl px-3 py-1">{s.subdepartment}</span> },
    { key: "shift", header: "Shift" },
    { key: "date", header: "Date" },
    { key: "status", header: "Status", render: s => (
      <span className={`px-3 py-1 rounded-full text-sm capitalize ${s.status === "completed" ? "bg-teal-100 text-teal-700" : s.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{s.status}</span>
    )},
    { key: "actions", header: "Actions", className: "text-center" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gray-700">Schedules</h1>
          <p className="text-gray-500 mt-1">Manage and assign work schedules</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition">
          <Plus size={18} /> Create Schedule
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border border-gray-200 rounded-xl bg-white p-4">
        <div className="flex items-center gap-2">
          <Filter className="text-teal-700" size={20} />
          <div className="flex flex-col gap-1 w-full">
            <h4 className="text-gray-700">Department</h4>
            <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700">
              <option value="">All</option>
              {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-gray-700">Status</h4>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700">
            <option value="">All</option>
            {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="text-gray-700 text-sm capitalize border-b border-gray-200">
            <tr>
              {tableColumns.map(col => <th key={col.key} className={`px-4 py-2 text-left ${col.className || ''}`}>{col.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.length === 0 ? (
              <tr><td colSpan={tableColumns.length} className="p-10 text-center text-gray-500">No schedules found. Click "Create Schedule" to add one.</td></tr>
            ) : filteredSchedules.map(s => (
              <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                {tableColumns.map(col => {
                  if (col.key === "actions") {
                    return (
                      <td key={col.key} className="p-4 flex gap-2 justify-center">
                        <button onClick={() => openModal(s)} className="p-2 rounded-full hover:bg-gray-100 transition"><Pencil size={18} className="text-gray-600"/></button>
                        <button onClick={() => confirmDelete(s.id)} className="p-2 rounded-full hover:bg-gray-100 transition"><Trash2 size={18} className="text-red-500"/></button>
                      </td>
                    );
                  }
                  const content = col.render ? col.render(s) : s[col.key];
                  return <td key={col.key} className="px-4 py-2 text-sm text-gray-700">{content}</td>;
                })}
              </tr>
            ))}
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
        DEPARTMENTS={DEPARTMENTS}
        SUB_DEPARTMENTS={SUB_DEPARTMENTS}
        STATUSES={STATUSES}
      />
      <DeleteConfirm
        isOpen={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onDelete={deleteSchedule}
      />
    </div>
  );
}
