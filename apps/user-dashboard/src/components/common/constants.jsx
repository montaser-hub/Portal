// ثوابت الـStatus - للاستخدام الداخلي فقط
export const STATUSES = ["scheduled", "completed", "cancelled"];

// أعمدة الجدول - بدون Department و Status
export const TABLE_COLUMNS = [
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

// Backup constants (استخدمهم لو الـAPI مش راجع بيانات)
export const BACKUP_SHIFTS = ["Morning", "Afternoon", "Night"];
export const BACKUP_SUBDEPARTMENTS = [
  "Central Health Care",
  "Cardiac ICU",
  "Heart Imaging Unit",
  "Rehabilitation Center"
];
