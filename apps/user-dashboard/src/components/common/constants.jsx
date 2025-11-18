
export const STATUSES = ["scheduled", "completed", "cancelled"];
export const SHIFTS = ["Morning", "Afternoon", "Night"];

export const TABLE_COLUMNS = [
  {
    key: "department",
    header: "Department",
    render: (item) => <span>{item.department?.name || "-"}</span>,
  },
  {
    key: "subDepartment",
    header: "Sub Department",
    render: (item) => <span>{item.subDepartment?.name || "-"}</span>,
  },
  {
    key: "shift",
    header: "Shift",
    render: ( item ) => <span>{ item.shift?.name || item.shift || "-" }</span>
  },
  {
    key: "date",
    header: "Date",
    render: (item) => {
      if (!item.date) return "-";
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    },
  {
    key: "actions",
    header: "Actions",
    className: "text-center"
  },
];
