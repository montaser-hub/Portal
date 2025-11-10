// // import React, { useState } from "react";
// // import * as Tabs from "@radix-ui/react-tabs";
// // import  SwapRequestForm  from "../components/pageComponents/swapRequestPage/SwapRequestForm";
// // import  SwapRequestStatus  from "../components/pageComponents/swapRequestPage/SwapRequestStatus";
// // import  SwapRequestHistory  from "../components/pageComponents/swapRequestPage/SwapRequestHistory";
// // import Text from "../components/common/Text";

// // export default function SwapRequestPage() {
// //   const [activeTab, setActiveTab] = useState("request");
// //   const [formData, setFormData] = useState({});
// //   const [selectedRequest, setSelectedRequest] = useState(null);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = () => {
// //     console.log("Submit:", formData);
// //     // منطق الإرسال هنا
// //   };

// //   return (
// //   <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-5xl mx-auto mb-8">
// //         <Text
// //           as="h1"
// //           content="My Schedules"
// //           MyClass={`text-3xl font-semibold text-[#0F7B8A] mb-2`}
// //         />
// //         <Text
// //           as="p"
// //           content="Manage your schedules ."
// //           MyClass="text-gray-600"
// //         />
// //       </div>

// //       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
// //       <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
// //         <Tabs.List className="flex space-x-6 border-b border-gray-200 mb-4">
// //         {["request", "status", "history", "received"].map((tab) => (
// //                       <Tabs.Trigger
// //                         key={tab}
// //                         value={tab}
// //                         className={`pb-2 text-sm font-medium ${
// //                           activeTab === tab
// //                             ? `border-b-2 border-[#0F7B8A] text-[#0F7B8A]`
// //                             : "text-gray-500 hover:text-[#0F7B8A]"
// //                         }`}
// //                       >
// //                         {tab === "request"
// //                           ? "New Request"
// //                           : tab === "status"
// //                           ? "Request Status"
// //                           : tab === "history"
// //                           ? "Requests History"
// //                           : "Received Requests History"}
// //                       </Tabs.Trigger>
// //                     ))}
// //         </Tabs.List>

// //         <Tabs.Content value="request">
// //           <SwapRequestForm
// //             formData={formData}
// //             onChange={handleChange}
// //             onSubmit={handleSubmit}
// //           />
// //         </Tabs.Content>

// //         <Tabs.Content value="status">
// //           <SwapRequestStatus request={selectedRequest} />
// //         </Tabs.Content>

// //         <Tabs.Content value="history">
// //           <SwapRequestHistory />
// //         </Tabs.Content>
// //         <Tabs.Content value="received">
// //               <div className="text-gray-600">
// //                 <Text as="p" content="No past swap requests found." />
// //               </div>
// //         </Tabs.Content>
// //       </Tabs.Root>
// //         </div>
// // </div>
// //   );
// // }

// import React, { useState, useMemo } from "react";

// export default function MySchedules() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [scheduleToDelete, setScheduleToDelete] = useState(null);

//   const departments = ["HR", "IT", "Finance", "Operations"];
//   const statuses = ["scheduled", "completed", "cancelled"];

//   const [schedules, setSchedules] = useState([
//     {
//       id: 1,
//       user: "John Doe",
//       role: "Nurse",
//       department: "HR",
//       shift: "Morning",
//       time: "08:00 - 16:00",
//       date: "2025-11-10",
//       status: "scheduled",
//     },
//     {
//       id: 2,
//       user: "Sarah Smith",
//       role: "Doctor",
//       department: "IT",
//       shift: "Night",
//       time: "22:00 - 06:00",
//       date: "2025-11-11",
//       status: "completed",
//     },
//   ]);

//   const [newSchedule, setNewSchedule] = useState({
//     id: null,
//     user: "",
//     role: "",
//     department: "",
//     shift: "",
//     time: "",
//     date: "",
//     status: "scheduled",
//   });

//   const filteredSchedules = useMemo(() => {
//     return schedules.filter(
//       (s) =>
//         (!selectedDepartment || s.department === selectedDepartment) &&
//         (!selectedStatus || s.status === selectedStatus)
//     );
//   }, [schedules, selectedDepartment, selectedStatus]);

