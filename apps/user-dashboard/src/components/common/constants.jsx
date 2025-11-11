
export const STATUSES = ["scheduled", "completed", "cancelled"];
export const SHIFTS = ["Morning", "Afternoon", "Night"];
export const TABLE_COLUMNS = [
  {
    key: "department",
    header: "Department",
    render: (s) => <span className="bg-teal-100 text-teal-800 rounded-xl px-3 py-1">{s.department}</span>,
  },
  {
    key: "subdepartment",
    header: "Sub Department",
    render: (s) => <span className="bg-teal-100 text-teal-800 rounded-xl px-3 py-1">{s.subdepartment}</span>,
  },
  { key: "shift", header: "Shift" },
  { key: "date", header: "Date" },
  {
    key: "status",
    header: "Status",
    render: (s) => {
      const statusClasses =
        s.status === "scheduled"
          ? "bg-teal-100 text-teal-700"
          : s.status === "completed"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";
      return <span className={`px-3 py-1 rounded-full text-sm capitalize ${statusClasses}`}>{s.status}</span>;
    },
  },
  { key: "actions", header: "Actions", className: "text-center" },
];