//   const openModal = (schedule = null) => {
//     if (schedule) {
//       setNewSchedule(schedule);
//       setIsEditing(true);
//     } else {
//       setNewSchedule({
//         id: null,
//         user: "",
//         role: "",
//         department: "",
//         shift: "",
//         time: "",
//         date: "",
//         status: "scheduled",
//       });
//       setIsEditing(false);
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const saveSchedule = () => {
//     if (isEditing) {
//       setSchedules((prev) =>
//         prev.map((s) => (s.id === newSchedule.id ? newSchedule : s))
//       );
//     } else {
//       setSchedules((prev) => [
//         ...prev,
//         { ...newSchedule, id: Date.now() },
//       ]);
//     }
//     closeModal();
//   };

//   const confirmDelete = (id) => {
//     setScheduleToDelete(id);
//     setShowDeleteConfirm(true);
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setScheduleToDelete(null);
//   };

//   const deleteSchedule = () => {
//     setSchedules((prev) => prev.filter((s) => s.id !== scheduleToDelete));
//     cancelDelete();
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen relative">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl text-gray-700">Schedules</h1>
//           <p className="text-gray-500 mt-1 text-md">
//             Manage and create your schedules
//           </p>
//         </div>

//         <button
//           onClick={() => openModal()}
//           className="bg-teal-700 text-white px-5 py-2 rounded-lg cursor-pointer transition hover:bg-teal-800"
//         >
//           + Create Schedule
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border border-gray-200 rounded-xl bg-white p-4">
//         <div className="flex items-center gap-2">
//           <i className="fa-solid fa-filter text-teal-700 text-xl"></i>
//           <div className="flex flex-col gap-1 w-full">
//             <h4>Department</h4>
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//             >
//               <option value="">All</option>
//               {departments.map((dept) => (
//                 <option key={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1">
//           <h4>Status</h4>
//           <select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//           >
//             <option value="">All</option>
//             {statuses.map((status) => (
//               <option key={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
//         <table className="min-w-full border-collapse">
//           <thead className="text-gray-700 text-sm capitalize border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left">Department</th>
//               <th className="px-4 py-2 text-left">SubDepartment</th>
//               <th className="px-4 py-2 text-left">Shift</th>
//               <th className="px-4 py-2 text-left">Time</th>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSchedules.map((s) => (
//               <tr
//                 key={s.id}
//                 className="border-b border-gray-200 hover:bg-gray-50 transition"
//               >
//                 <td className="px-4 py-2 flex items-center text-gray-800 gap-3">
//                   <i className="fa-regular fa-calendar text-teal-700"></i>
//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm text-gray-700">{s.user}</span>
//                     <span className="text-sm text-gray-500">{s.role}</span>
//                   </div>
//                 </td>
//                 <td className="p-4 text-sm">
//                   <span className="bg-teal-100 text-teal-800 rounded-xl p-1 px-3">
//                     {s.department}
//                   </span>
//                 </td>
//                 <td className="p-4 text-sm text-gray-700">{s.shift}</td>
//                 <td className="p-4 text-sm text-gray-700">{s.time}</td>
//                 <td className="p-4 text-sm text-gray-700">{s.date}</td>
//                 <td className="p-4 text-sm text-gray-700 capitalize">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       s.status === "scheduled"
//                         ? "bg-blue-100 text-blue-700"
//                         : s.status === "completed"
//                         ? "bg-gray-200 text-gray-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {s.status}
//                   </span>
//                 </td>
//                 <td className="p-4 flex gap-2 justify-center">
//                   <button
//                     onClick={() => openModal(s)}
//                     className="px-2.5 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
//                   >
//                     <i className="fa-solid fa-pencil text-gray-600"></i>
//                   </button>
//                   <button
//                     onClick={() => confirmDelete(s.id)}
//                     className="text-red-500 px-2.5 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
//                   >
//                     <i className="fa-regular fa-trash-can"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               {isEditing ? "Edit Schedule" : "Create Schedule"}
//             </h2>

//             <div className="grid grid-cols-1 gap-4">
//               {["user", "role", "department", "shift", "time"].map((field) => (
//                 <input
//                   key={field}
//                   value={newSchedule[field]}
//                   onChange={(e) =>
//                     setNewSchedule({ ...newSchedule, [field]: e.target.value })
//                   }
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   className="border p-2 rounded"
//                 />
//               ))}
//               <input
//                 type="date"
//                 value={newSchedule.date}
//                 onChange={(e) =>
//                   setNewSchedule({ ...newSchedule, date: e.target.value })
//                 }
//                 className="border p-2 rounded"
//               />
//               <select
//                 value={newSchedule.status}
//                 onChange={(e) =>
//                   setNewSchedule({ ...newSchedule, status: e.target.value })
//                 }
//                 className="border p-2 rounded"
//               >
//                 {statuses.map((status) => (
//                   <option key={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveSchedule}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 {isEditing ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirm */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Confirm Deletion
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this schedule?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={cancelDelete}
//                 className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={deleteSchedule}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// V2

// import React, { useState, useMemo } from "react";
// import {
//   Calendar,
//   Filter,
//   Pencil,
//   Trash2,
//   Plus,
//   X,
// } from "lucide-react";

// export default function Schedules() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [scheduleToDelete, setScheduleToDelete] = useState(null);

//   const departments = ["HR", "IT", "Finance", "Operations"];
//   const statuses = ["scheduled", "completed", "cancelled"];

//   const [schedules, setSchedules] = useState([
//     {
//       id: 1,
//       user: "John Doe",
//       role: "Nurse",
//       department: "HR",
//       shift: "Morning",
//       time: "08:00 - 16:00",
//       date: "2025-11-10",
//       status: "scheduled",
//     },
//     {
//       id: 2,
//       user: "Sarah Smith",
//       role: "Doctor",
//       department: "IT",
//       shift: "Night",
//       time: "22:00 - 06:00",
//       date: "2025-11-11",
//       status: "completed",
//     },
//   ]);

//   const [newSchedule, setNewSchedule] = useState({
//     id: null,
//     user: "",
//     role: "",
//     department: "",
//     shift: "",
//     time: "",
//     date: "",
//     status: "scheduled",
//   });

//   const filteredSchedules = useMemo(() => {
//     return schedules.filter(
//       (s) =>
//         (!selectedDepartment || s.department === selectedDepartment) &&
//         (!selectedStatus || s.status === selectedStatus)
//     );
//   }, [schedules, selectedDepartment, selectedStatus]);

//   const openModal = (schedule = null) => {
//     if (schedule) {
//       setNewSchedule(schedule);
//       setIsEditing(true);
//     } else {
//       setNewSchedule({
//         id: null,
//         user: "",
//         role: "",
//         department: "",
//         shift: "",
//         time: "",
//         date: "",
//         status: "scheduled",
//       });
//       setIsEditing(false);
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const saveSchedule = () => {
//     if (isEditing) {
//       setSchedules((prev) =>
//         prev.map((s) => (s.id === newSchedule.id ? newSchedule : s))
//       );
//     } else {
//       setSchedules((prev) => [...prev, { ...newSchedule, id: Date.now() }]);
//     }
//     closeModal();
//   };

//   const confirmDelete = (id) => {
//     setScheduleToDelete(id);
//     setShowDeleteConfirm(true);
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setScheduleToDelete(null);
//   };

//   const deleteSchedule = () => {
//     setSchedules((prev) => prev.filter((s) => s.id !== scheduleToDelete));
//     cancelDelete();
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen relative">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl text-gray-700">Schedules</h1>
//           <p className="text-gray-500 mt-1 text-md">
//             Manage and assign work schedules
//           </p>
//         </div>

//         <button
//           onClick={() => openModal()}
//           className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-lg cursor-pointer transition hover:bg-teal-800"
//         >
//           <Plus size={18} />
//           <span>Create Schedule</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border border-gray-200 rounded-xl bg-white p-4">
//         <div className="flex items-center gap-2">
//           <Filter className="text-teal-700" size={20} />
//           <div className="flex flex-col gap-1 w-full">
//             <h4 className="text-gray-700">Department</h4>
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//             >
//               <option value="">All</option>
//               {departments.map((dept) => (
//                 <option key={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1">
//           <h4 className="text-gray-700">Status</h4>
//           <select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//           >
//             <option value="">All</option>
//             {statuses.map((status) => (
//               <option key={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
//         <table className="min-w-full border-collapse">
//           <thead className="text-gray-700 text-sm capitalize border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left">User</th>
//               <th className="px-4 py-2 text-left">Department</th>
//               <th className="px-4 py-2 text-left">Shift</th>
//               <th className="px-4 py-2 text-left">Time</th>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSchedules.map((s) => (
//               <tr
//                 key={s.id}
//                 className="border-b border-gray-200 hover:bg-gray-50 transition"
//               >
//                 <td className="px-4 py-2 flex items-center text-gray-800 gap-3">
//                   <Calendar className="text-teal-700" size={18} />
//                   <div className="flex flex-col gap-1">
//                     <span className="text-sm text-gray-700">{s.user}</span>
//                     <span className="text-sm text-gray-500">{s.role}</span>
//                   </div>
//                 </td>
//                 <td className="p-4 text-sm">
//                   <span className="bg-teal-100 text-teal-800 rounded-xl p-1 px-3">
//                     {s.department}
//                   </span>
//                 </td>
//                 <td className="p-4 text-sm text-gray-700">{s.shift}</td>
//                 <td className="p-4 text-sm text-gray-700">{s.time}</td>
//                 <td className="p-4 text-sm text-gray-700">{s.date}</td>
//                 <td className="p-4 text-sm text-gray-700 capitalize">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       s.status === "scheduled"
//                         ? "bg-blue-100 text-blue-700"
//                         : s.status === "completed"
//                         ? "bg-gray-200 text-gray-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {s.status}
//                   </span>
//                 </td>
//                 <td className="p-4 flex gap-2 justify-center">
//                   <button
//                     onClick={() => openModal(s)}
//                     className="p-2 rounded-full hover:bg-gray-100 transition"
//                   >
//                     <Pencil size={18} className="text-gray-600" />
//                   </button>
//                   <button
//                     onClick={() => confirmDelete(s.id)}
//                     className="p-2 rounded-full hover:bg-gray-100 transition"
//                   >
//                     <Trash2 size={18} className="text-red-500" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               {isEditing ? "Edit Schedule" : "Create Schedule"}
//             </h2>

//             <div className="grid grid-cols-1 gap-4">
//               {["user", "role", "department", "shift", "time"].map((field) => (
//                 <input
//                   key={field}
//                   value={newSchedule[field]}
//                   onChange={(e) =>
//                     setNewSchedule({ ...newSchedule, [field]: e.target.value })
//                   }
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   className="border p-2 rounded"
//                 />
//               ))}
//               <input
//                 type="date"
//                 value={newSchedule.date}
//                 onChange={(e) =>
//                   setNewSchedule({ ...newSchedule, date: e.target.value })
//                 }
//                 className="border p-2 rounded"
//               />
//               <select
//                 value={newSchedule.status}
//                 onChange={(e) =>
//                   setNewSchedule({ ...newSchedule, status: e.target.value })
//                 }
//                 className="border p-2 rounded"
//               >
//                 {statuses.map((status) => (
//                   <option key={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveSchedule}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 {isEditing ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirm */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Confirm Deletion
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this schedule?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={cancelDelete}
//                 className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={deleteSchedule}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// V3

// import React, { useState, useMemo } from "react";
// import {
//   Calendar,
//   Filter,
//   Pencil,
//   Trash2,
//   Plus,
//   X,
// } from "lucide-react";

// export default function Schedules() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [scheduleToDelete, setScheduleToDelete] = useState(null);

//   const departments = ["HR", "IT", "Finance", "Operations"];
//   const statuses = ["scheduled", "completed", "cancelled"];
//   const [schedules, setSchedules] = useState([]);

//   // تعريف أسماء الحقول لإنشاء المدخلات آليًا في الـ Modal
//   const scheduleFields = [
//     { key: "department", placeholder: "Department", type: "select", options: departments },
//     { key: "shift", placeholder: "Shift", type: "text" },
//     { key: "time", placeholder: "Time (e.g., 08:00 - 16:00)", type: "text" },
//     { key: "date", placeholder: "Date", type: "date" },
//     { key: "status", placeholder: "Status", type: "select", options: statuses },
//   ];

//   // تعريف أعمدة الجدول لإنشاء رأس الجدول وأجساده آليًا
//   const tableColumns = [
//     { key: "subdepartment", header: "SubDepartment", render: (schedule) => (
//       <span className="bg-teal-100 text-teal-800 rounded-xl p-1 px-3">{schedule.subdepartment}</span>
//     )},
//     { key: "department", header: "Department", render: (schedule) => (
//       <span className="bg-teal-100 text-teal-800 rounded-xl p-1 px-3">{schedule.department}</span>
//     )},
//     { key: "shift", header: "Shift" },
//     { key: "time", header: "Time" },
//     { key: "date", header: "Date" },
//     { key: "status", header: "Status", render: (schedule) => {
//       const statusClasses = schedule.status === "scheduled" ? "bg-blue-100 text-blue-700" : schedule.status === "completed" ? "bg-gray-200 text-gray-700" : "bg-red-100 text-red-700";
//       return (
//         <span className={`px-3 py-1 rounded-full text-sm capitalize ${statusClasses}`}>
//           {schedule.status}
//         </span>
//       );
//     }},
//     { key: "actions", header: "Actions", className: "text-center" },
//   ];

//   const initialNewSchedule = {
//     id: null,
//     user: "",
//     role: "",
//     department: departments[0] || "",
//     shift: "",
//     time: "",
//     date: "",
//     status: statuses[0] || "scheduled",
//   };

//   const [newSchedule, setNewSchedule] = useState(initialNewSchedule);

//   const filteredSchedules = useMemo(() => {
//     return schedules.filter(
//       (schedule) =>
//         (!selectedDepartment || schedule.department === selectedDepartment) &&
//         (!selectedStatus || schedule.status === selectedStatus)
//     );
//   }, [schedules, selectedDepartment, selectedStatus]);

//   const openModal = (schedule = null) => {
//     if (schedule) {
//       setNewSchedule(schedule);
//       setIsEditing(true);
//     } else {
//       setNewSchedule(initialNewSchedule);
//       setIsEditing(false);
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewSchedule((prev) => ({ ...prev, [name]: value }));
//   };

//   const saveSchedule = () => {
//     if (isEditing) {
//       setSchedules((prev) =>
//         prev.map((schedule) => (schedule.id === newSchedule.id ? newSchedule : s))
//       );
//     } else {
//       setSchedules((prev) => [...prev, { ...newSchedule, id: Date.now() }]);
//     }
//     closeModal();
//   };

//   const confirmDelete = (id) => {
//     setScheduleToDelete(id);
//     setShowDeleteConfirm(true);
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setScheduleToDelete(null);
//   };

//   const deleteSchedule = () => {
//     setSchedules((prev) => prev.filter((schedule) => schedule.id !== scheduleToDelete));
//     cancelDelete();
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen relative">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl text-gray-700">Schedules</h1>
//           <p className="text-gray-500 mt-1 text-md">
//             Manage and assign work schedules
//           </p>
//         </div>

//         <button
//           onClick={() => openModal()}
//           className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-lg cursor-pointer transition hover:bg-teal-800"
//         >
//           <Plus size={18} />
//           <span>Create Schedule</span>
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border border-gray-200 rounded-xl bg-white p-4">
//         {/* Department Filter */}
//         <div className="flex items-center gap-2">
//           <Filter className="text-teal-700" size={20} />
//           <div className="flex flex-col gap-1 w-full">
//             <h4 className="text-gray-700">Department</h4>
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//             >
//               <option value="">All</option>
//               {departments.map((dept) => (
//                 <option key={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Status Filter */}
//         <div className="flex flex-col gap-1">
//           <h4 className="text-gray-700">Status</h4>
//           <select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
//           >
//             <option value="">All</option>
//             {statuses.map((status) => (
//               <option key={status}>{status}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
//         <table className="min-w-full border-collapse">
//           <thead className="text-gray-700 text-sm capitalize border-b border-gray-200">
//             <tr>
//               {/* إنشاء رأس الجدول باستخدام map */}
//               {tableColumns.map((col) => (
//                 <th key={col.key} className={`px-4 py-2 text-left ${col.className || ''}`}>
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/*  عرض رسالة في حال كانت المصفوفة فارغة */}
//             {filteredSchedules.length === 0 ? (
//                 <tr>
//                     <td colSpan={tableColumns.length} className="p-10 text-center text-gray-500">
//                         No schedules found. Click "Create Schedule" to add one.
//                     </td>
//                 </tr>
//             ) : (
//                 filteredSchedules.map((schedule) => (
//                     <tr
//                         key={schedule.id}
//                         className="border-b border-gray-200 hover:bg-gray-50 transition"
//                     >
//                         {/* استخدام map لإنشاء خلايا الصفوف */}
//                         {tableColumns.map((col) => {
//                             if (col.key === 'actions') {
//                                 return (
//                                     <td key={col.key} className="p-4 flex gap-2 justify-center">
//                                         <button
//                                             onClick={() => openModal( schedule )}
//                                             className="p-2 rounded-full hover:bg-gray-100 transition"
//                                         >
//                                             <Pencil size={18} className="text-gray-600" />
//                                         </button>
//                                         <button
//                                             onClick={() => confirmDelete( schedule.id)}
//                                             className="p-2 rounded-full hover:bg-gray-100 transition"
//                                         >
//                                             <Trash2 size={18} className="text-red-500" />
//                                         </button>
//                                     </td>
//                                 );
//                             }

//                             // دمج أيقونة التقويم مع خلية "User"
//                             const content = col.render ? col.render(s) : s[col.key];
//                             const isUserColumn = col.key === 'user';

//                             return (
//                                 <td
//                                     key={col.key}
//                                     className={`px-4 py-2 text-sm text-gray-700 ${isUserColumn ? 'flex items-center gap-3' : ''}`}
//                                 >
//                                     {isUserColumn && <Calendar className="text-teal-700" size={18} />}
//                                     {content}
//                                 </td>
//                             );
//                         })}
//                     </tr>
//                 ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               {isEditing ? "Edit Schedule" : "Create Schedule"}
//             </h2>

//             <div className="grid grid-cols-1 gap-4">
//               {/* إنشاء مدخلات الـ Modal باستخدام map */}
//               {scheduleFields.map((field) => {
//                 const isSelect = field.type === 'select';

//                 if (isSelect) {
//                   return (
//                     <select
//                       key={field.key}
//                       name={field.key}
//                       value={newSchedule[field.key]}
//                       onChange={handleInputChange}
//                       className="border p-2 rounded"
//                     >
//                       {field.options.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                   );
//                 }

//                 return (
//                   <input
//                     key={field.key}
//                     type={field.type}
//                     name={field.key}
//                     value={newSchedule[field.key] || ''}
//                     onChange={handleInputChange}
//                     placeholder={field.placeholder}
//                     className="border p-2 rounded"
//                   />
//                 );
//               })}
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveSchedule}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 {isEditing ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirm */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Confirm Deletion
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this schedule?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={cancelDelete}
//                 className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={deleteSchedule}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// V4

import React, { useState, useMemo } from "react";
import { Calendar, Filter, Pencil, Trash2, Plus, X } from "lucide-react";

export default function Schedules() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  const departments = ["HR", "IT", "Finance", "Operations"];
  const subDepartments = ["HR", "IT", "Finance", "Operations"];
  const statuses = ["scheduled", "completed", "cancelled"];
  const [schedules, setSchedules] = useState([]);

  // الحقول المستخدمة في الـ Modal
  const scheduleFields = [
    { key: "department", placeholder: "Department", type: "select", options: departments },
    { key: "subdepartment", placeholder: "Sub Department", type: "select", options: subDepartments },
    { key: "shift", placeholder: "Shift", type: "text" },
    { key: "time", placeholder: "Time (e.g., 08:00 - 16:00)", type: "text" },
    { key: "date", placeholder: "Date", type: "date" },
    { key: "status", placeholder: "Status", type: "select", options: statuses },
  ];

  const tableColumns = [
    { key: "department", header: "Department", render: s => (
        <span className="bg-teal-100 text-teal-800 rounded-xl px-3 py-1">{s.department}</span>
      )
    },
    { key: "subDepartment", header: "Sub Department", render: s => (
        <span className="bg-teal-100 text-teal-800 rounded-xl px-3 py-1">{s.subdepartment}</span>
      )
    },
    { key: "shift", header: "Shift" },
    { key: "date", header: "Date" },
    { key: "status", header: "Status", render: s => {
        const statusClasses =
          s.status === "true" ? "bg-teal-100 text-teal-700" :
          s.status === "false" ? "bg-red-200 text-red-700" :
          "bg-red-100 text-red-700";
        return <span className={`px-3 py-1 rounded-full text-sm capitalize ${statusClasses}`}>{s.status}</span>;
      }
    },
    { key: "actions", header: "Actions", className: "text-center" },
  ];

  const initialNewSchedule = {
    id: null,
    department: departments[0] || "",
    subdepartment: subDepartments[1] || "",
    shift: "",
    time: "",
    date: "",
    status: statuses[0] || "scheduled",
  };

  const [newSchedule, setNewSchedule] = useState(initialNewSchedule);

  // تصفية الجداول حسب القسم والحالة
  const filteredSchedules = useMemo(() => {
    return schedules.filter(
      s =>
        (!selectedDepartment || s.department === selectedDepartment) &&
        (!selectedStatus || s.status === selectedStatus)
    );
  }, [schedules, selectedDepartment, selectedStatus]);

  const openModal = (schedule = null) => {
    if (schedule) {
      setNewSchedule(schedule);
      setIsEditing(true);
    } else {
      setNewSchedule(initialNewSchedule);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({ ...prev, [name]: value }));
  };

  const saveSchedule = () => {
    if (isEditing) {
      setSchedules(prev =>
        prev.map(s => (s.id === newSchedule.id ? newSchedule : s))
      );
    } else {
      setSchedules(prev => [...prev, { ...newSchedule, id: Date.now() }]);
    }
    closeModal();
  };

  const confirmDelete = id => {
    setScheduleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setScheduleToDelete(null);
  };

  const deleteSchedule = () => {
    setSchedules(prev => prev.filter(s => s.id !== scheduleToDelete));
    cancelDelete();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gray-700">Schedules</h1>
          <p className="text-gray-500 mt-1 text-md">Manage and assign work schedules</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition"
        >
          <Plus size={18} />
          <span>Create Schedule</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 border border-gray-200 rounded-xl bg-white p-4">
        {/* Department */}
        <div className="flex items-center gap-2">
          <Filter className="text-teal-700" size={20} />
          <div className="flex flex-col gap-1 w-full">
            <h4 className="text-gray-700">Department</h4>
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
            >
              <option value="">All</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <h4 className="text-gray-700">Status</h4>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
          >
            <option value="">All</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="text-gray-700 text-sm capitalize border-b border-gray-200">
            <tr>
              {tableColumns.map(col => (
                <th key={col.key} className={`px-4 py-2 text-left ${col.className || ''}`}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.length === 0 ? (
              <tr>
                <td colSpan={tableColumns.length} className="p-10 text-center text-gray-500">
                  No schedules found. Click "Create Schedule" to add one.
                </td>
              </tr>
            ) : (
              filteredSchedules.map(schedule => (
                <tr key={schedule.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  {tableColumns.map(col => {
                    if (col.key === "actions") {
                      return (
                        <td key={col.key} className="p-4 flex gap-2 justify-center">
                          <button onClick={() => openModal(schedule)} className="p-2 rounded-full hover:bg-gray-100 transition">
                            <Pencil size={18} className="text-gray-600" />
                          </button>
                          <button onClick={() => confirmDelete(schedule.id)} className="p-2 rounded-full hover:bg-gray-100 transition">
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </td>
                      );
                    }

                    const isUserColumn = col.key === "user";
                    const content = col.render ? col.render(schedule) : schedule[col.key];

                    return (
                      <td key={col.key} className={`px-4 py-2 text-sm text-gray-700 ${isUserColumn ? 'flex items-center gap-3' : ''}`}>
                        {isUserColumn && <Calendar className="text-teal-700" size={18} />}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {isEditing ? "Edit Schedule" : "Create Schedule"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {scheduleFields.map(field => {
                const isSelect = field.type === "select";
                return isSelect ? (
                  <select
                    key={field.key}
                    name={field.key}
                    value={newSchedule[field.key]}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  >
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    key={field.key}
                    type={field.type}
                    name={field.key}
                    value={newSchedule[field.key] || ""}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="border p-2 rounded"
                  />
                );
              })}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeModal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={saveSchedule} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{isEditing ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this schedule?</p>
            <div className="flex justify-center gap-4">
              <button onClick={cancelDelete} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={deleteSchedule} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

